import { Controller, Get , Post,Body } from '@nestjs/common';
import {AuthService} from './auth.service';

import { LoginDto } from './type/dto/login.dto';
import { ResetPasswordDto } from './type/dto/reset-password.dto';
import{RequestResetDto} from './type/dto/request-reset.dto'

@Controller('auth')
export class AuthController {
      constructor(private readonly authService: AuthService) {}
      
    @Post('login')
    async login(@Body() login : LoginDto){
    return this.authService.login(login);
    }

  @Post('request-reset-pwd')
  async requestResetPwd(@Body() requestReset: RequestResetDto) {
  //console.log("email : "+requestReset.email);
  return this.authService.requestResetPwd(requestReset);
  }
@Post('resetpwd')
    async resetpwd(@Body() resetpwd : ResetPasswordDto){
    return this.authService.resetPwd(resetpwd);
    }
  
    
}



