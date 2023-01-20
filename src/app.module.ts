import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TournamentsController } from './tournaments/tournaments.controller'
import { UsersModule } from './users/users.module'
import { TournamentsModule } from './tournaments/tournaments.module'
import { KnexModule } from 'nest-knexjs'
import { TournamentsService } from './tournaments/tournaments.service'
import { UsersController } from './users/users.controller'
import { GameTypesController } from './game_types/game_types.controller'
import { TeamsController } from './teams/teams.controller'
import { GamesController } from './games/games.controller'
import { InvitesController } from './invites/invites.controller'
import { VenuesController } from './venues/venues.controller'
import { FormatsController } from './formats/formats.controller'
import { MessagesController } from './messages/messages.controller'
import { UsersService } from './users/users.service'
import { GameTypesService } from './game_types/game_types.service'
import { TeamsService } from './teams/teams.service'
import { GamesService } from './games/games.service'
import { InvitesService } from './invites/invites.service'
import { VenuesService } from './venues/venues.service'
import { FormatsService } from './formats/formats.service'
import { MessagesService } from './messages/messages.service'
import { TeamsModule } from './teams/teams.module'
import { GamesModule } from './games/games.module'
import { InvitesModule } from './invites/invites.module'
import { VenuesModule } from './venues/venues.module'
import { FormatsModule } from './formats/formats.module'
import { MessagesModule } from './messages/messages.module'
import { AuthModule } from './auth/auth.module'
import { GameTypesModule } from './game_types/game_types.module'
import { UniqueEmailvalidation } from './common/validators'
import { TournamentAdminsModule } from './tournament_admins/tournament_admins.module'
import { TournamentAdminsController } from './tournament_admins/tournament_admins.controller'
import { TournamentAdminsService } from './tournament_admins/tournament_admins.service'
import { CaslModule } from './abilities/casl.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Tournament } from './tournaments/entities/tournament.entity'
import { User } from './users/entities/user.entity'
import { Invite } from './invites/entities/invite.entity'
import { GameType } from './game_types/entities/game_type.entity'
import { Format } from './formats/entities/format.entity'
import { Team } from './teams/entities/team.entity'
import { Venue } from './venues/entities/venue.entity'
import { Message } from './messages/entities/message.entity'
import { TournamentAdmin } from './tournament_admins/entities/tournament_admin.entity'
import { Game } from './games/entities/game.entity'

@Module({
  imports: [
    UsersModule,
    TournamentsModule,
    GameTypesModule,
    TeamsModule,
    GamesModule,
    InvitesModule,
    VenuesModule,
    FormatsModule,
    MessagesModule,
    CaslModule,
    AuthModule,
    TournamentAdminsModule,

    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      autoLoadEntities: true,
      dbName: 'db.sqlite3',
      type: 'sqlite',
    }),

    MikroOrmModule.forFeature({
      entities: [
        Tournament,
        User,
        Invite,
        GameType,
        Format,
        Team,
        Venue,
        Message,
        TournamentAdmin,
        Game,
      ],
    }),
  ],

  controllers: [
    AppController,
    TournamentsController,
    UsersController,
    GameTypesController,
    TeamsController,
    GamesController,
    InvitesController,
    VenuesController,
    FormatsController,
    MessagesController,
    TournamentAdminsController,
  ],
  providers: [
    AppService,
    TournamentsService,
    UsersService,
    GameTypesService,
    TeamsService,
    GamesService,
    InvitesService,
    VenuesService,
    FormatsService,
    MessagesService,
    TournamentAdminsService,
    UniqueEmailvalidation,
  ],
})
export class AppModule {}
