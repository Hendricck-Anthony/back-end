import { Test, TestingModule } from '@nestjs/testing';
import { PolosService } from './polos.service';

describe('PolosService', () => {
  let service: PolosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolosService],
    }).compile();

    service = module.get<PolosService>(PolosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
