import { Test, TestingModule } from '@nestjs/testing';
import { TournamentAdminsService } from './tournament_admins.service';

describe('TournamentAdminsService', () => {
  let service: TournamentAdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentAdminsService],
    }).compile();

    service = module.get<TournamentAdminsService>(TournamentAdminsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
