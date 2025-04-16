import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthorizeRoles } from 'src/util/decorators/authorize-roles.decorator';
import { Role } from 'src/util/common/user-role';
import { AuthenticationGuard } from 'src/util/guards/authentication.guard';
import { AuthorizeGuard } from 'src/util/guards/authorization.guard';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { ReportEntity } from './entities/report.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('day')
  async getReportDate(@Body() createReportDto:CreateReportDto, @CurrentUser() currentUser:UserEntity):Promise<ReportEntity>{
    return await this.reportsService.getReportDate(createReportDto, currentUser)
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('month')
  async getReportMonth(@Body() createReportDto:CreateReportDto, @CurrentUser() currentUser:UserEntity):Promise<ReportEntity>{
    return await this.reportsService.getReportMonth(createReportDto, currentUser)
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('year')
  async getReportYear(@Body() createReportDto:CreateReportDto, @CurrentUser() currentUser:UserEntity):Promise<ReportEntity>{
    return await this.reportsService.getReportYear(createReportDto, currentUser)
  }
}
