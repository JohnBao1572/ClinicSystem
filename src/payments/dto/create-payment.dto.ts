import { IsEnum, IsNotEmpty } from "class-validator";
import { StatusPayment } from "src/util/common/status";


export class CreatePaymentDto {
    @IsNotEmpty({message: 'not emp'})
    @IsEnum(StatusPayment, {message: 'enum'})
    statusPayment: StatusPayment
}
