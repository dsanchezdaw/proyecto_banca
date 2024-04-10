import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from './card/card.module';
import { MovesModule } from './moves/moves.module';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
