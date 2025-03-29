import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { RemoveDto, UpdatePositionDto, UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateInforDto, CreatePostionDto, LoginDto, ResendCodeDto, SignUpDto, SignUpEmployDto, VerifyCodeDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { waitForDebugger } from 'inspector';
import { AuthorizeRoles } from 'src/util/decorators/authorize-roles.decorator';
import { Role } from 'src/util/common/user-role';
import { AuthenticationGuard } from 'src/util/guards/authentication.guard';
import { AuthorizeGuard } from 'src/util/guards/authorization.guard';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { PositionEntity } from './entities/position.entity';
import { InforEntity } from './entities/information.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  async create(@Body() signupDto: SignUpDto): Promise<UserEntity> {
    return await this.userService.create(signupDto);
  }

  @Put('verify/:id')
  async verifyAccount(@Param('id') id: string, @Body() verifyCodeDto: VerifyCodeDto): Promise<any> {
    return await this.userService.verifyAccount(+id, verifyCodeDto);
  }

  @Post('resend/:id')
  async resendCode(@Param('id') id: string, @Body() resendCodeDto: ResendCodeDto): Promise<any> {
    return await this.userService.resendCode(+id, resendCodeDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.userService.loginGoogle(req)
  }

  @Post('signRole')
  async createAccEmploy(@Body() signUpEmployDto: SignUpEmployDto): Promise<UserEntity> {
    return await this.userService.createAccEmploy(signUpEmployDto)
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('getAll')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('getOne/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(+id);
  }

  @Patch('upUser/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthorizeGuard, AuthenticationGuard)
  @Delete('re/:id')
  async remove(@Param('id') id: string, @Body() removeDto: RemoveDto, @CurrentUser() currentUser: UserEntity) {
    return await this.userService.remove(+id, removeDto, currentUser);
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthorizeGuard, AuthenticationGuard)
  @Post('crePo')
  async createPosition(@Body() createPoDto: CreatePostionDto, @CurrentUser() currentUser:UserEntity): Promise<PositionEntity> {
    return await this.userService.createPosition(createPoDto, currentUser)
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthorizeGuard, AuthenticationGuard)
  @Put('upPo/:id')
  async updatePosition(@Param('id') id: string, @Body() updatePoDto: UpdatePositionDto, @CurrentUser() currentUser: UserEntity): Promise<PositionEntity> {
    return await this.userService.updatePosition(+id, updatePoDto, currentUser)
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthorizeGuard, AuthenticationGuard)
  @Get('getOnePo/:id')
  async getOnePo(@Param('id') id: string): Promise<PositionEntity> {
    return await this.userService.getOnePo(+id)
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthorizeGuard, AuthenticationGuard)
  @Get('getAllPo')
  async findAllPo(): Promise<PositionEntity[]> {
    return await this.userService.findAllPo()
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthorizeGuard, AuthenticationGuard)
  @Post('addInfor')
  async createInfor(@Body() createInforDto: CreateInforDto, currentUser: UserEntity):Promise<InforEntity> {
    return await this.userService.createInfor(createInforDto, currentUser)
  }
}
