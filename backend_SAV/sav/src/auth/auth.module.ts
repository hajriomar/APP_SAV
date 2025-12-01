import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports:[UtilisateurModule, 
    PassportModule,
JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    })
    ,
    forwardRef(() => MailModule)
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,{
      provide: APP_GUARD,
      useClass: JwtAuthGuard,   
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,  
    }],
  exports:[JwtModule]
})
export class AuthModule {}
