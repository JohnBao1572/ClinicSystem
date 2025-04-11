import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateSupplierDto {
    @IsNotEmpty({ message: 'name not emp' })
    @IsString({ message: 'name must be string' })
    name: string;

    @IsNotEmpty({ message: 'desc not emp' })
    @IsString({ message: 'desc must be string' })
    description: string;
}


export class RemoveSupDto {
    @IsNotEmpty({ message: 'isDeleted not emp' })
    @IsBoolean({ message: 'isDeleted must a boolean' })
    isDeleted: boolean;
}
