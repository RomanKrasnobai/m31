import { Test, TestingModule } from '@nestjs/testing';
import { NovaPoshtaController } from './nova-poshta.controller';

describe('NovaPoshta Controller', () => {
  let controller: NovaPoshtaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NovaPoshtaController],
    }).compile();

    controller = module.get<NovaPoshtaController>(NovaPoshtaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
