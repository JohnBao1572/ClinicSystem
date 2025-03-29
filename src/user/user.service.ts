import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RemoveDto, UpdatePositionDto, UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateInforDto, CreatePostionDto, LoginDto, ResendCodeDto, SignUpDto, SignUpEmployDto, VerifyCodeDto } from './dto/create-user.dto';
import { generatorRandomText } from 'src/util/generatorRandomText';
import { handleSendMail } from 'src/util/handleSendmail';
import passport from 'passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Role } from 'src/util/common/user-role';
import { InforEntity } from './entities/information.entity';
import { PositionEntity } from './entities/position.entity';
import { AuthorizeGuard } from 'src/util/guards/authorization.guard';
import { info } from 'console';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(InforEntity) private readonly inforEntity: Repository<InforEntity>,
    @InjectRepository(PositionEntity) private readonly positionEntity: Repository<PositionEntity>,
    private readonly JwtService: JwtService
  ) { }

  async create(signupDto: SignUpDto): Promise<UserEntity> {
    const user = await this.userEntity.findOne({
      where: { email: signupDto.email }
    })
    if (user) {
      throw new HttpException({ message: 'User has already exist' }, HttpStatus.BAD_REQUEST)
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(signupDto.password, salt);

    const verificationCode = generatorRandomText(6).trim()
    console.log(verificationCode)
    const verifyCodeExpiry = new Date();
    verifyCodeExpiry.setSeconds(verifyCodeExpiry.getSeconds() + 70);

    const saveUser = await this.userEntity.create({
      ...signupDto,
      password: hashPassword,
      verifyCode: verificationCode,
      isDeleted: true,
      isVerify: false,
      verificationCodeExpiry: verifyCodeExpiry
    })
    await this.userEntity.save(saveUser)
    console.log(verifyCodeExpiry)

    await handleSendMail({
      from: 'suppport User',
      to: saveUser.email,
      subject: 'Verify account',
      text: 'Verify account',
      html: `<h2>Verify code: ${verificationCode}</h2>`
    })
    return saveUser;
  }

  async verifyAccount(id: number, verifyCodeDto: VerifyCodeDto): Promise<any> {
    const user = await this.userEntity.findOne({
      where: { verifyCode: verifyCodeDto.verifyCode }
    })
    if (!user) {
      throw new HttpException({ message: 'Verify code invalid' }, HttpStatus.BAD_REQUEST)
    }
    if (user.verifyCode !== verifyCodeDto.verifyCode) {
      throw new HttpException({ message: 'Verify code invalid' }, HttpStatus.BAD_REQUEST)
    }
    if (user.verificationCodeExpiry && user.verificationCodeExpiry < new Date()) {
      throw new HttpException({ message: 'Verify code expired' }, HttpStatus.BAD_REQUEST)
    }

    await this.userEntity.update(user.id, {
      isVerify: true,
      isDeleted: false,
      verifyCode: '',
      verificationCodeExpiry: undefined,
    })

    const updated = await this.userEntity.findOne({
      where: { id: user.id }
    })

    return updated
  }

  async resendCode(id: number, resendCodeDto: ResendCodeDto) {
    const user = await this.userEntity.findOne({
      where: { email: resendCodeDto.email }
    })
    if (!user) {
      throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND)
    }

    const verificationCode = generatorRandomText(6).trim()
    console.log(verificationCode)
    const verifyCodeExpiry = new Date();
    verifyCodeExpiry.setMinutes(verifyCodeExpiry.getMinutes() + 70);

    await this.userEntity.update(user.id, {
      verifyCode: verificationCode,
      verificationCodeExpiry: verifyCodeExpiry
    })

    await handleSendMail({
      from: 'suppport User',
      to: user.email,
      subject: 'Verify account',
      text: 'Verify account',
      html: `<h2>Verify code: ${verificationCode}</h2>`
    })
    console.log(verificationCode)
    return { message: 'Resend code success' }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userEntity.findOne({
      where: {
        email: loginDto.email
      }
    })
    if (!user) {
      throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND)
    }

    const isMathPassword = await bcrypt.compare(loginDto.password, user.password)
    if (!isMathPassword) {
      throw new HttpException({ message: 'Password invalid' }, HttpStatus.BAD_REQUEST)
    }

    const accToken = await this.accToken(user)
    const refToken = await this.refToken(user)

    return {
      user,
      accToken,
      refToken,
    }
  }

  async loginGoogle(req: Request) {
    const userGoogle = (req as any).user as {
      email: string,
      firstName: string,
      lastName: string,
      picture: string,
      accessToken: string,
    }
    if (!userGoogle) {
      throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND)
    }

    const { email, firstName, lastName, picture, accessToken } = userGoogle;
    let user = await this.userEntity.findOne({
      where: { email }
    })
    if (!user) {
      user = await this.userEntity.create({
        email,
        firstName,
        lastName,
        password: '',
        isDeleted: false,
        isVerify: true,
        verifyCode: '',
        verificationCodeExpiry: undefined,
        role: Role.USER
      })

      await this.userEntity.save(user)
    }
    const accToken = await this.accToken(user)
    const refToken = await this.refToken(user)

    return {
      message: 'Login google success',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }, accToken, refToken
    }
  }

  async createAccEmploy(signUpEmployDto: SignUpEmployDto): Promise<UserEntity> {
    const employ = await this.userEntity.findOne({
      where: { email: signUpEmployDto.email }
    })
    if (employ) {
      throw new HttpException({ message: 'Email had already' }, HttpStatus.BAD_REQUEST)
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(signUpEmployDto.password, salt);
    const saveEmploy = await this.userEntity.create({
      ...signUpEmployDto,
      password: hashPassword,
      isVerify: true,
      isDeleted: false,
      verifyCode: '',
      verificationCodeExpiry: undefined,
    })
    return await this.userEntity.save(saveEmploy)
  }

  async accToken(user: UserEntity): Promise<string> {
    const payload = { id: user.id, firstName: user.firstName, lastName: user.lastName, password: user.password }
    const token = await this.JwtService.sign(payload, {
      secret: process.env.Acc_Token,
      expiresIn: '3h'
    })

    return token
  }

  async refToken(user: UserEntity): Promise<string> {
    const payload = { id: user.id, firstName: user.firstName, lastName: user.lastName, password: user.password }
    const token = await this.JwtService.sign(payload, {
      secret: process.env.Ref_Token,
      expiresIn: '7d'
    })

    return token;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userEntity.find();
  }

  async findOne(id: number):Promise<UserEntity> {
     const getOne = await this.userEntity.findOne({
      where: { id: id }
    })
    if (!getOne) {
      throw new HttpException({ message: 'Not found this user' }, HttpStatus.BAD_REQUEST)
    }
    return getOne;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const update = await this.userEntity.findOne({
      where: { id: id }
    })
    if (!update) {
      throw new HttpException({ message: 'Not found this user to update' }, HttpStatus.BAD_REQUEST)
    }
    Object.assign(update, updateUserDto)
    return await this.userEntity.save(update);
  }

  async remove(id: number, removeDto: RemoveDto, currentUser:UserEntity) {
    const re = await this.userEntity.findOne({
      where: {id: id}
    })
    if(!re){
      throw new HttpException({message: 'Not found this user to delete'}, HttpStatus.BAD_REQUEST)
    }
    re.isDeleted = removeDto.isDeleted
    return await this.userEntity.save(re);
  }

  async createPosition(createPoDto: CreatePostionDto, currentUser:UserEntity):Promise<PositionEntity>{
    // console.log('createPoDto:', createPoDto); 
    const cre = new PositionEntity()
    cre.namePosi = createPoDto.namePosi;
    cre.description = createPoDto.description;
    cre.addedBy = currentUser
    return await this.positionEntity.save(cre)
  }

  async updatePosition(id:number,updatePoDto: UpdatePositionDto, currentUser:UserEntity):Promise<PositionEntity>{
    const up = await this.positionEntity.findOne({
      where: {id: id}
    })
    if(!up){
      throw new HttpException({message: 'Not found this id po to up'}, HttpStatus.BAD_REQUEST)
    }
    Object.assign(up, updatePoDto)
    up.addedBy = currentUser
    return await this.positionEntity.save(up)
  }

  async getOnePo(id:number):Promise<PositionEntity>{
    const findONe = await this.positionEntity.findOne({
      where: {id:id},
      relations: {addedBy: true}
    })
    if(!findONe){
      throw new HttpException({message: 'find one to upd'}, HttpStatus.BAD_REQUEST)
    }
    return findONe
  }

  async findAllPo():Promise<PositionEntity[]>{
    return await this.positionEntity.find()
  }

  async createInfor(createInforDto: CreateInforDto, currentUser:UserEntity):Promise<InforEntity>{
    console.log('createInforDto:', createInforDto);
    if (!createInforDto || !createInforDto.positionId) {
      throw new HttpException({ message: 'positionId is required' }, HttpStatus.BAD_REQUEST);
    }
    const posi = await this.positionEntity.findOne({
      where: {id: createInforDto.positionId}
    })
    if(!posi){
      throw new HttpException({message: 'Not found posi'}, HttpStatus.BAD_REQUEST)
    }

    const infor = new InforEntity()
    infor.fullName = createInforDto.fullName
    infor.gender = createInforDto.gender
    infor.phoneNumber = createInforDto.phoneNumber
    infor.email = createInforDto.email;
    infor.address = createInforDto.address
    infor.salary = createInforDto.salary
    infor.position = posi
    infor.addedBy = currentUser
    console.log('Saving new infor:', infor); 
    return await this.inforEntity.save(infor)
  }
}


