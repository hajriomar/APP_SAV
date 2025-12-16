import { Controller, Post, Body, Get, Param ,NotFoundException , Patch, Delete ,UseGuards ,Req} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './type/dto/create-utilisateur.dto';
import { Utilisateur } from './schemas/utilisateur.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {UpdateUtilisateurDto} from './type/dto/update-utilisateur.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('utilisateur')
@ApiBearerAuth()
@Controller('utilisateur')
export class UtilisateurController {
  constructor(
    private readonly utilisateurService: UtilisateurService,
  ) {}

  @Post('inscription')
  async inscription(
    @Body() createUtilisateurDto: CreateUtilisateurDto,
  ): Promise<Utilisateur> {
    return this.utilisateurService.inscription(createUtilisateurDto);
  }

  @Get()
  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurService.findAll();
  }

 
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Utilisateur | null> {
    return this.utilisateurService.findById(id);
  }

  @Get('email/:email')
  async findOneByEmail(
    @Param('email') email: string,
  ): Promise<any> {
    const user = await this.utilisateurService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    const { password, __v, ...safe } = user.toObject();
    return safe;
  }

//@UseGuards(JwtAuthGuard, RolesGuard)
//@Roles('admin')
@Delete(':id')
async deleteUtilisateur(@Param('id') id: string) {
  return this.utilisateurService.delete(id);
}


@UseGuards(JwtAuthGuard)
@Patch('me')
async updateMe(@Req() req, @Body() updateData: UpdateUtilisateurDto) {
  const userId = req.user.id;  
  return this.utilisateurService.update(userId, updateData);
}

}
