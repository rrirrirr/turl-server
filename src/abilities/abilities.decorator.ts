import { SetMetadata } from '@nestjs/common'
import { Action } from './action.enum'
import { Subjects } from './casl-ability.factory/casl-ability.factory'

export interface RequiredRule {
  action: Action
  subject: Subjects
}

export const CHECK_ABILITY = 'check_ablity'
export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements)
