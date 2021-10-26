import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('anime')
export class AnimeController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all animes';
  }
}
