import { IsEmail } from 'class-validator';
export class CreateMailDto {

@IsEmail()
email: string;   

}
