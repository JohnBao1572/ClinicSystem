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
import { Role } from 'src/util/common/user-role';

@Injectable()
export class ExformService {
  constructor(@InjectRepository(ExformEntity) private readonly exEntity: Repository<ExformEntity>,
    @InjectRepository(ExFormMedicinesEntity) private readonly exMedEntity: Repository<ExFormMedicinesEntity>,
    private readonly examinationScheduleService: ExaminationScheduleService,
    private readonly medicinesService: MedicinesService
  ) { }

  async create(createExformDto: CreateExformDto, currentUser: UserEntity) {
    const schedule = await this.examinationScheduleService.findOne(createExformDto.examScheduleId, currentUser)
    if (!schedule) {
      throw new HttpException({ message: 'NOt found this id schedule' }, HttpStatus.NOT_FOUND)
    }


    for (const medicine of createExformDto.medicineList) {
      const med = await this.medicinesService.findOne(medicine.medId)
      if (!med) {
        throw new HttpException({ message: 'Not found this infor med' }, HttpStatus.NOT_FOUND)
      }
    }
    const newExForm = await this.exEntity.create({
      ...createExformDto,
      examSchedule: schedule,
      addedBy: currentUser
    })
    const saveExForm = await this.exEntity.save(newExForm)

    for (const medicine of createExformDto.medicineList) {
      const med = await this.medicinesService.findOne(medicine.medId)
      const exFormMed = await this.exMedEntity.create({
        exForm: saveExForm,
        med,
        count: medicine.count
      })
      await this.exMedEntity.save(exFormMed)
      let qty = med.quantity
      qty -= medicine.count
      med.quantity = qty
      await this.medicinesService.update(med.id, med)
    }
    return await this.exEntity.findOne({
      where: { id: saveExForm.id },
      relations: { addedBy: true, examSchedule: { addedBy: true }, exFormMed: true }
    });
  }

  async findAll(currentUser: UserEntity): Promise<ExformEntity[]> {
    let whereCondition: any = {};
    if (currentUser.role === Role.USER) {
      whereCondition = {
        examSchedule: {
          addedBy: { id: currentUser.id }
        }
      };
    }

    const getAll = await this.exEntity.find({
      where: whereCondition,
      relations: {addedBy: true, examSchedule: {addedBy: true}, exFormMed: true},
    })
    if (!getAll || getAll.length === 0) {
      throw new HttpException({ message: 'Not found this id exam form' }, HttpStatus.NOT_FOUND)
    }
    return getAll;
  }

  async findOne(id: number, currentUser:UserEntity):Promise<ExformEntity> {
    let where: any = {id: id}
    if (currentUser.role === Role.USER) {
      where = {
        id:id,
        examSchedule: {
          addedBy: { id: currentUser.id }
        }
      };
    }
    const getONe = await this.exEntity.findOne({
      where: where,
      relations: {addedBy: true, examSchedule: {addedBy: true}, exFormMed: true}
    })
    if(!getONe){
      throw new HttpException({message: 'You can not see details'}, HttpStatus.BAD_REQUEST)
    }
    return getONe;
  }

  update(id: number, updateExformDto: UpdateExformDto) {
    return `This action updates a #${id} exform`;
  }

  remove(id: number) {
    return `This action removes a #${id} exform`;
  }
}
