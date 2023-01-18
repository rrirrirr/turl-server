import { Test, TestingModule } from '@nestjs/testing';
import { TournamentAdminsController } from './tournament_admins.controller';
import { TournamentAdminsService } from './tournament_admins.service';

describe('TournamentAdminsController', () => {
  let controller: TournamentAdminsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentAdminsController],
      providers: [TournamentAdminsService],
    }).compile();

    controller = module.get<TournamentAdminsController>(TournamentAdminsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
