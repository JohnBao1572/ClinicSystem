import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
    @IsNotEmpty({message: 'not emp'})
    @IsString({message: 'must be string'})
    name: string;

    @IsNotEmpty({message: 'not emp'})
    @IsString({message: 'must be string'})
    description: string;

    @IsNotEmpty({message: 'not emp'})
    @IsNumber({}, {message: 'must be num'})
    price: number;
}
