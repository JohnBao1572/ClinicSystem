import { IsEmail, IsEnum, IsNotEmpty, IsString, Min, MinLength } from "class-validator";
import { Role } from "src/util/common/user-role";


export class SignUpDto {
    @IsNotEmpty({ message: 'First name is required' })
    @IsString({ message: 'FN must be a string' })
    firstName: string;

    @IsNotEmpty({ message: 'Last name is required' })
    @IsString({ message: 'LN must be a string' })
    lastName: string;

    @IsNotEmpty({ message: 'email not emp' })
    @IsEmail({}, { message: 'Must be a valid email' })
    email: string;

    @IsNotEmpty({ message: 'pw not emp' })
    @IsString({ message: 'pw must be a string' })
    @MinLength(6, { message: 'pw at least 6 words' })
    password: string;
}

export class VerifyCodeDto {
    @IsNotEmpty()
    verifyCode: string;
}

export class ResendCodeDto {
    @IsNotEmpty({ message: 'email not emp' })
    email: string;
}

export class LoginDto {
    @IsNotEmpty({ message: 'email not emp' })
    @IsEmail({}, { message: 'Must be a valid email' })
    email: string;

    @IsNotEmpty({ message: 'pw not emp' })
    @IsString({ message: 'pw must be a string' })
    @MinLength(6, { message: 'pw at least 6 words' })
    password: string;
}

export class SignUpEmployDto {
    @IsNotEmpty({ message: 'First name is required' })
    @IsString({ message: 'FN must be a string' })
    firstName: string;

    @IsNotEmpty({ message: 'Last name is required' })
    @IsString({ message: 'LN must be a string' })
    lastName: string;

    @IsNotEmpty({ message: 'email not emp' })
    @IsEmail({}, { message: 'Must be a valid email' })
    email: string;

    @IsNotEmpty({ message: 'pw not emp' })
    @IsString({ message: 'pw must be a string' })
    @MinLength(6, { message: 'pw at least 6 words' })
    password: string;

    @IsNotEmpty({ message: 'Create for employ not emp' })
    @IsEnum(Role,{ message: 'role required' })
    role: Role;
}
