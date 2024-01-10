import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist'),
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
