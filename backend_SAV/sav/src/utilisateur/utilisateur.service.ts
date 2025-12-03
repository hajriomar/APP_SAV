import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Utilisateur, UtilisateurSchema } from './schemas/utilisateur.schema';
import { CreateUtilisateurDto } from './type/dto/create-utilisateur.dto';
 
import { MailService } from 'src/mail/mail.service';
import { CreateMailDto } from 'src/mail/type/dto/create-mail.dto'; 

@Injectable()
export class UtilisateurService {
  private readonly logger = new Logger(UtilisateurService.name);

  constructor(
    @InjectModel(Utilisateur.name)
    private readonly utilisateurModel: Model<Utilisateur>,
    private readonly mailService: MailService,   
  ) {}

  
  async inscription(user: CreateUtilisateurDto): Promise<Utilisateur> {
    const exist = await this.utilisateurModel.findOne({ email: user.email }).exec();
    if (exist) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(user.password as string, 10);
    user.password = hashedPassword;


    const createdUser = new this.utilisateurModel(user);

    try {
      const savedUser = await createdUser.save();

      const dto: CreateMailDto = { email: user.email };
      await this.mailService.validationmail(dto);

      return savedUser;
    } catch (error) {

      if (error.code === 11000 && error.keyPattern?.email) {
        throw new ConflictException('Cet email est déjà utilisé');
      }

      this.logger.error('Erreur lors de l’inscription', error.stack);
      throw new InternalServerErrorException('Erreur lors de l’inscription');
    }
  }

 

  async save(dto: Partial<Utilisateur>): Promise<Utilisateur> {
    const created = new this.utilisateurModel(dto);
    return created.save();
  }

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurModel.find().exec();
  }

  

  async findById(id: string): Promise<Utilisateur | null> {
    return this.utilisateurModel.findById(id).exec();
  }
   async findOneByEmail(email: string): Promise<Utilisateur | null> {
    return this.utilisateurModel.findOne({ email }).exec();
  }
}
