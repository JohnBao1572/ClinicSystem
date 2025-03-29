import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/util/google.strategy';
import { PositionEntity } from './entities/position.entity';
import { InforEntity } from './entities/information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PositionEntity, InforEntity]),
  JwtModule.register({
    secret: process.env.Acc_Token || 'default_secret',
    signOptions: { expiresIn: '3h' }
  })
  ],
  controllers: [UserController],
  providers: [UserService, GoogleStrategy],
  exports: [UserService],
})
export class UserModule { }
