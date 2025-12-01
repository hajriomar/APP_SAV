import { Injectable } from '@nestjs/common';
import { CreateTechnicienDto } from './type/dto/create-technicien.dto';
import { UpdateTechnicienDto } from './type/dto/update-technicien.dto';

@Injectable()
export class TechniciensService {
  create(createTechnicienDto: CreateTechnicienDto) {
    return 'This action adds a new technicien';
  }

  findAll() {
    return `This action returns all techniciens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technicien`;
  }

  update(id: number, updateTechnicienDto: UpdateTechnicienDto) {
    return `This action updates a #${id} technicien`;
  }

  remove(id: number) {
    return `This action removes a #${id} technicien`;
  }
}
