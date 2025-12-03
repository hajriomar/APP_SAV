import { BadRequestException, Injectable   ,NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './type/dto/login.dto';
import { RequestResetDto } from './type/dto/request-reset.dto';
import { ResetPasswordDto } from './type/dto/reset-password.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { SendresetpwdMailDto } from 'src/mail/type/dto/send-resetpwdmail.dto';
import * as bcrypt from 'bcrypt';
import{CreateMailDto} from "src/mail/type/dto/create-mail.dto"
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';




@Injectable()
export class AuthService {
     constructor(
        private utilisateurservice : UtilisateurService,
        private readonly jwtService: JwtService,
        private mailservice : MailService

      ) {}


async login(dto: LoginDto) {
    const user = await this.utilisateurservice.findOneByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('Email incorrect');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      console.log("pwd");
    throw new BadRequestException('mot de passe invalide');
    }
    if(user.verifier==false)
    {
        const dto = { email: user.email } as CreateMailDto;
        this.mailservice.validationmail(dto);
        console.log("valider votre compte avant connecter verifier votre boite mail")
        throw new UnauthorizedException("compte non valider");
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }



  async requestResetPwd(emaildto: RequestResetDto) {

   const user = await this.utilisateurservice.findOneByEmail(emaildto.email);

if (!user) {
  throw new NotFoundException('Aucun utilisateur avec cet email');
}

    const payload = { email : emaildto.email };
    const token = this.jwtService.sign(payload, {
      secret:  process.env.JWT_SECRET,
      expiresIn: '15m', 
    });
    const dto ={
      "email":emaildto.email,
      "token":token
    } as SendresetpwdMailDto
    
    this.mailservice.resetpasswordmail(dto);

   }



async resetPwd(dto: ResetPasswordDto) {
  let payload: any;
  try {
    payload = await this.jwtService.verify(dto.token, {
      secret: process.env.JWT_SECRET,
    });
  } catch (err) {
    throw new UnauthorizedException('Token invalide ou expiré');
  }

  const user = await this.utilisateurservice.findOneByEmail(payload.email);

  if (!user) {
    throw new NotFoundException('Utilisateur introuvable');
  }

  const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
  user.password = hashedPassword;


  await user.save();

  return { message: 'Mot de passe réinitialisé avec succès' };
}

   
}
