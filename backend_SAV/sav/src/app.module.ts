import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { VehiculesModule } from './vehicules/vehicules.module';
import { ReclamationsModule } from './reclamations/reclamations.module';
import { RendezvousModule } from './rendezvous/rendezvous.module';
import { FacturesModule } from './factures/factures.module';
import { TechniciensModule } from './techniciens/techniciens.module';
import { AteliersModule } from './ateliers/ateliers.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, }),
    SharedModule, UtilisateurModule, VehiculesModule, ReclamationsModule, RendezvousModule, FacturesModule, TechniciensModule, AteliersModule, AuthModule, MailModule,
    MongooseModule.forRoot('mongodb://mohamed_omar_hajri:52406027@193.48.125.44:27017/mohamed_omar_hajri')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
