import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { Repository } from 'typeorm';
import { Http2ServerRequest } from 'http2';
import { UserEntity } from 'src/user/entities/user.entity';
import { Role } from 'src/util/common/user-role';

@Injectable()
export class ServicesService {
  constructor(@InjectRepository(ServiceEntity) private readonly serviceEntity: Repository<ServiceEntity>){}

  async create(createServiceDto: CreateServiceDto, currentUser:UserEntity):Promise<ServiceEntity> {
    const findOne = await this.serviceEntity.findOne({
      where: {name:createServiceDto.name}
    })
    if(findOne){
      throw new HttpException({message: 'Already exist'}, HttpStatus.BAD_REQUEST)
    }
    const newSer = await this.serviceEntity.create(createServiceDto)
    newSer.addedBy = currentUser
    return await this.serviceEntity.save(newSer);
  }

  async findAll(currentUser:UserEntity):Promise<ServiceEntity[]> {
    const getAll = await this.serviceEntity.find({
      relations: {addedBy: true}
    })
    if(!getAll || getAll.length === 0){
      throw new HttpException({message: 'Not found this ser'}, HttpStatus.NOT_FOUND)
    }
    if(currentUser.role !== Role.ADMIN){
      throw new HttpException({message: 'You not have a authorizerole'}, HttpStatus.UNAUTHORIZED)
    }
    return getAll;
  }

  async findOne(id: number, currentUser:UserEntity) {
    const getOne = await this.serviceEntity.findOne({
      where: {id:id},
      relations: {addedBy: true}
    })
    if(!getOne){
      throw new HttpException({message: 'not found id ser'}, HttpStatus.NOT_FOUND)
    }
    return getOne;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
