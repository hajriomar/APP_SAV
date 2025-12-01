import { IsNotEmpty,IsString,MaxLength,MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  @MaxLength(12, { message: 'Le mot de passe ne doit pas dépasser 12 caractères.' })
  newPassword: string;
}
