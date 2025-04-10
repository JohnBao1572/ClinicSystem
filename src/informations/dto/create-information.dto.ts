import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Gender } from "src/util/common/gender";
import { heSoHocVi } from "src/util/common/hesohocvi";

export class CreateInformationDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({message: 'Name must be a string'})
    name: string;

    @IsNotEmpty({message: 'Degree is required'})
    @IsEnum({message: 'degree must be a enum'})
    degree_coefficient: heSoHocVi;

    @IsNotEmpty({message: 'gen is required'})
    @IsEnum({message: 'gen must be a enum'})
    gender: Gender;

    @IsNotEmpty({message: 'salary not emp'})
    @IsNumber({}, {message: 'salary must a number'})
    salary: number;

    @IsNotEmpty({message: 'Posid not emp'})
    @IsNumber({},{message: 'posiId must be a number'})
    posiId:number;
}
