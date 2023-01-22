import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { Game } from 'src/games/entities/game.entity'
import { GameType } from 'src/game_types/entities/game_type.entity'
import { Invite } from 'src/invites/entities/invite.entity'
import { Team } from 'src/teams/entities/team.entity'
import { TournamentAdmin } from 'src/tournament_admins/entities/tournament_admin.entity'
import { v4 } from 'uuid'

@Entity()
export class Tournament {
  @PrimaryKey()
  id: string = v4()

  @Property()
  name!: string

  @Property({ nullable: true })
  format?: string

  @Property({ nullable: true })
  max_num_teams?: number

  @Property({ nullable: true })
  min_num_players_in_team?: number

  @Property({ nullable: true })
  end_date?: Date

  @Property({ nullable: true })
  start_date?: Date

  @Property()
  open!: boolean

  @Property({ nullable: true })
  standings?: any

  @ManyToOne(() => GameType)
  game_type!: string

  @Property({ nullable: true })
  description?: string

  @Property()
  created_at: Date = new Date()

  @OneToMany(
    () => TournamentAdmin,
    (tournamentAdmin) => tournamentAdmin.tournament
  )
  tournamentAdmins = new Collection<TournamentAdmin>(this)

  @OneToMany(() => Invite, (invite) => invite.tournament)
  invites = new Collection<Invite>(this)

  @OneToMany(() => Team, (team) => team.tournament)
  teams = new Collection<Team>(this)

  // @OneToMany(() => Game, (game) => game.tournament)
  // games = new Collection<Game>(this)

  constructor() {}
}
