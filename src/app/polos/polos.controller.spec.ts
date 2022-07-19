import { Test, TestingModule } from '@nestjs/testing';
import { PolosController } from './polos.controller';

describe('PolosController', () => {
  let controller: PolosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolosController],
    }).compile();

    controller = module.get<PolosController>(PolosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
