import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { Tournament } from 'src/tournaments/entities/tournament.entity'
import { User } from 'src/users/entities/user.entity'
import { v4 } from 'uuid'

@Entity()
export class TournamentAdmin {
  @PrimaryKey()
  id: string = v4()

  // @ManyToMany(() => User, 'tournamentAdmin', { owner: true })
  // user = new Collection<User>(this)

  @ManyToOne(() => User)
  user: string

  @ManyToOne(() => Tournament)
  tournament: string

  constructor() {}
}
