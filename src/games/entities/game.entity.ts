import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
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
  court: string

  @Property({ nullable: true })
  startTime: Date

  @Property({ nullable: true })
  result: Result

  @ManyToOne(() => Venue)
  venue!: string

  @ManyToOne(() => Tournament)
  tournament_id: string
}
