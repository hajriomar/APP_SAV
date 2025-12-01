import { Injectable } from '@nestjs/common';
import { CreateReclamationDto } from './type/dto/create-reclamation.dto';
import { UpdateReclamationDto } from './type/dto/update-reclamation.dto';

@Injectable()
export class ReclamationsService {
  create(createReclamationDto: CreateReclamationDto) {
    return 'This action adds a new reclamation';
  }

  findAll() {
    return `This action returns all reclamations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reclamation`;
  }

  update(id: number, updateReclamationDto: UpdateReclamationDto) {
    return `This action updates a #${id} reclamation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reclamation`;
  }
}
