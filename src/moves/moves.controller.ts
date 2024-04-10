import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovesService } from './moves.service';

@Controller('moves')
export class MovesController {
  constructor(private readonly movesService: MovesService) {}

}
