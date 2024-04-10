import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { cardDto, simpleCardDto } from './dto/card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getAccounts(@Body() card: simpleCardDto ){
    return this.cardService.getAccountMoves(card);
  }

  @Post()
  takeOutCash(@Body() card: cardDto){
    this.cardService.takeOutCash(card);
  }

}
