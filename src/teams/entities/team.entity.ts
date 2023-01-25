import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { Game } from 'src/games/entities/game.entity'
import { Player } from 'src/player/entities/player.entity'
import { Tournament } from 'src/tournaments/entities/tournament.entity'
import { User } from 'src/users/entities/user.entity'
import { v4 } from 'uuid'

export type Application = 'accepted' | 'declined' | 'waiting'

@Entity()
export class Team {
  @PrimaryKey()
  id: string = v4()

  @Property()
  name!: string

  @Property({ nullable: true })
  accepted: Application = 'waiting'

  @Property({ nullable: true })
  seed?: number

  @Property({ nullable: true })
  team_code: string = v4()

  @Property({ hidden: true, nullable: true })
  password?: string

  @ManyToOne(() => Tournament)
  tournament: string

  @OneToMany(() => Player, (player) => player.team)
  player = new Collection<Player>(this)

  @Property()
  created_at: Date = new Date()

  @ManyToMany(() => Game, (game) => game.teams)
  games = new Collection<Game>(this)

  @ManyToMany(() => User, (user) => user.teams)
  users = new Collection<User>(this)
}
