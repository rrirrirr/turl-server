import { Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { Game } from 'src/games/entities/game.entity'
import { Team } from 'src/teams/entities/team.entity'
import { Tournament } from 'src/tournaments/entities/tournament.entity'
import { User } from 'src/users/entities/user.entity'
import v4 from 'uuid'

@Entity()
export class Message {
  @PrimaryKey()
  id: string = v4()

  @Property()
  text!: string

  @Property()
  time: Date = new Date()
}

@Entity()
export class MessagesGames {
  @PrimaryKey()
  id: string = v4()

  @ManyToMany(() => Message)
  message_id!: string

  @ManyToMany(() => Game)
  game_id!: string
}

@Entity()
export class MessagesTournaments {
  @PrimaryKey()
  id: string = v4()

  @ManyToMany(() => Message)
  message_id!: string

  @ManyToMany(() => Tournament)
  tournament_id!: string
}

@Entity()
export class MessagesUsers {
  @PrimaryKey()
  id: string = v4()

  @ManyToMany(() => Message)
  message_id!: string

  @ManyToMany(() => User)
  user_id!: string
}

@Entity()
export class MessagesTeams {
  @PrimaryKey()
  id: string = v4()

  @ManyToMany(() => Message)
  message_id!: string

  @ManyToMany(() => Team)
  team_id!: string
}
