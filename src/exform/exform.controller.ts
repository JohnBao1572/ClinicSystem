import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExformService } from './exform.service';
import { CreateExformDto } from './dto/create-exform.dto';
import { UpdateExformDto } from './dto/update-exform.dto';
import { AuthorizeRoles } from 'src/util/decorators/authorize-roles.decorator';
import { Role } from 'src/util/common/user-role';
import { AuthenticationGuard } from 'src/util/guards/authentication.guard';
import { AuthorizeGuard } from 'src/util/guards/authorization.guard';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { ExformEntity } from './entities/exform.entity';

@Controller('exform')
export class ExformController {
  constructor(private readonly exformService: ExformService) {}

  @AuthorizeRoles(Role.DOCTOR)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Post('add')
  async create(@Body() createExformDto: CreateExformDto, @CurrentUser() currentUser:UserEntity) {
    return this.exformService.create(createExformDto, currentUser);
  }

  @AuthorizeRoles(Role.DOCTOR, Role.NURSE, Role.USER)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('getAll')
  async findAll(@CurrentUser() currentUser:UserEntity):Promise<ExformEntity[]> {
    return await this.exformService.findAll(currentUser);
  }

  @AuthorizeRoles(Role.DOCTOR, Role.NURSE, Role.USER)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('get/:id')
  async findOne(@Param('id') id: string, @CurrentUser() currentUser:UserEntity):Promise<ExformEntity> {
    return await this.exformService.findOne(+id, currentUser);
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
