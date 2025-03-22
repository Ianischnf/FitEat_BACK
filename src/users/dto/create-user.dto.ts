import { 
    IsString, 
    IsEmail, 
    IsNotEmpty, 
    IsDateString,  // ✅ Utilisation correcte pour valider une date sous format string
    IsArray, 
    IsOptional 
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()  // ✅ Rend le champ optionnel
    @IsDateString()  // ✅ Utilisation correcte pour valider une date sous forme de string ISO 8601
    registration_date?: string;

    @IsOptional()
    @IsDateString()
    last_login?: string;

    @IsOptional()
    @IsArray()  // ✅ Utilisation correcte pour valider un tableau
    @IsString({ each: true })  // ✅ Vérifie que chaque élément du tableau est une string
    coaches?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    trainingPrograms?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    orders?: string[];

    @IsOptional()
    @IsString()
    physicalCondition?: string;

    @IsOptional()
    @IsString()
    dietPreference?: string;
}
