import { v4 } from 'uuid'
import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { TournamentAdmin } from 'src/tournament_admins/entities/tournament_admin.entity'
import { Team } from 'src/teams/entities/team.entity'

@Entity()
export class User {
  @PrimaryKey()
  id: string = v4()

  @Property()
  first_name!: string

  @Property()
  last_name!: string

  @Property()
  isAdmin!: boolean

  @Property()
  email!: string

  @Property({ hidden: true })
  password!: string

  @Property({ nullable: true })
  telephone_num?: string

  @Property()
  created_at: Date = new Date()

  @OneToMany(() => TournamentAdmin, (tournamentAdmin) => tournamentAdmin.user)
  tournamentAdmin = new Collection<TournamentAdmin>(this)

  @ManyToMany(() => Team, 'users', { owner: true })
  teams = new Collection<Team>(this)

  constructor() {}
}
