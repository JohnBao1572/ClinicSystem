import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { AuthorizeRoles } from 'src/util/decorators/authorize-roles.decorator';
import { Role } from 'src/util/common/user-role';
import { AuthenticationGuard } from 'src/util/guards/authentication.guard';
import { AuthorizeGuard } from 'src/util/guards/authorization.guard';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { MedicineEntity } from './entities/medicine.entity';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) { }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Post('add')
  async create(@Body() createMedicineDto: CreateMedicineDto, @CurrentUser() currentUser:UserEntity):Promise<MedicineEntity> {
    return await this.medicinesService.create(createMedicineDto, currentUser);
  }

  @Get()
  findAll() {
    return this.medicinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicineDto: UpdateMedicineDto) {
    return this.medicinesService.update(+id, updateMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicinesService.remove(+id);
  }
}
