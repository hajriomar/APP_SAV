import { Injectable, NotFoundException, ConflictException, Logger, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicule } from './schemas/vehicule.schema';
import { CreateVehiculeDto } from './type/dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './type/dto/update-vehicule.dto';
import { Types } from 'mongoose';

@Injectable()
export class VehiculesService {
  private readonly logger = new Logger(VehiculesService.name);

  constructor(
    @InjectModel(Vehicule.name)
    private readonly vehiculeModel: Model<Vehicule>,
  ) {}

  async create(createVehiculeDto: CreateVehiculeDto, userId: string): Promise<Vehicule> {
    try {
      const userObjectId = new Types.ObjectId(userId);

      const existingVehicule = await this.vehiculeModel.findOne({
        immatriculation: createVehiculeDto.immatriculation,
        user_id: userObjectId,
      }).exec();

      if (existingVehicule) {
        throw new ConflictException('Un véhicule avec cette immatriculation existe déjà pour votre compte');
      }

      const vehiculeData = {
        ...createVehiculeDto,
        user_id: userObjectId, 
      };

      const createdVehicule = new this.vehiculeModel(vehiculeData);
      return await createdVehicule.save();
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      this.logger.error('Erreur lors de la création du véhicule', error.stack);
      throw error;
    }
  }

  // Nouvelle méthode : trouver tous les véhicules d'un utilisateur
  async findAllByUser(userId: string): Promise<Vehicule[]> {
    const userObjectId = new Types.ObjectId(userId); 
    return this.vehiculeModel.find({ user_id: userObjectId }).exec();
  }

  // Méthode générale (peut être utilisée par les admins)
  async findAll(): Promise<Vehicule[]> {
    return this.vehiculeModel.find().exec();
  }

  async findOne(id: string): Promise<Vehicule | null> {
    return this.vehiculeModel.findById(id).exec();
  }

  async update(id: string, updateVehiculeDto: UpdateVehiculeDto, userId: string): Promise<Vehicule> {
    const userObjectId = new Types.ObjectId(userId); 
    
    // Vérifier que le véhicule existe et appartient à l'utilisateur
    const vehicule = await this.vehiculeModel.findById(id).exec();
    
    if (!vehicule) {
      throw new NotFoundException(`Véhicule avec ID ${id} introuvable`);
    }
  
    if (vehicule.user_id.toString() !== userId) {
      throw new ForbiddenException('Vous n\'avez pas la permission de modifier ce véhicule');
    }
  
    // Vérifier si l'immatriculation est modifiée et si elle existe déjà
    if (updateVehiculeDto.immatriculation) {
      const existingVehicule = await this.vehiculeModel.findOne({
        immatriculation: updateVehiculeDto.immatriculation,
        _id: { $ne: id },
        user_id: userObjectId, 
      }).exec();

      if (existingVehicule) {
        throw new ConflictException('Un véhicule avec cette immatriculation existe déjà pour votre compte');
      }
    }
  
    const updated = await this.vehiculeModel
      .findByIdAndUpdate(id, updateVehiculeDto, { new: true })
      .exec();
  
    if (!updated) {
      throw new NotFoundException(`Véhicule avec ID ${id} introuvable`);
    }
  
    return updated;
  }

  async remove(id: string, userId: string): Promise<string> {
    const vehicule = await this.vehiculeModel.findById(id).exec();
    
    if (!vehicule) {
      throw new NotFoundException(`Véhicule avec ID ${id} introuvable`);
    }

    if (vehicule.user_id.toString() !== userId) {
      throw new ForbiddenException('Vous n\'avez pas la permission de supprimer ce véhicule');
    }

    const deleted = await this.vehiculeModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Véhicule avec ID ${id} introuvable`);
    }

    return 'Véhicule supprimé avec succès';
  }
}