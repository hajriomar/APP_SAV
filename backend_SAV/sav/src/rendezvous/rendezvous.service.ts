import { Injectable } from '@nestjs/common';
import { CreateRendezvousDto } from './type/dto/create-rendezvous.dto';
import { UpdateRendezvousDto } from './type/dto/update-rendezvous.dto';

@Injectable()
export class RendezvousService {
  create(createRendezvousDto: CreateRendezvousDto) {
    return 'This action adds a new rendezvous';
  }

  findAll() {
    return `This action returns all rendezvous`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rendezvous`;
  }

  update(id: number, updateRendezvousDto: UpdateRendezvousDto) {
    return `This action updates a #${id} rendezvous`;
  }

  remove(id: number) {
    return `This action removes a #${id} rendezvous`;
  }
}
