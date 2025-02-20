import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { passwordMaxLength, passwordMinLength } from "../user.constants";



export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    usr_email: string;

    @IsOptional()
    @IsString()
    @MinLength(passwordMinLength, {
        message: `Password is shorter than the minimum allowed length ${passwordMinLength}`,
    })
    @MaxLength(passwordMaxLength, {
        message: `Password is higher than the maximum allowed length ${passwordMaxLength}`,
    })
    usr_password?: string;

}
