import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { Team } from 'src/teams/entities/team.entity'
import { v4 } from 'uuid'

@Entity()
export class Player {
  @PrimaryKey()
  id: string = v4()

  @Property()
  first_name!: string

  @Property()
  last_name!: string

  @ManyToOne(() => Team)
  team: string

  @Property()
  created_at: Date = new Date()
}
