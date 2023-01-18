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

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      []

    const { user } = context.switchToHttp().getRequest()
    console.log('rules')
    console.log(rules)

    const ability = this.caslAbilityFactory.createForUser(user)

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
