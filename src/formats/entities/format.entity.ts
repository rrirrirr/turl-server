import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Format {
  @PrimaryKey()
  name!: string

  @Property()
  description!: string
}
