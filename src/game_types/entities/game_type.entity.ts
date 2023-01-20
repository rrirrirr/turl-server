import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class GameType {
  @PrimaryKey()
  name!: string

  @Property()
  enabled!: boolean

  @Property()
  description!: string
}
