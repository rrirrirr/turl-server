import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { Action } from '../action.enum'
import { Tournament } from 'src/tournaments/entities/tournament.entity'
import { User } from 'src/users/entities/user.entity'
import { TournamentAdmin } from 'src/tournament_admins/entities/tournament_admin.entity'
import { GameType } from 'src/game_types/entities/game_type.entity'
import { Message } from 'src/messages/entities/message.entity'
import { Venue } from 'src/venues/entities/venue.entity'
import { Invite } from 'src/invites/entities/invite.entity'
import { Game } from 'src/games/entities/game.entity'
import { Team } from 'src/teams/entities/team.entity'

export type Subjects =
  | InferSubjects<
      | typeof Tournament
      | typeof User
      | typeof GameType
      | typeof Message
      | typeof Venue
      | typeof Invite
      | typeof Game
      | typeof Team
      | typeof TournamentAdmin
    >
  | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>)

    if (user.isAdmin) {
      can(Action.Manage, 'all') // read-write access to everything
    } else {
      can(Action.Read, 'all') // read-only access to everything
    }

    can(Action.Create, Tournament)
    // can(Action.Update, Tournament, { authorId: user.id })
    // can(Action.Delete, Tournament, { authorId: user.id })

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    })
  }
}
