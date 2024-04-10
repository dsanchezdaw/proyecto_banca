import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Move } from './entities/move.entity';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class MovesService {
  
  constructor(
    @InjectRepository(Move) private moveRepository: Repository<Move>,
    private accountService: AccountService
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
    let newAmount = -1 * amount;
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
        amount:newAmount*0.01,
        concept: 'commission',
        account: {iban:iban}
      })
      await this.moveRepository.save(createCommission);
      
      return createAmount;
    }
    
  }
  
  async depositMoney(amount: number, iban: string) {
    const createMove = this.moveRepository.create({
      amount: amount,
      concept: 'deposit',
      account: {iban:iban}
    })
    return await this.moveRepository.save(createMove);
  }
  
  async createTransfer(amount: number, iban: string, externalIban: string){
    const newAmount = -1 * amount;
    
    const destinationAccountExist = this.accountService.getAccount(iban);
    
    if(!!destinationAccountExist){
      const createMove = this.moveRepository.create({
        amount: newAmount,
        concept: 'transfer out',
        account: {iban:iban}
      })
      const createSecondMove = this.moveRepository.create({
        amount: amount,
        concept: 'transfer in',
        account: {iban:iban}
      })
            
      await this.moveRepository.save(createSecondMove);
      return await this.moveRepository.save(createMove);
    }{
      const createMove = this.moveRepository.create({
        amount: newAmount,
        concept: 'transfer out',
        account: {iban:iban}
      })
      const saveMove = await this.moveRepository.save(createMove);

      const createCommission = this.moveRepository.create({
        amount:newAmount*0.01,
        concept: 'commission',
        account: {iban:iban}
      })
      await this.moveRepository.save(createCommission);

      return saveMove;
    }
    
  }
}
