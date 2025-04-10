import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateMedicineDto {
    @IsNotEmpty({message: 'title not emp'})
    @IsString({message: 'title must be string'})
    title: string;

    @IsNotEmpty({message: 'desc not emp'})
    @IsString({message: 'desc must string'})
    description: string;

    @IsNotEmpty({message: 'supId not emp'})
    @IsNumber({}, {message: 'supId must a number'})
    supId: number;
}
