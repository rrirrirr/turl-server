import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AbilitiesGuard } from 'src/abilities/abilities.guard'
import { CheckAbilities } from 'src/abilities/abilities.decorator'
import { Action } from 'src/abilities/action.enum'
import { User } from './entities/user.entity'
import { ForbiddenError } from '@casl/ability'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: User })
  @Get()
  findAll(@Query() query: any) {
    return this.usersService.findAll(query)
  }

  // @UseGuards(JwtAuthGuard, AbilitiesGuard)
  // @CheckAbilities({ action: Action.Read, subject: User })
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email)
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any
  ) {
    const user = req.user
    try {
      return this.usersService.update(id, updateUserDto, user)
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: User })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
