import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReportDto {
    @IsOptional()
    @IsString({message: 'date must be string'})
    date: string;

    @IsOptional()
    @IsString({message: 'month must be string'})
    month: string;

    @IsOptional()
    @IsString({message: 'year must be string'})
    year: string;

    renevue: number;
    profit: number;
}
