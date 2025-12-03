import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUtilisateurDto {

    @IsNotEmpty()
    @IsString()
    nom: string;
  
    @IsNotEmpty()
    @IsString()
    prenom: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    tel: string;
  
    @IsNotEmpty()
    @IsString()
    address: string;
  
    @IsNotEmpty()
    @IsString()
    code_postal: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
    @MaxLength(12, { message: 'Le mot de passe ne doit pas dépasser 12 caractères.' })
    password: string;
}
