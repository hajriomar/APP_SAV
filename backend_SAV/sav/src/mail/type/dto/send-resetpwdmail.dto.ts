import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendresetpwdMailDto {

@IsEmail()
email: string;

@IsNotEmpty()
token: string;    

}
