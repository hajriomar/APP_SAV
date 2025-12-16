import { 
    IsString, 
    IsNotEmpty, 
    IsOptional, 
    IsDateString,
    IsEnum,
    IsMongoId
  } from 'class-validator';
  import { RendezVousEtat } from '../enum/rendezvous_etat.enum';
  
  export class CreateRendezvousDto {

  
    @IsMongoId()
    @IsNotEmpty()
    vehicule_id: string;
  
    //@IsMongoId()
    //@IsNotEmpty()
    //atelier_id: string;
  
    @IsString()
    @IsNotEmpty()
    type_rdv: string;
  
    @IsDateString()
    @IsNotEmpty()
    date: string;
  
    @IsString()
    @IsNotEmpty()
    heure: string;
  
    @IsString()
    @IsOptional()
    message?: string;
  
    @IsEnum(RendezVousEtat)
    @IsOptional()
    etat?: RendezVousEtat;
  }
 