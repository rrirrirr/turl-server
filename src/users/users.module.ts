import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'
import { User } from './entities/user.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { SqlEntityRepository } from '@mikro-orm/sqlite'
import { SqliteMikroORM } from '@mikro-orm/sqlite/SqliteMikroORM'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  controllers: [UsersController],
  providers: [UsersService, CaslAbilityFactory, SqlEntityRepository],
})
export class UsersModule {}
