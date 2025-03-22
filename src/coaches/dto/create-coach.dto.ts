import { IsEmail, IsNotEmpty, isNotEmpty, IsOptional, IsString, isString } from "class-validator";

export class CreateCoachDto {
    @IsString()
    @IsNotEmpty()
    name : string

    @IsEmail()
    email  : string;

    @IsString()
    @IsNotEmpty()
    password : string

    @IsString()
    @IsNotEmpty()
    speciality: string

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    disponibilite?: Record<string, any>;
    
}