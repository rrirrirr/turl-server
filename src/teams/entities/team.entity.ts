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
import { v4 } from 'uuid'

@Entity()
export class Team {
  @PrimaryKey()
  id: string = v4()

  @Property()
  name!: string

  @Property({ nullable: true })
  accepted: boolean = null

  @Property({ nullable: true })
  seed?: number

  @Property({ nullable: true })
  team_code: string = v4()

  @Property({ nullable: true })
  password?: string

  @ManyToOne(() => Tournament)
  tournament: string

  @OneToMany(() => Player, (player) => player.team)
  player = new Collection<Player>(this)

  @Property()
  created_at: Date = new Date()

  @ManyToMany(() => Game, (game) => game.teams)
  games = new Collection<Game>(this)
}
