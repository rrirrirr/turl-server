import { ForbiddenError } from '@casl/ability'
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import {
  AppAbility,
  CaslAbilityFactory,
} from './casl-ability.factory/casl-ability.factory'
import { CHECK_ABILITY, RequiredRule } from './abilities.decorator'
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite'
import { MikroORM } from '@mikro-orm/core'

import { User } from 'src/users/entities/user.entity'

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    // private readonly userRepository: EntityRepository<User>,
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      []

    const { user } = context.switchToHttp().getRequest()
    const user_ = await this.em.findOne(
      User,
      { id: user.userId },
      { populate: ['tournamentAdmin'] }
    )

    console.log('rules')
    console.log(rules)
    console.log('user')
    console.log(user_)
    // console.log(user)
    const userWithAdminRights = {
      ...user_,
      userAdmins: user_.tournamentAdmin
        .toArray()
        .map((admin) => admin.tournament),
    }
    // userWithAdminRights.tournamentAdmin = user_.tournamentAdmin.map(admin => admin.user)
    const ability = this.caslAbilityFactory.createForUser(userWithAdminRights)

    try {
      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
      })
      return true
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message)
      }
    }

    return true
  }
}
