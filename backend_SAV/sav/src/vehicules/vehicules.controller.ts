import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehiculesService } from './vehicules.service';
import { CreateVehiculeDto } from './type/dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './type/dto/update-vehicule.dto';

@Controller('vehicules')
export class VehiculesController {
  constructor(private readonly vehiculesService: VehiculesService) {}

  @Post()
  create(@Body() createVehiculeDto: CreateVehiculeDto) {
    return this.vehiculesService.create(createVehiculeDto);
  }

  @Get()
  findAll() {
    return this.vehiculesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiculesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehiculeDto: UpdateVehiculeDto) {
    return this.vehiculesService.update(+id, updateVehiculeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiculesService.remove(+id);
  }
}
