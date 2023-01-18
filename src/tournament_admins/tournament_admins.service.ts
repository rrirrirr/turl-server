import { Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectConnection } from 'nest-knexjs'
import { CreateTournamentAdminDto } from './dto/create-tournament_admin.dto'
import { UpdateTournamentAdminDto } from './dto/update-tournament_admin.dto'
import { TournamentAdmin } from './entities/tournament_admin.entity'

@Injectable()
export class TournamentAdminsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(queries: any): Promise<TournamentAdmin[] | undefined> {
    const tournamentAdmins = await this.knex
      .table('tournament_admins')
      .where(queries)
    return tournamentAdmins
  }

  async create(createTournamentAdminDto: CreateTournamentAdminDto) {
    const result = await this.knex
      .table('tournament_admins')
      .insert(createTournamentAdminDto, ['id'])
    return result
  }

  async findOne(id: string): Promise<TournamentAdmin | undefined> {
    const tournamentAdmin = await this.knex
      .table('tournament_admins')
      .select()
      .where({ id: id })
    return tournamentAdmin[0]
  }

  async findByTournamentId(id: string): Promise<TournamentAdmin[]> {
    const tournamentAdmins = await this.knex
      .table('tournament_admins')
      .select()
      .where({ tournament_id: id })
    return tournamentAdmins
  }

  async findByUserId(id: string): Promise<TournamentAdmin[] | undefined> {
    const tournamentAdmins = await this.knex
      .table('tournament_admins')
      .select()
      .where({ user_id: id })
    return tournamentAdmins
  }

  update(id: string, updateTournamentAdminDto: UpdateTournamentAdminDto) {
    return `This action updates a #${id} tournamentAdmin`
  }

  async remove(id: string) {
    const res = await this.knex
      .table('tournament_admins')
      .where({ id: id })
      .del()
    return res
  }
}
