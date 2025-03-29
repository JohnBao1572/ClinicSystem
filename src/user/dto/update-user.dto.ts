import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto, SignUpEmployDto } from './create-user.dto';


export class UpdateUserDto extends PartialType(SignUpDto) {}

export class UpdateEmployDto extends PartialType(SignUpEmployDto) {}
