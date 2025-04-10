import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionEntity } from './entities/position.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class PositionsService {
  constructor(@InjectRepository(PositionEntity) private readonly positionEntity: Repository<PositionEntity>) {}

  async create(createPositionDto: CreatePositionDto, currentUser:UserEntity):Promise<PositionEntity> {
    const posi = await this.positionEntity.create(createPositionDto);
    posi.addedBy = currentUser;
    return await this.positionEntity.save(posi);
  }

  async findAll():Promise<PositionEntity[]> {
    const getAll = await this.positionEntity.find({
      relations: {addedBy:true},
      select:{
        addedBy:{
          firstName: true,
          lastName:true,
          email: true,
          role: true,
        }
      }
    })

    return getAll;
  }

  async findOne(id: number):Promise<PositionEntity> {
    const getOne = await this.positionEntity.findOne({
      where: {id: id},
      relations: {addedBy:true},
      select:{
        addedBy:{
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        }
      }
    })
    if(!getOne){
      throw new HttpException({message: 'Position not found'}, HttpStatus.NOT_FOUND)
    }
    return getOne;
  }

  async update(id: number, updatePositionDto: UpdatePositionDto, currentUser:UserEntity) {
    const update = await this.positionEntity.findOne({
      where: {id:id},
      relations:{addedBy:true},
      select:{
        addedBy:{
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        }
      }
    })
    if(!update){
      throw new HttpException({message: 'Not found this id postion to update'}, HttpStatus.NOT_FOUND)
    }
    Object.assign(update, updatePositionDto)
    update.addedBy = currentUser;
    return await this.positionEntity.save(update);
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }
}
