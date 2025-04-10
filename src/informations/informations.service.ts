import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InformationEntity } from './entities/information.entity';
import { Repository } from 'typeorm';
import { PositionsService } from 'src/positions/positions.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class InformationsService {
  constructor(@InjectRepository(InformationEntity) private readonly informationEntity: Repository<InformationEntity>,
    private readonly positionService: PositionsService
  ) { }

  async create(createInformationDto: CreateInformationDto, currentUser:UserEntity):Promise<InformationEntity> {
    const posi = await this.positionService.findOne(createInformationDto.posiId);
    if(!posi){
      throw new HttpException({message: 'Position id not found'}, HttpStatus.BAD_REQUEST)
    }
    const inforEmploy = await this.informationEntity.create(createInformationDto);
    inforEmploy.posi = posi;
    inforEmploy.addedBy = currentUser
    return await this.informationEntity.save(inforEmploy);
  }

  async findAll() :Promise<InformationEntity[]> {
    const getAll = await this.informationEntity.find({
      relations: {addedBy: true, posi: true},
      select:{
        addedBy: {
          firstName: true,
          lastName: true,
          role: true,
          email: true,
        },
        posi: {
          name: true,
          description: true,
        }
      }
    })
    if(!getAll){
      throw new HttpException({message: 'Information not found'}, HttpStatus.NOT_FOUND)
    }
    return getAll;
  }

  async findOne(id: number):Promise<InformationEntity> {
    const getONe = await this.informationEntity.findOne({
      where: {id:id},
      relations: {addedBy:true, posi: true},
      select:{
        addedBy: {
          firstName: true,
          lastName: true,
          role: true,
          email: true,
        },
        posi: {
          name: true,
          description: true,
        }
      }
    })
    if(!getONe){
      throw new HttpException({message: 'Information not found'}, HttpStatus.BAD_REQUEST)
    }
    return getONe;
  }

  async update(id: number, updateInformationDto: UpdateInformationDto, currentUser:UserEntity):Promise<InformationEntity> {
    const up = await this.informationEntity.findOne({
      where: {id:id},
      relations: {addedBy:true, posi:true},
      select:{
        addedBy: {
          firstName: true,
          lastName: true,
          role: true,
          email: true,
        },
        posi: {
          name: true,
          description: true,
        }
      }
    })
    if(!up){
      throw new HttpException({message: 'Information not found'}, HttpStatus.BAD_REQUEST)
    }
    if(updateInformationDto.posiId){
      const posi = await this.positionService.findOne(updateInformationDto.posiId);
      if(!posi){
        throw new HttpException({message: 'Position id not foudn'}, HttpStatus.BAD_REQUEST)
      }
      up.posi = posi;
    }
    Object.assign(up, updateInformationDto)
    up.addedBy = currentUser;
    return await this.informationEntity.save(up);
  }

  async remove(id: number) {
    return `This action removes a #${id} information`;
  }
}
