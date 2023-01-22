import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { Team } from 'src/teams/entities/team.entity'
import { Tournament } from 'src/tournaments/entities/tournament.entity'
import { Venue } from 'src/venues/entities/venue.entity'
export interface Result {}
import { v4 } from 'uuid'

@Entity()
export class Game {
  @PrimaryKey()
  id: string = v4()

  @Property({ nullable: true })
  name?: string

  @Property({ nullable: true })
  court?: string

  @Property({ nullable: true })
  start_date?: Date

  @Property({ nullable: true })
  result?: Result

  @ManyToOne(() => Venue, { nullable: true })
  venue?: string

  @ManyToMany(() => Team, 'games', { owner: true })
  teams = new Collection<Team>(this)

  @ManyToOne(() => Tournament)
  tournament!: string
}
