import { Injectable,Logger,BadRequestException } from '@nestjs/common';
import{SendresetpwdMailDto} from './type/dto/send-resetpwdmail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Utilisateur } from 'src/utilisateur/schemas/utilisateur.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateMailDto } from './type/dto/create-mail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    @InjectModel(Utilisateur.name)
    private readonly utilisateurModel: Model<Utilisateur>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}


 async resetpasswordmail(dto : SendresetpwdMailDto): Promise<boolean> {
    //console.log('DTO reçu :', dto);
    try {
      const response = await this.mailerService.sendMail({
        to: dto.email,
        subject: 'Password Reset SAV ',
        html: '<p>'+'url de reset : '+'https://monapp.com/reset-password?token='+dto.token+'</p>',
      });

      this.logger.log(`Mail envoyé : ${response?.response}`);
      return true; 
    } catch (error) {
      this.logger.error(`Échec d’envoi de mail : ${error.message}`);
      return false; 
    }
  }

async validationmail(dto: CreateMailDto): Promise<boolean> {
  try {
    
    const payload = { email: dto.email };
    const token = this.jwtService.sign(payload, {
      secret:'oshg2828samehsofienhajrighoziiazertvbhji',
      expiresIn: '30m',
    });
    

    
    const verifyUrl = `http://localhost:3000/mail/verifieremailBoutton?token=${token}`;

    console.log(verifyUrl);
   
    const response = await this.mailerService.sendMail({
      to: dto.email,
      subject: 'Confirmez votre adresse email',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Bienvenue !</h2>
          <p>Cliquez sur le bouton ci-dessous pour valider votre adresse email :</p>
          <a href="${verifyUrl}" 
             style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px; margin-top: 20px;">
            Valider mon email
          </a>
        </div>
      `,
    });

    this.logger.log(`Mail envoyer : ${response?.response}`);
    return true;

  } catch (error) {
    this.logger.error(`echec denvoi de mail : ${error.message}`);
    return false;
  }
}


 
async verifierEmailBoutton(token: string) {
  try {
    const payload = this.jwtService.verify(token, {
      secret: 'oshg2828samehsofienhajrighoziiazertvbhji'
    });

    await this.utilisateurModel
  .updateOne(
    { email: payload.email },     
    { $set: { verifier: true } },  
  )
  .exec();

    return 'Adresse email vérifiée avec succès !';
  } catch (error) {
    throw new BadRequestException('Lien invalide ou expiré');
  }
}


async validationrendezvous(mail : CreateMailDto)
{
  try {
      const response = await this.mailerService.sendMail({
        to: mail.email,
        subject: 'confirmation de Rendez vous ',
        html: '<p> rendez vous confirmer pour  </p>',
      });

      this.logger.log(`Mail envoyer : ${response?.response}`);
      return true; 
    } catch (error) {
      this.logger.error(`echec denvoi de mail : ${error.message}`);
      return false; 
    }
}
}


