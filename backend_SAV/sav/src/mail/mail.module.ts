import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { Utilisateur, UtilisateurSchema } from 'src/utilisateur/schemas/utilisateur.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Utilisateur.name, schema: UtilisateurSchema },
    ]),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'noreply.sav28@gmail.com',
          pass: 'antb kdkn shfg yalf', // remarque : mettre en .env
        },
      },
      defaults: {
        from: '"SAV Auto" <noreply.sav28@gmail.com>',
      },
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
