import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Move } from './entities/move.entity';

@Injectable()
export class MovesService {
  
  constructor(
    @InjectRepository(Move) private moveRepository: Repository<Move>
  ){
    
  }
  
  async getMovesByIban(iban: string) {
    return await this.moveRepository.find({where: {account: {iban: iban}}})
  }

  async getTotalAmount(accountIban: string){
    const totalAmount = await this.moveRepository.createQueryBuilder("move").where('accountIban =:accountIban',{accountIban}).select('SUM(amount)', 'totalAmount').getRawOne();
    return totalAmount.totalAmount;
  }

  async takeMoney(amount: number, iban: string, cardExist: boolean) {
    let newAmount = amount - (amount*2);
    if(cardExist){
      const createAmount = this.moveRepository.create({
        amount:newAmount,
        concept: 'take out',
        account: {iban:iban}
      })
      return await this.moveRepository.save(createAmount);      
    }else{
      const createAmount = this.moveRepository.create({
        amount:newAmount,
        concept: 'take out',
        account: {iban:iban}
      })
      await this.moveRepository.save(createAmount);

      const createCommission = this.moveRepository.create({
        amount:newAmount*1.01,
        concept: 'commission',
        account: {iban:iban}
      })
      await this.moveRepository.save(createCommission);

      return createAmount;
    }
    
  }
}
