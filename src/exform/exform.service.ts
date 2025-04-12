import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExformDto } from './dto/create-exform.dto';
import { UpdateExformDto } from './dto/update-exform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExformEntity } from './entities/exform.entity';
import { Repository } from 'typeorm';
import { ExFormMedicinesEntity } from './entities/exformmed.entity';
import { ExaminationScheduleService } from 'src/examination_schedule/examination_schedule.service';
import { MedicinesService } from 'src/medicines/medicines.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ExformService {
  constructor(@InjectRepository(ExformEntity) private readonly exEntity: Repository<ExformEntity>,
    @InjectRepository(ExFormMedicinesEntity) private readonly exMedEntity: Repository<ExFormMedicinesEntity>,
    private readonly examinationScheduleService: ExaminationScheduleService,
    private readonly medicinesService: MedicinesService
  ) { }

  async create(createExformDto: CreateExformDto, currentUser:UserEntity) {
    const schedule = await this.examinationScheduleService.findOne(createExformDto.examScheduleId, currentUser)
    if(!schedule){
      throw new HttpException({message: 'NOt found this id schedule'}, HttpStatus.NOT_FOUND)
    }
    
    for(const medicine of createExformDto.medicineList){
      const med = await this.medicinesService.findOne(medicine.medId)
      if(!med){
        throw new HttpException({message: 'Not found this infor med'}, HttpStatus.NOT_FOUND)
      }
    }
    const newExForm = await this.exEntity.create(createExformDto)
    createExformDto.examScheduleId = schedule
    createExformDto.medicineList = medicine
    createExformDto.

    return 'This action adds a new exform';
  }

  findAll() {
    return `This action returns all exform`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exform`;
  }

  update(id: number, updateExformDto: UpdateExformDto) {
    return `This action updates a #${id} exform`;
  }

  remove(id: number) {
    return `This action removes a #${id} exform`;
  }
}
