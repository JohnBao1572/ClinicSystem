import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExformService } from './exform.service';
import { CreateExformDto } from './dto/create-exform.dto';
import { UpdateExformDto } from './dto/update-exform.dto';

@Controller('exform')
export class ExformController {
  constructor(private readonly exformService: ExformService) {}

  @Post()
  async create(@Body() createExformDto: CreateExformDto) {
    return this.exformService.create(createExformDto);
  }

  @Get()
  findAll() {
    return this.exformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exformService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExformDto: UpdateExformDto) {
    return this.exformService.update(+id, updateExformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exformService.remove(+id);
  }
}
