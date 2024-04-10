import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { cardDto, simpleCardDto, transferDto } from './dto/card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card, cardType } from './card.entity';
import { Repository } from 'typeorm';
import { MovesService } from 'src/moves/moves.service';
import * as IBAN from 'iban';

@Injectable()
export class CardService {
  
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    private moveService: MovesService
  ){
    
  }
  
  async getAccountMoves(card: simpleCardDto) {
    const cardExist = await this.cardRepository.findOne({where: {id: card.cardNumber}});
    if(cardExist){
      return await this.moveService.getMovesByIban(cardExist.account.iban)
    }else{
      return new HttpException('Card does not existt', HttpStatus.NOT_FOUND)
    }
  }
  
  async takeOutCash(card: cardDto) {
    const cardExist = await this.cardRepository.findOne({where: {id: card.cardNumber}, relations: ['account']});
    
    if(cardExist.type == cardType.CREDIT){
      return await this.moveService.takeMoney(card.amount, cardExist.account.iban, !!cardExist);
    } else if(cardExist.type == cardType.DEBIT){
      if(await this.moveService.getTotalAmount(cardExist.account.iban) > card.amount){
        return new HttpException("To much money to take", HttpStatus.NOT_ACCEPTABLE)
      }else{
        return await this.moveService.takeMoney(card.amount, cardExist.account.iban, !!cardExist);
      }
    }
    
  }
  async takeInCash(card: cardDto) {
    const cardExist = await this.cardRepository.findOne({where: {id: card.cardNumber}, relations: ['account']});
    
    if(cardExist){
      return await this.moveService.depositMoney(card.amount, cardExist.account.iban);
    }else{
      return new HttpException('Card does not exist', HttpStatus.NOT_FOUND);
    }
    
  }

  async createTransfer(card: transferDto) {
    const ibanIsValid = IBAN.isValid(card.iban);
    const iban2IsValid = IBAN.isValid(card.externalIban);
    const cardExist = await this.cardRepository.findOne({where:{id:card.cardNumber}, relations:{account: true}});

    if(ibanIsValid && iban2IsValid){
      this.moveService.createTransfer(card.amount, cardExist.account.iban, card.externalIban)
    }else{
      return new HttpException('this iban is not valid', HttpStatus.BAD_REQUEST)
    }
  }

}
