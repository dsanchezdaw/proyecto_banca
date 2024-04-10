import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { MovesService } from 'src/moves/moves.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Move } from 'src/moves/entities/move.entity';
import { Card } from './card.entity';
import { MovesModule } from 'src/moves/moves.module';

@Module({
  imports: [TypeOrmModule.forFeature([Move,Card]), MovesModule],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService]
})
export class CardModule {}
