import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnicienDto } from './create-technicien.dto';

export class UpdateTechnicienDto extends PartialType(CreateTechnicienDto) {}
