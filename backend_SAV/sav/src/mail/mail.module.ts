import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { Utilisateur } from 'src/utilisateur/schemas/utilisateur.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
@Module({
  imports:[forwardRef(() => AuthModule),TypeOrmModule.forFeature([Utilisateur]),MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'noreply.sav28@gmail.com',
          pass: 'antb kdkn shfg yalf',
        },
      },
      defaults: {
        from: '"SAV Auto" <noreply.sav28@gmail.com>',
      },
    }),],
    
  controllers: [MailController],
  providers: [MailService],
  exports:[MailService]
})
export class MailModule {}
