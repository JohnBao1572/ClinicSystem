import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { InformationsService } from './informations.service';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { AuthorizeRoles } from 'src/util/decorators/authorize-roles.decorator';
import { Role } from 'src/util/common/user-role';
import { AuthenticationGuard } from 'src/util/guards/authentication.guard';
import { AuthorizeGuard } from 'src/util/guards/authorization.guard';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { InformationEntity } from './entities/information.entity';

@Controller('informations')
export class InformationsController {
  constructor(private readonly informationsService: InformationsService) {}

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Post('add')
  async create(@Body() createInformationDto: CreateInformationDto, @CurrentUser() currentUser:UserEntity):Promise<InformationEntity> {
    return await this.informationsService.create(createInformationDto, currentUser);
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('getAll')
  async findAll(): Promise<InformationEntity[]> {
    return await this.informationsService.findAll();
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('getOne/:id')
  async findOne(@Param('id') id: string):Promise<InformationEntity> {
    return await this.informationsService.findOne(+id);
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Put('up/:id')
  update(@Param('id') id: string, @Body() updateInformationDto: UpdateInformationDto, @CurrentUser() currentUser:UserEntity) {
    return this.informationsService.update(+id, updateInformationDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informationsService.remove(+id);
  }
}
