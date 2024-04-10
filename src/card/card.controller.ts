import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { activateCardDto, cardDto, pinCardDto, simpleCardDto, transferDto } from './dto/card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getAccounts(@Body() card: simpleCardDto ){
    return this.cardService.getAccountMoves(card);
  }

  @Post('out')
  takeOutCash(@Body() card: cardDto){
    this.cardService.takeOutCash(card);
  }

  @Post('in')
  takeInCash(@Body() card: cardDto){
    this.cardService.takeInCash(card);
  }

  @Post('transfer')
  createTransfer(@Body() card: transferDto){
    this.cardService.createTransfer(card);
  }
  @Patch('activate')
  activateCard(@Body() card: activateCardDto){
    this.cardService.activateCard(card);
  }
  @Patch('pin')
  setPinCard(@Body() card: pinCardDto){
    this.cardService.setPinCard(card);
  }


}
