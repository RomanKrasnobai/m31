import { Test, TestingModule } from '@nestjs/testing';
import { Items } from './items';

describe('Items', () => {
  let provider: Items;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Items],
    }).compile();

    provider = module.get<Items>(Items);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
