import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentEntity } from './entities/payment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { AuthorizeRoles } from 'src/util/decorators/authorize-roles.decorator';
import { Role } from 'src/util/common/user-role';
import { AuthenticationGuard } from 'src/util/guards/authentication.guard';
import { AuthorizeGuard } from 'src/util/guards/authorization.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @AuthorizeRoles(Role.NURSE)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('get')
  async findAll(@CurrentUser() currentUser:UserEntity):Promise<PaymentEntity[]> {
    return await this.paymentsService.getAll(currentUser);
  }

  @AuthorizeRoles(Role.NURSE)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('get/:id')
  async findOne(@Param('id') id: string, @CurrentUser() currentUser:UserEntity):Promise<PaymentEntity> {
    return await this.paymentsService.findOne(+id, currentUser);
  }

  @AuthorizeRoles(Role.NURSE)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Patch('up/:id')
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto,@CurrentUser() currentUser:UserEntity) {
    return await this.paymentsService.update(+id, updatePaymentDto, currentUser);
  }
}
