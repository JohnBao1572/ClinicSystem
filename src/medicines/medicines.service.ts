import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicineDto, RemoveMedDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicineEntity } from './entities/medicine.entity';
import { Repository } from 'typeorm';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { handleSendMail } from 'src/util/handleSendmail';
import { RemoveSupDto } from 'src/suppliers/dto/create-supplier.dto';
import { SupplierEntity } from 'src/suppliers/entities/supplier.entity';

@Injectable()
export class MedicinesService {
  constructor(@InjectRepository(MedicineEntity) private readonly medicineEntity: Repository<MedicineEntity>,
  @InjectRepository(SupplierEntity) private readonly supplierEntity: Repository<SupplierEntity>,
  private readonly suppliersService: SuppliersService,
){}

  async create(createMedicineDto: CreateMedicineDto, currentUser:UserEntity):Promise<MedicineEntity> {
    const sup = await this.suppliersService.findOne(createMedicineDto.supId)
    if(!sup){
      throw new HttpException({message: 'No found this supplier'}, HttpStatus.NOT_FOUND)
    }
    const newMed = await this.medicineEntity.create(createMedicineDto)
    newMed.sup = sup
    newMed.addedBy = currentUser;
    const newSave = await this.medicineEntity.save(newMed);
    (newSave.addedBy as any)={
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      role: currentUser.role,
    }
    return newSave;
  }

  async findAll():Promise<MedicineEntity[]> {
    const getAll = await this.medicineEntity.find({relations: {sup: true, addedBy: true}})
    if(!getAll || getAll.length === 0){
      throw new HttpException({message: 'No medicines found'}, HttpStatus.NOT_FOUND)
    }
    const qty = getAll.map((med)=> med.quantity)
    const checkQty = getAll.filter((med)=> med.quantity === 0);
    if(checkQty.length> 0){
      for(const med of checkQty){
        await handleSendMail({
        from: 'Support med',
        to: med.addedBy.email,
        subject: 'Medicine quantity not update when qty = 0',
        text: 'Med qty',
        html: `<p>Hãy cập nhật cho số lượng của thuốc: ${med.title}</p>`
      })
      }
    }
    return getAll;
  }

  async findOne(id: number):Promise<MedicineEntity> {
    const getOne = await this.medicineEntity.findOne({
      where: {id:id},
      relations: {sup: true, addedBy:true},
      select:{
        addedBy:{
          firstName: true,
          lastName: true,
          role: true,
        },
        sup:{
          name: true,
          description: true,
        }
      }
    })
    if(!getOne){
      throw new HttpException({message: 'Not found this id med'}, HttpStatus.NOT_FOUND)
    }
    return getOne;
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto):Promise<MedicineEntity> {
    const update = await this.medicineEntity.findOne({
      where: {id:id},
      relations: {sup: true, addedBy: true},
      select:{
        sup:{
          name: true,
          description: true,
        },
        addedBy:{
          firstName: true,
          lastName: true,
          role: true,
          email: true,
        }
      }
    })
    if(!update){
      throw new HttpException({message: 'Not found this id med to update'}, HttpStatus.NOT_FOUND)
    }
    Object.assign(update, updateMedicineDto)
    return await this.medicineEntity.save(update);
  }

  async remove(id: number, removeMedDto: RemoveMedDto):Promise<MedicineEntity> {
    const re = await this.medicineEntity.findOne({
      where:{id: id},
      relations: {sup: true}
    })
    if(!re){
      throw new HttpException({message: 'Not found this id med to remove'}, HttpStatus.NOT_FOUND)
    }
    re.isDeleted = removeMedDto.isDeleted
    return await this.medicineEntity.save(re);
  }

  async removeSupToMed(id: number, removeSupDto: RemoveSupDto){
    const sup = await this.suppliersService.findOne(id)
    if(!sup){
      throw new HttpException({message: 'Not found this id sup to remove'}, HttpStatus.NOT_FOUND)
    }
    sup.isDeleted = removeSupDto.isDeleted
    await this.supplierEntity.save(sup)

    const med = await this.medicineEntity.find({
      where: {sup: {id: id}},
      relations: {sup: true},
    })
    if(!med || med.length === 0){
      throw new HttpException({message: 'Not found this id med to remove'}, HttpStatus.NOT_FOUND)
    }
    for(const m of med){
      m.isDeleted = removeSupDto.isDeleted
      await this.medicineEntity.save(m)
    }
    return {
      Suppliers: sup,
      Medicines: med,
    };
  }
}
