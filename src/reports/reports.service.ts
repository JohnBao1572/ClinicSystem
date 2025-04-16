import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './entities/report.entity';
import { Between, Repository } from 'typeorm';
import { PaymentsService } from 'src/payments/payments.service';
import { StatusPayment } from 'src/util/common/status';
import { UserEntity } from 'src/user/entities/user.entity';
import { PaymentEntity } from 'src/payments/entities/payment.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(ReportEntity) private readonly reportEntity: Repository<ReportEntity>,
  @InjectRepository(PaymentEntity) private readonly paymentEntity: Repository<PaymentEntity>,
  private readonly paymentService: PaymentsService
){}

  async getReportDate(createReportDto:CreateReportDto, currentUser:UserEntity):Promise<ReportEntity>{
    const date = new Date(createReportDto.date)
    if(isNaN(date.getTime())){
      throw new HttpException({message: 'Date invalid'}, HttpStatus.BAD_REQUEST)
    }
    const start = new Date(date.setHours(0,0,0,0))
    const end = new Date(date.setHours(23,59,59,999))
    const pay = await this.paymentEntity.find({
      where: {
        statusPayment: StatusPayment.Paid,
        createdAt: Between(start, end),
      }
    })
    if(!pay || pay.length === 0){
      throw new HttpException({message: 'NOt found this payment id'}, HttpStatus.NOT_FOUND)
    }
    const revue = pay.reduce((sum, item)=> sum + (item.totalPrice? parseFloat(item.totalPrice as any): 0),0)
    const profit = revue * 0.5
    if(isNaN(revue)|| isNaN(profit)){
      throw new HttpException({message: 'Calculate error'}, HttpStatus.BAD_GATEWAY)
    }
    createReportDto.renevue = revue
    createReportDto.profit = profit
    const report = await this.reportEntity.create(createReportDto)
    report.addedBy = currentUser
    return await this.reportEntity.save(report)
  }
  
  async getReportMonth(createReportDto:CreateReportDto, currentUser:UserEntity){
    const month = createReportDto.month
    if(!month){
      throw new HttpException({message: 'month invalid'}, HttpStatus.BAD_REQUEST)
    }

    const [yearStr, monthStr] = month.split('/')
    const year = parseInt(yearStr)
    const monthInt = parseInt(monthStr)
    if(isNaN(year) || isNaN(monthInt) || monthInt < 1 || monthInt> 12){
      throw new HttpException({message: 'Month not low than 1 and high than 12'}, HttpStatus.BAD_REQUEST)
    }
    const start = new Date(year, monthInt -1, 1, 0, 0, 0, 0)
    const end = new Date(year, monthInt, 0, 23,59,59,999)
    const pay = await this.paymentEntity.find({
      where: {
        statusPayment: StatusPayment.Paid,
        createdAt: Between(start, end),
      }
    })
    if(!pay || pay.length === 0){
      throw new HttpException({message: 'NOt found this payment id'}, HttpStatus.NOT_FOUND)
    }
    const revue = pay.reduce((sum, item)=> sum + (item.totalPrice? parseFloat(item.totalPrice as any): 0),0)
    const profit = revue * 0.5
    if(isNaN(revue)|| isNaN(profit)){
      throw new HttpException({message: 'Calculate error'}, HttpStatus.BAD_GATEWAY)
    }
    createReportDto.renevue = revue
    createReportDto.profit = profit
    const report = await this.reportEntity.create(createReportDto)
    report.addedBy = currentUser
    return await this.reportEntity.save(report)
  }

  async getReportYear(createReportDto:CreateReportDto, currentUser:UserEntity){
    const year = createReportDto.year
    if(!year || isNaN(parseInt(year))){
      throw new HttpException({message: 'Invalid format'}, HttpStatus.BAD_REQUEST)
    }

    const yearInt = parseInt(year)
    if(yearInt < 2000 || yearInt > new Date().getFullYear()){
      throw new HttpException({message: 'Year not low than 2000 and high than current year'}, HttpStatus.BAD_REQUEST)
    }
    const start = new Date(yearInt, 0, 1, 0, 0, 0, 0)
    const end = new Date(yearInt, 11,31, 23,59,59,999)
    const pay = await this.paymentEntity.find({
      where: {
        statusPayment: StatusPayment.Paid,
        createdAt: Between(start, end),
      }
    })
    if(!pay || pay.length === 0){
      throw new HttpException({message: 'NOt found this payment id'}, HttpStatus.NOT_FOUND)
    }
    const revue = pay.reduce((sum, item)=> sum + (item.totalPrice? parseFloat(item.totalPrice as any): 0),0)
    const profit = revue * 0.5
    if(isNaN(revue)|| isNaN(profit)){
      throw new HttpException({message: 'Calculate error'}, HttpStatus.BAD_GATEWAY)
    }
    createReportDto.renevue = revue
    createReportDto.profit = profit
    const report = await this.reportEntity.create(createReportDto)
    report.addedBy = currentUser
    return await this.reportEntity.save(report)
  }
}
