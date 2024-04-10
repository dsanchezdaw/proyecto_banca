import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from './card/card.module';
import { MovesModule } from './moves/moves.module';
import { MovesService } from './moves/moves.service';
import { MovesController } from './moves/moves.controller';
import { CardController } from './card/card.controller';
import { CardService } from './card/card.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'banch',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), AccountModule, CardModule, MovesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
