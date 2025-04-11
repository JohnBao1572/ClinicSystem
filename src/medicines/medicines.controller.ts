import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto, RemoveMedDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { AuthorizeRoles } from 'src/util/decorators/authorize-roles.decorator';
import { Role } from 'src/util/common/user-role';
import { AuthenticationGuard } from 'src/util/guards/authentication.guard';
import { AuthorizeGuard } from 'src/util/guards/authorization.guard';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { MedicineEntity } from './entities/medicine.entity';
import { RemoveSupDto } from 'src/suppliers/dto/create-supplier.dto';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) { }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Post('add')
  async create(@Body() createMedicineDto: CreateMedicineDto, @CurrentUser() currentUser: UserEntity): Promise<MedicineEntity> {
    return await this.medicinesService.create(createMedicineDto, currentUser);
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('getAll')
  async findAll(): Promise<MedicineEntity[]> {
    return await this.medicinesService.findAll();
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('getOne/:id')
  async findOne(@Param('id') id: string) {
    return await this.medicinesService.findOne(+id);
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Put('up/:id')
  async update(@Param('id') id: string, @Body() updateMedicineDto: UpdateMedicineDto): Promise<MedicineEntity> {
    return await this.medicinesService.update(+id, updateMedicineDto);
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Delete('re/:id')
  async remove(@Param('id') id: string, @Body() removeMedDto: RemoveMedDto): Promise<MedicineEntity> {
    return await this.medicinesService.remove(+id, removeMedDto);
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Delete('reSup/:id')
  async removeSupToMed(@Param('id') id: string, @Body() removeSupDto: RemoveSupDto) {
    return await this.medicinesService.removeSupToMed(+id, removeSupDto)
  }
}
