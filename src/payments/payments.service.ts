import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { ExFormMedicinesEntity } from 'src/exform/entities/exformmed.entity';
import { ExformService } from 'src/exform/exform.service';
import { ExformEntity } from 'src/exform/entities/exform.entity';
import { StatusPayment } from 'src/util/common/status';
import { UserEntity } from 'src/user/entities/user.entity';
import { Role } from 'src/util/common/user-role';

@Injectable()
export class PaymentsService {
  constructor(@InjectRepository(PaymentEntity) private readonly paymentEntity: Repository<PaymentEntity>,
    @InjectRepository(ExformEntity) private readonly exFormEntity: Repository<ExformEntity>,
    private readonly exFormService: ExformService
  ) { }

  async getAll(currentUser: UserEntity): Promise<PaymentEntity[]> {
    const exForm = await this.exFormEntity.find({
      relations: { addedBy: true, examSchedule: { addedBy: true, ser: true }, exFormMed: { med: true } }
    })

    const paymentToCreate: PaymentEntity[] = [];
    for (const exForms of exForm) {
      const hasPaid = exForms.pay?.some((payment) => payment.statusPayment === StatusPayment.Paid) ?? false
      let totalMed = 0
      if (!hasPaid) {
        totalMed = exForms.exFormMed.reduce((sum, item) => {
          return sum + item.med.price * item.count
        }, 0)
      }
      const serPrice = exForms.examSchedule.ser.price
      const totalPrice = totalMed + serPrice;
      const payment = this.paymentEntity.create({
        totalPrice,
        statusPayment: StatusPayment.UnPaid,
        addedBy: currentUser,
        ex: exForms
      })
      paymentToCreate.push(payment)
    }
    return await this.paymentEntity.save(paymentToCreate);
  }

  async findOne(id: number, currentUser:UserEntity):Promise<PaymentEntity> {
    const getOne = await this.paymentEntity.findOne({
      where: {id:id},
      relations:{ex: true}
    })
    if(!getOne){
      throw new HttpException({message: 'NOt found this id to see details'}, HttpStatus.NOT_FOUND)
    }
    if(currentUser.role !== Role.NURSE){
      throw new HttpException({message: 'You not have a permission'}, HttpStatus.UNAUTHORIZED)
    }
    return getOne;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto, currentUser:UserEntity) {
    const up = await this.paymentEntity.findOne({
      where: {id:id},
      relations: {ex: true, addedBy:true},
    })
    if(!up){
      throw new HttpException({message: 'NOt found this id to up'}, HttpStatus.NOT_FOUND) 
    }
    if(currentUser.role !== Role.NURSE){
      throw new HttpException({message: 'You not have a permission'}, HttpStatus.UNAUTHORIZED)
    }
    Object.assign(up, updatePaymentDto)
    return await this.paymentEntity.save(up);
  }
}
