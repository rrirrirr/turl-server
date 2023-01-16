import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { FormatsService } from './formats.service'
import { CreateFormatDto } from './dto/create-format.dto'
import { UpdateFormatDto } from './dto/update-format.dto'

@Controller('formats')
export class FormatsController {
  constructor(private readonly formatsService: FormatsService) {}

  @Post()
  create(@Body() createFormatDto: CreateFormatDto) {
    return this.formatsService.create(createFormatDto)
  }

  @Get()
  findAll() {
    return this.formatsService.findAll()
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.formatsService.findOne(name)
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateFormatDto: UpdateFormatDto
  ) {
    return this.formatsService.update(name, updateFormatDto)
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.formatsService.remove(name)
  }
}
