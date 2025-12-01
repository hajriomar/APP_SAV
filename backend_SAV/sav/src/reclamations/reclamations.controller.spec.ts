import { Test, TestingModule } from '@nestjs/testing';
import { ReclamationsController } from './reclamations.controller';
import { ReclamationsService } from './reclamations.service';

describe('ReclamationsController', () => {
  let controller: ReclamationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReclamationsController],
      providers: [ReclamationsService],
    }).compile();

    controller = module.get<ReclamationsController>(ReclamationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
