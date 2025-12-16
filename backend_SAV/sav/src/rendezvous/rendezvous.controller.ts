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
  Req
} from '@nestjs/common';
import { RendezvousService } from './rendezvous.service';
import { CreateRendezvousDto } from './type/dto/create-rendezvous.dto';
import { UpdateRendezvousDto } from './type/dto/update-rendezvous.dto';
import { RendezVous } from './schemas/rendezvous.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('rendezvous')
@ApiBearerAuth()
@Controller('rendezvous')
@UseGuards(JwtAuthGuard)
export class RendezvousController {
  constructor(private readonly rendezvousService: RendezvousService) {}

  @Post()
  create(
    @Body() dto: CreateRendezvousDto,
    @Req() req,
  ) {
    return this.rendezvousService.create(dto, req.user.id);
  }

  @Get('/me')
  findMyRendezvous(@Req() req) {
    return this.rendezvousService.findByUser(req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRendezvousDto,
    @Req() req,
  ) {
    return this.rendezvousService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.rendezvousService.remove(id, req.user.id);
  }
}
