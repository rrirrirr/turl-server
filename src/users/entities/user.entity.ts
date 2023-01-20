import { v4 } from 'uuid'
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class User {
  @PrimaryKey()
  id: string = v4()

  @Property()
  first_name!: string

  @Property()
  last_name!: string

  @Property()
  isAdmin!: boolean

  @Property()
  email!: string

  @Property()
  password!: string

  @Property({ nullable: true })
  telephone_num?: string

  @Property()
  created_at: Date = new Date()

  constructor() {}
}
