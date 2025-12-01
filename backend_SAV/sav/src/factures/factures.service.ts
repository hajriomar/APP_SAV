import { Injectable } from '@nestjs/common';
import { CreateFactureDto } from './types/dto/create-facture.dto';
import { UpdateFactureDto } from './types/dto/update-facture.dto';

@Injectable()
export class FacturesService {
  create(createFactureDto: CreateFactureDto) {
    return 'This action adds a new facture';
  }

  findAll() {
    return `This action returns all factures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facture`;
  }

  update(id: number, updateFactureDto: UpdateFactureDto) {
    return `This action updates a #${id} facture`;
  }

  remove(id: number) {
    return `This action removes a #${id} facture`;
  }
}
