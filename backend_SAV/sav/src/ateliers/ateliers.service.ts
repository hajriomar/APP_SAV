import { Injectable } from '@nestjs/common';
import { CreateAtelierDto } from './types/dto/create-atelier.dto';
import { UpdateAtelierDto } from './types/dto/update-atelier.dto';

@Injectable()
export class AteliersService {
  create(createAtelierDto: CreateAtelierDto) {
    return 'This action adds a new atelier';
  }

  findAll() {
    return `This action returns all ateliers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} atelier`;
  }

  update(id: number, updateAtelierDto: UpdateAtelierDto) {
    return `This action updates a #${id} atelier`;
  }

  remove(id: number) {
    return `This action removes a #${id} atelier`;
  }
}
