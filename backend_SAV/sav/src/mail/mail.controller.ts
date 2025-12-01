import { Controller, Post, Body,Get,Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendresetpwdMailDto } from './type/dto/send-resetpwdmail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('resetpwd')
  async testmail(@Body() dto: SendresetpwdMailDto) {
      console.log('Body reçu dans controller :', dto);

    return await this.mailService.resetpasswordmail(dto);
  }
  @Post('validation')
  async testvalidation(@Body() dto: SendresetpwdMailDto) {
      console.log('Body reçu dans controller :', dto);

    return await this.mailService.validationmail(dto);
  }
   @Get('verifieremailBoutton')
   async testvalidationboutton(@Query('token') token: string)
   {
    return this.mailService.verifierEmailBoutton(token);
   }


 
}
