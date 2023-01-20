import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { Tournament } from 'src/tournaments/entities/tournament.entity'
import { v4 } from 'uuid'

@Entity()
export class Invite {
  @PrimaryKey()
  id: string = v4()

  @Property()
  code: string = v4()

  @Property({ nullable: true })
  expiration_date?: Date

  @Property()
  unique!: boolean

  @Property()
  used!: boolean

  @Property({ nullable: true })
  name?: string

  @OneToOne(() => Tournament)
  tournament_id!: string

  @Property()
  created_at: Date = new Date()
}
