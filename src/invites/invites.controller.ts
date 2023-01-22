import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'
import { InvitesService } from './invites.service'
import { CreateInviteDto } from './dto/create-invite.dto'
import { UpdateInviteDto } from './dto/update-invite.dto'
import { AbilitiesGuard } from 'src/abilities/abilities.guard'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CheckAbilities } from 'src/abilities/abilities.decorator'
import { Invite } from './entities/invite.entity'
import { Action } from 'src/abilities/action.enum'

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  // @UseGuards(JwtAuthGuard, AbilitiesGuard)
  // @CheckAbilities({ action: Action.Create, subject: Invite })
  @Post()
  create(@Body() createInviteDto: CreateInviteDto, @Request() req: any) {
    const user = req.user

    return this.invitesService.create(createInviteDto, user)
  }

  // @UseGuards(JwtAuthGuard, AbilitiesGuard)
  // @CheckAbilities({ action: Action.Read, subject: Invite })
  @Get()
  findAll(@Query() query: any) {
    return this.invitesService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitesService.findOne(id)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Invite })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInviteDto: UpdateInviteDto,
    @Request() req: any
  ) {
    const user = req.user

    return this.invitesService.update(id, updateInviteDto, user)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Invite })
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const user = req.user

    return this.invitesService.remove(id, user)
  }
}
