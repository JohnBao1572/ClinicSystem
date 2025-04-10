import { IsNotEmpty, IsString } from "class-validator";

export class CreateSupplierDto {
    @IsNotEmpty({ message: 'name not emp' })
    @IsString({ message: 'name must be string' })
    name: string;

    @IsNotEmpty({ message: 'desc not emp' })
    @IsString({ message: 'desc must be string' })
    description: string;
}
