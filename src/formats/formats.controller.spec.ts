import { Test, TestingModule } from '@nestjs/testing';
import { FormatsController } from './formats.controller';
import { FormatsService } from './formats.service';

describe('FormatsController', () => {
  let controller: FormatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormatsController],
      providers: [FormatsService],
    }).compile();

    controller = module.get<FormatsController>(FormatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
