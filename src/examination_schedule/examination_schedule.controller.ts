import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExaminationScheduleService } from './examination_schedule.service';
import { CreateExaminationScheduleDto, RemoveScheduleDto } from './dto/create-examination_schedule.dto';
import { UpdateExaminationScheduleDto } from './dto/update-examination_schedule.dto';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthorizeRoles } from 'src/util/decorators/authorize-roles.decorator';
import { Role } from 'src/util/common/user-role';
import { AuthenticationGuard } from 'src/util/guards/authentication.guard';
import { AuthorizeGuard } from 'src/util/guards/authorization.guard';
import { ExaminationScheduleEntity } from './entities/examination_schedule.entity';

@Controller('examinationSchedule')
export class ExaminationScheduleController {
  constructor(private readonly examinationScheduleService: ExaminationScheduleService) {}

  @AuthorizeRoles(Role.NURSE, Role.USER)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Post('add')
  async create(@Body() createScheduleDto: CreateExaminationScheduleDto, @CurrentUser() currentUser:UserEntity) {
    return await this.examinationScheduleService.create(createScheduleDto, currentUser);
  }

  @AuthorizeRoles(Role.NURSE, Role.USER)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('getall')
  async findAll(@CurrentUser() currentUser:UserEntity):Promise<ExaminationScheduleEntity[]> {
    return await this.examinationScheduleService.findAll(currentUser);
  }

  @AuthorizeRoles(Role.NURSE, Role.USER)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('get/:id')
  async findOne(@Param('id') id: string, @CurrentUser() currentUser:UserEntity) {
    return await this.examinationScheduleService.findOne(+id, currentUser);
  }

  @AuthorizeRoles(Role.NURSE)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Patch('up/:id')
  update(@Param('id') id: string, @Body() updateExaminationScheduleDto: UpdateExaminationScheduleDto, @CurrentUser() currentUser:UserEntity):Promise<ExaminationScheduleEntity> {
    return this.examinationScheduleService.update(+id, updateExaminationScheduleDto, currentUser);
  }

  @AuthorizeRoles(Role.NURSE, Role.USER)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Delete('re/:id')
  async remove(@Param('id') id: string, @CurrentUser() currentUser:UserEntity, @Body() removeScheduleDto: RemoveScheduleDto) {
    return await this.examinationScheduleService.remove(+id, currentUser, removeScheduleDto);
  }
}
