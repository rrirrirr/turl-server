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
import { AuthUser } from 'src/auth/authUser.entity'

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

interface UserCheck {
  id: string
  first_name: string
  last_name: string
  isAdmin: boolean
  email: string
  telephone_num?: string
  created_at: Date
  userAdmins: string[]
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserCheck) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>)

    if (user.isAdmin) {
      can(Action.Manage, 'all')
    } else {
      can(Action.Read, 'all')
      can(Action.Create, Tournament)
      can(Action.Create, Team)
    }

    // if (user.userAdmins?.length) {
    //   can(Action.Manage, Tournament, { id: { $in: ['adminUsers'] } })
    //   can(Action.Manage, Invite, { 'tournament.id': { $in: ['adminUsers'] } })
    // }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    })
  }
}
