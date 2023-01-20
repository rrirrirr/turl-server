import { wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/sqlite'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateTournamentAdminDto } from './dto/create-tournament_admin.dto'
import { UpdateTournamentAdminDto } from './dto/update-tournament_admin.dto'
import { TournamentAdmin } from './entities/tournament_admin.entity'

@Injectable()
export class TournamentAdminsService {
  constructor(
    @InjectRepository(TournamentAdmin)
    private readonly tournamentAdminRepository: EntityRepository<TournamentAdmin>
  ) {}

  async findAll(queries: any): Promise<TournamentAdmin[]> {
    const tournamentAdmin = await this.tournamentAdminRepository.findAll()
    return tournamentAdmin
  }

  async create(createTournamentAdminDto: CreateTournamentAdminDto) {
    const tournamentAdmin = new TournamentAdmin()
    wrap(tournamentAdmin).assign(createTournamentAdminDto)
    await this.tournamentAdminRepository.persistAndFlush(tournamentAdmin)
    return tournamentAdmin
  }

  async findOne(id: string): Promise<TournamentAdmin> {
    return this.tournamentAdminRepository.findOne({ id: id })
  }

  async findByTournamentId(id: string): Promise<TournamentAdmin[]> {
    return this.tournamentAdminRepository.find({ tournament_id: id })
  }

  async findByUserId(id: string): Promise<TournamentAdmin[]> {
    return this.tournamentAdminRepository.find({ user_id: id })
  }

  update(id: string, updateTournamentAdminDto: UpdateTournamentAdminDto) {
    return `This action updates a #${id} tournamentAdmin`
  }

  async remove(id: string) {
    const user = await this.tournamentAdminRepository.findOne(id)

    if (!user) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND)
    }

    const res = this.tournamentAdminRepository.removeAndFlush(user)
    return res
  }
}
