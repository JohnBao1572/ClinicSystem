import { PartialType } from '@nestjs/mapped-types';
import { CreatePostionDto, SignUpDto, SignUpEmployDto } from './create-user.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';


export class UpdateUserDto extends PartialType(SignUpDto) {}

export class UpdateEmployDto extends PartialType(SignUpEmployDto) {}

export class UpdatePositionDto extends PartialType(CreatePostionDto) {}

export class RemoveDto{
    @IsNotEmpty({message: 'Not emp'})
    @IsBoolean({message: 'true or false'})
    isDeleted: boolean;
}
