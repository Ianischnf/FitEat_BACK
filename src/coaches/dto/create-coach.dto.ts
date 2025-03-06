import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCoachDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    specialty: string;
}
