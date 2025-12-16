import { PartialType } from '@nestjs/swagger';
import { CreateRendezvousDto } from './create-rendezvous.dto';

export class UpdateRendezvousDto extends PartialType(CreateRendezvousDto) {}
