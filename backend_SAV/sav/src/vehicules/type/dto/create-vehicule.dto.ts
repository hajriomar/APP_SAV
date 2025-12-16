import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateVehiculeDto {
  
  @IsString()
  @IsNotEmpty()
  immatriculation: string;

  @IsString()
  @IsNotEmpty()
  marque: string;

  @IsString()
  @IsNotEmpty()
  modele: string;

  @IsNumber()
  @IsOptional()
  annee?: number;

  @IsString()
  @IsOptional()
  couleur?: string;

  @IsNumber()
  @IsOptional()
  km?: number;

}
