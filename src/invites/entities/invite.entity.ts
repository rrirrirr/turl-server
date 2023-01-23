import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { Tournament } from 'src/tournaments/entities/tournament.entity'
import { v4 } from 'uuid'

@Entity()
export class Invite {
  @PrimaryKey()
  id: string = v4()

  @Property({ nullable: true })
  code: string = v4()

  @Property({ nullable: true })
  expiration_date?: Date

  @Property()
  unique!: boolean

  @Property()
  used: boolean = false

  @Property({ nullable: true })
  name?: string

  @ManyToOne(() => Tournament)
  tournament!: Tournament
  // @ManyToOne(() => Tournament)
  // tournament!: string

  @Property()
  created_at: Date = new Date()

  constructor() {}
}
