import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateExformDto {
    @IsNotEmpty({message: 'diagnosis not emp'})
    @IsString({message: 'diagno must be string'})
    diagnosis: string;

    @IsNotEmpty({message: 'med not emp'})
    @IsArray()
    medicineList:{
        medId: number,
        count: number,
    }[];

    @IsNotEmpty({message: 'schedule not emp'})
    @IsNumber({}, {message: 'schedule num'})
    examScheduleId: number
}
