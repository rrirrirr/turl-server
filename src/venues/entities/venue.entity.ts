import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Venue {
  @PrimaryKey()
  name!: string
  @Property()
  start_date: Date
  @Property()
  end_date: Date
}
