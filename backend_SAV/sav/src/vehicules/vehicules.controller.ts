import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  NotFoundException,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  ForbiddenException
} from '@nestjs/common';
import { VehiculesService } from './vehicules.service';
import { CreateVehiculeDto } from './type/dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './type/dto/update-vehicule.dto';
import { Vehicule } from './schemas/vehicule.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('vehicules')
@ApiBearerAuth()
@Controller('vehicules')
@UseGuards(JwtAuthGuard) 
export class VehiculesController {
  constructor(private readonly vehiculesService: VehiculesService) {}

  @Post()
  async create(
    @Body() createVehiculeDto: CreateVehiculeDto,
    @Req() req,
  ): Promise<Vehicule> {
    const userId = req.user.id;
    return this.vehiculesService.create(createVehiculeDto, userId);
  }

  @Get("/user_vehicules")
  async findAll(@Req() req): Promise<Vehicule[]> {
    const userId = req.user.id;
    return this.vehiculesService.findAllByUser(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req,
  ): Promise<Vehicule> {
    const userId = req.user.id;
    const vehicule = await this.vehiculesService.findOne(id);
    
    if (!vehicule) {
      throw new NotFoundException(`Véhicule avec ID ${id} introuvable`);
    }

    if (vehicule.user_id.toString() !== userId) {
      throw new ForbiddenException('Vous n\'avez pas accès à ce véhicule');
    }

    return vehicule;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehiculeDto: UpdateVehiculeDto,
    @Req() req,
  ): Promise<Vehicule> {
    const userId = req.user.id;
    return this.vehiculesService.update(id, updateVehiculeDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<{ message: string }> {
    const userId = req.user.id;
    const message = await this.vehiculesService.remove(id, userId);
    return { message };
  }
}