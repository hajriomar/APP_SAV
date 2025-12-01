import { Test, TestingModule } from '@nestjs/testing';
import { TechniciensController } from './techniciens.controller';
import { TechniciensService } from './techniciens.service';

describe('TechniciensController', () => {
  let controller: TechniciensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechniciensController],
      providers: [TechniciensService],
    }).compile();

    controller = module.get<TechniciensController>(TechniciensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
