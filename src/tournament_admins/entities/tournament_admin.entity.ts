import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { Tournament } from 'src/tournaments/entities/tournament.entity'
import { User } from 'src/users/entities/user.entity'
import { v4 } from 'uuid'

@Entity()
export class TournamentAdmin {
  @PrimaryKey()
  id: string = v4()
  @OneToOne(() => User)
  user_id: string
  @OneToOne(() => Tournament)
  tournament_id: string
}
