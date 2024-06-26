import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { MovesController } from './moves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Move } from './entities/move.entity';
import { Account } from 'src/account/account.entity';
import { Card } from 'src/card/card.entity';
import { AccountService } from 'src/account/account.service';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([Move, Account, Card]), AccountModule],
  controllers: [MovesController],
  providers: [MovesService],
  exports: [MovesService]
})
export class MovesModule {}
