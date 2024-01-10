import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Item } from '../src/model/item.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

 jest.mock('../src/config/config.service', () => {
  return { configService: { getTypeOrmConfig: function() : TypeOrmModuleOptions  { return {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        autoLoadEntities: true,
        synchronize: true,
      } } } };
});
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/api')
    await app.init();
  });

  it('/api/item (POST)', () => {
    const item = new Item();
    item.name = 'test';
    item.description = 'description';
    return request(app.getHttpServer()).post('/api/item').send(item)
      .expect(201).expect(({ body }) => {
        expect(body.name).toEqual(item.name);
        expect(body.description).toEqual(item.description);
        expect(body.id).toBeDefined();
      });
  });
  it('/api/item (GET)', async () => {
    for (let i = 0; i < 10; i++) {
      const item = new Item();
      item.name = 'name' + i;
      item.description = 'description' + i;
      await request(app.getHttpServer()).post('/api/item').send(item).expect(201);
    }
    return request(app.getHttpServer()).get('/api/item').expect(200).expect(({ body }) => {
      let items = body as Item[];
      expect(items.length).toEqual(10)
    });

  });
});
