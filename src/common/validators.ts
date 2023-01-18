import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueEmailvalidation,
    })
  }
}

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class UniqueEmailvalidation implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly knex: Knex) {}
  async validate(email: string): Promise<boolean> {
    const user = await this.knex.table('users').select().where({ email: email })
    if (user.length) {
      throw new UnprocessableEntityException('Email already exists')
    } else {
      return true
    }
  }
}
