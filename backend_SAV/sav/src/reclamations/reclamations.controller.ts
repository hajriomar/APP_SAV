import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReclamationsService } from './reclamations.service';
import { CreateReclamationDto } from './type/dto/create-reclamation.dto';
import { UpdateReclamationDto } from './type/dto/update-reclamation.dto';

@Controller('reclamations')
export class ReclamationsController {
  constructor(private readonly reclamationsService: ReclamationsService) {}

  @Post()
  create(@Body() createReclamationDto: CreateReclamationDto) {
    return this.reclamationsService.create(createReclamationDto);
  }

  @Get()
  findAll() {
    return this.reclamationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reclamationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReclamationDto: UpdateReclamationDto) {
    return this.reclamationsService.update(+id, updateReclamationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reclamationsService.remove(+id);
  }
}
