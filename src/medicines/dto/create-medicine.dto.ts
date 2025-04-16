import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateMedicineDto {
    @IsNotEmpty({message: 'title not emp'})
    @IsString({message: 'title must be string'})
    title: string;

    @IsNotEmpty({message: 'desc not emp'})
    @IsString({message: 'desc must string'})
    description: string;

    @IsNotEmpty({message: 'qty not emp'})
    @IsNumber({}, {message: 'qty must a num'})
    quantity: number;

    @IsNotEmpty({message: 'qty not emp'})
    @IsNumber({}, {message: 'qty must a num'})
    price: number;

    @IsNotEmpty({message: 'supId not emp'})
    @IsNumber({}, {message: 'supId must a number'})
    supId: number;
}


export class RemoveMedDto{
    @IsNotEmpty({message: 'isDeleted not emp'})
    @IsBoolean({message: 'isDeleted must a boolean'})
    isDeleted: boolean;
}