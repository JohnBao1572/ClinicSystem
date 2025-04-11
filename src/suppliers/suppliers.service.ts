import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { get } from 'http';
import { MedicinesService } from 'src/medicines/medicines.service';

@Injectable()
export class SuppliersService {
  constructor(@InjectRepository(SupplierEntity) private readonly supplierEntity: Repository<SupplierEntity>
) { }

  async create(createSupplierDto: CreateSupplierDto, currentUser: UserEntity): Promise<SupplierEntity> {
    const newSup = await this.supplierEntity.create(createSupplierDto);
    newSup.addedBy = currentUser

    const newSave = await this.supplierEntity.save(newSup);

    (newSave.addedBy as any) = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      role: currentUser.role,
    }
    return newSave;
  }

  async findAll(): Promise<SupplierEntity[]> {
    const getAll = await this.supplierEntity.find({
      relations: { addedBy: true, },
      select: {
        addedBy: {
          firstName: true,
          lastName: true,
          role: true,
        }
      }
    })
    if (!getAll) {
      throw new HttpException({ message: 'No sup found' }, HttpStatus.NOT_FOUND)
    }
    return getAll;
  }

  async findOne(id: number) :Promise<SupplierEntity>{
    const getOne = await this.supplierEntity.findOne({
      where: {id: id},
      relations:{addedBy: true},
      select:{
        addedBy:{
          firstName: true,
          lastName: true,
          role: true,
          email: true,
        }
      }
    })
    if(!getOne){
      throw new HttpException({message: 'Not sup found'}, HttpStatus.NOT_FOUND)
    }
    return getOne;
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) :Promise<SupplierEntity>{
    const up = await this.supplierEntity.findOne({
      where: {id: id},
      relations: {addedBy:true},
    })
    if(!up){
      throw new HttpException({message: 'Not foudn this id sup to up'}, HttpStatus.NOT_FOUND)
    }
    Object.assign(up, updateSupplierDto)
    return await this.supplierEntity.save(up);
  }

  async remove(id: number) {
    const removeMed = await this
    return `This action removes a #${id} supplier`;
  }
}
