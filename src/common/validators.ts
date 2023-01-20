import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/sqlite'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { User } from 'src/users/entities/user.entity'

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
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}
  async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email: email })

    if (user) {
      throw new UnprocessableEntityException('Email already exists')
    } else {
      return true
    }
  }
}
