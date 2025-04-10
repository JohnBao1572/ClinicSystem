import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePositionDto {
    @IsNotEmpty({ message: 'emp' })
    @IsString({message: 'name string'})
    name: string;

    @IsOptional()
    @IsString({message: 'desc string'})
    description: string;
}
