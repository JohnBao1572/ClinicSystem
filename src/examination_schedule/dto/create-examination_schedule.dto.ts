import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateExaminationScheduleDto {
    @IsNotEmpty({ message: 'fn not emp' })
    @IsString({ message: 'fn must be string' })
    fullName: string;

    @IsNotEmpty({ message: 'numberP not emp' })
    @IsString({ message: 'numberP must be string' })
    @MinLength(10, {message: 'numberP at least 10 characters'})
    numberPhone: string;

    @IsNotEmpty({ message: 'reason not emp' })
    @IsString({ message: 'reason must be string' })
    reasonForVisit: string;

    @IsNotEmpty({ message: 'appointment not emp' })
    @IsDate({message: 'appointment must be date'})
    @Type(() => Date)
    AppointmentDate: Date;
}
