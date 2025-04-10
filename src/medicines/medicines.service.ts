import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicineEntity } from './entities/medicine.entity';
import { Repository } from 'typeorm';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class MedicinesService {
  constructor(@InjectRepository(MedicineEntity) private readonly medicineEntity: Repository<MedicineEntity>,
  private readonly suppliersService: SuppliersService
){}

  async create(createMedicineDto: CreateMedicineDto, currentUser:UserEntity):Promise<MedicineEntity> {
    const sup = await this.suppliersService.findOne(createMedicineDto.supId)
    if(!sup){
      throw new HttpException({message: 'No found this supplier'}, HttpStatus.NOT_FOUND)
    }
    const newMed = await this.medicineEntity.create(createMedicineDto)
    newMed.sup = sup
    newMed.addedBy = currentUser
    return await this.medicineEntity.save(newMed);
  }

  findAll() {
    return `This action returns all medicines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicine`;
  }

  update(id: number, updateMedicineDto: UpdateMedicineDto) {
    return `This action updates a #${id} medicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicine`;
  }
}
