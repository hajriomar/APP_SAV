import { Test, TestingModule } from '@nestjs/testing';
import { RendezvousController } from './rendezvous.controller';
import { RendezvousService } from './rendezvous.service';

describe('RendezvousController', () => {
  let controller: RendezvousController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RendezvousController],
      providers: [RendezvousService],
    }).compile();

    controller = module.get<RendezvousController>(RendezvousController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
