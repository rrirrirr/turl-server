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
  message!: string

  @ManyToMany(() => Game)
  game!: string
}

@Entity()
export class MessagesTournaments {
  @PrimaryKey()
  id: string = v4()

  @ManyToMany(() => Message)
  message!: string

  @ManyToMany(() => Tournament)
  tournament!: string
}

@Entity()
export class MessagesUsers {
  @PrimaryKey()
  id: string = v4()

  @ManyToMany(() => Message)
  message!: string

  @ManyToMany(() => User)
  user!: string
}

@Entity()
export class MessagesTeams {
  @PrimaryKey()
  id: string = v4()

  @ManyToMany(() => Message)
  message!: string

  @ManyToMany(() => Team)
  team!: string
}
