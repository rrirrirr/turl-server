import { PartialType } from '@nestjs/mapped-types';
import { CreateGameTypeDto } from './create-game_type.dto';

export class UpdateGameTypeDto extends PartialType(CreateGameTypeDto) {}
