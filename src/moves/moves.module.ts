import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { MovesController } from './moves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Move } from './entities/move.entity';
import { Account } from 'src/account/account.entity';
import { Card } from 'src/card/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Move, Account, Card])],
  controllers: [MovesController],
  providers: [MovesService],
  exports: [MovesService]
})
export class MovesModule {}
