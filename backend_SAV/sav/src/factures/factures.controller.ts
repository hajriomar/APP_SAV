import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacturesService } from './factures.service';
import { CreateFactureDto } from './types/dto/create-facture.dto';
import { UpdateFactureDto } from './types/dto/update-facture.dto';

@Controller('factures')
export class FacturesController {
  constructor(private readonly facturesService: FacturesService) {}

  @Post()
  create(@Body() createFactureDto: CreateFactureDto) {
    return this.facturesService.create(createFactureDto);
  }

  @Get()
  findAll() {
    return this.facturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFactureDto: UpdateFactureDto) {
    return this.facturesService.update(+id, updateFactureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturesService.remove(+id);
  }
}
