import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { Tournament } from 'src/tournaments/entities/tournament.entity'
import { v4 } from 'uuid'

@Entity()
export class Team {
  @PrimaryKey()
  id: string = v4()

  @Property()
  name!: string

  @Property()
  accepted!: boolean

  @Property({ nullable: true })
  seed?: number

  @Property({ nullable: true })
  team_code?: string

  @Property({ nullable: true })
  password?: string

  @OneToOne(() => Tournament)
  tournament_id: string

  @Property()
  created_at: Date = new Date()
}
