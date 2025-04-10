import { Injectable } from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InformationEntity } from './entities/information.entity';
import { Repository } from 'typeorm';
import { PositionsService } from 'src/positions/positions.service';

@Injectable()
export class InformationsService {
  constructor(@InjectRepository(InformationEntity) private readonly informationEntity: Repository<InformationEntity>,
  private readonly positionService: PositionsService
){}

  async create(createInformationDto: CreateInformationDto) {
    return 'This action adds a new information';
  }

  findAll() {
    return `This action returns all informations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} information`;
  }

  update(id: number, updateInformationDto: UpdateInformationDto) {
    return `This action updates a #${id} information`;
  }

  remove(id: number) {
    return `This action removes a #${id} information`;
  }
}
