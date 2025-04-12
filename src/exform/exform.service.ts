import { Injectable } from '@nestjs/common';
import { CreateExformDto } from './dto/create-exform.dto';
import { UpdateExformDto } from './dto/update-exform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExformEntity } from './entities/exform.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExformService {
  constructor(@InjectRepository(ExformEntity) private readonly exEntity: Repository<ExformEntity>){}

  async create(createExformDto: CreateExformDto) {
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
