import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { GameType } from 'src/game_types/entities/game_type.entity'
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

  constructor() {}
}
