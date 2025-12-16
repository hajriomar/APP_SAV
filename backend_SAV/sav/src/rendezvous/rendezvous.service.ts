import { Injectable, NotFoundException, Logger, BadRequestException , ForbiddenException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RendezVous } from './schemas/rendezvous.schema';
import { CreateRendezvousDto } from './type/dto/create-rendezvous.dto';
import { UpdateRendezvousDto } from './type/dto/update-rendezvous.dto';
import { RendezVousEtat } from './type/enum/rendezvous_etat.enum';

@Injectable()
export class RendezvousService {
  constructor(
    @InjectModel(RendezVous.name)
    private readonly rendezvousModel: Model<RendezVous>,
  ) {}

  async create(dto: CreateRendezvousDto, userId: string): Promise<RendezVous> {
    const rendezvous = new this.rendezvousModel({
      ...dto,
      user_id: userId,
      date: new Date(dto.date),
    });

    return rendezvous.save();
  }

  async findByUser(userId: string): Promise<RendezVous[]> {
    return this.rendezvousModel
      .find({ user_id: userId })
      .populate('vehicule_id')
      .populate('atelier_id')
      .exec();
  }

  async findOne(id: string): Promise<RendezVous | null> {
    return this.rendezvousModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateRendezvousDto, userId: string) {
    const rdv = await this.rendezvousModel.findOne({
      _id: id,
      user_id: userId,
    });

    if (!rdv) throw new ForbiddenException();

    Object.assign(rdv, dto);
    return rdv.save();
  }

  async remove(id: string, userId: string) {
    const rdv = await this.rendezvousModel.findOneAndDelete({
      _id: id,
      user_id: userId,
    });

    if (!rdv) throw new ForbiddenException();

    return 'Rendez-vous supprimé';
  }
}
