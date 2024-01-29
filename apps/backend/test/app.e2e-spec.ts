import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Item } from '../src/model/item.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Person } from '../src/model/person.entity';
import * as https from 'https';

jest.mock('../src/config/config.service', () => {
  return {
    configService: {
      getTypeOrmConfig: function (): TypeOrmModuleOptions {
        return {
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      getJwtSecret: function (): string {
        return 'secret';
      }
    },
  };
});

async function getBearToken(app: INestApplication): Promise<string> {
  const person = new Person();
  person.email = 'myemail';
  person.password = 'mypassword';
  await request(app.getHttpServer())
    .post('/api/person').send(person)
    .expect(201);
  let bearToken: string;
  await request(app.getHttpServer())
    .post('/api/person/authenticate').send(person)
    .expect(200).expect(({ body }) => {
      expect(body).toBeDefined();
      bearToken = body.access_token;
    });
  return bearToken;
}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/api');
    await app.init();
  });
  it('/api/person (POST)', async () => {
    const person = new Person();
    person.email = 'myemail';
    person.password = 'mypassword';
    await request(app.getHttpServer())
      .post('/api/person').send(person)
      .expect(201).expect(({ body }) => {
        expect(body).toBeDefined();
        expect(body.id).toBeDefined();
        expect(body.email).toEqual(person.email);
      });
    return request(app.getHttpServer())
      .post('/api/person').send(person).expect(function (res) {
        expect(res.text).toContain('email already linked to an account please, please log in');
      })

  });

  it('/api/person/authenticate (GET)', async () => {
    const person = new Person();
    person.email = 'myemail';
    person.password = 'mypassword';
    await request(app.getHttpServer())
      .post('/api/person').send(person)
      .expect(201);

    return request(app.getHttpServer())
      .post('/api/person/authenticate').send(person)
      .expect(200).expect(({ body }) => {
        expect(body).toBeDefined();
      });
  });



  it('/api/item (POST)', async () => {
    let bearerToken = await getBearToken(app);
    const item = new Item();
    item.name = 'test';
    item.description = 'description';
    return request(app.getHttpServer())
      .post('/api/item').send(item).set('Authorization', `Bearer ${bearerToken}`)
      .expect(201)
      .expect(({ body }) => {
        expect(body.name).toEqual(item.name);
        expect(body.description).toEqual(item.description);
        expect(body.id).toBeDefined();
      });
  });
  it('/api/item (GET)', async () => {
    let bearerToken = await getBearToken(app);
    for (let i = 0; i < 10; i++) {
      const item = new Item();
      item.name = 'name' + i;
      item.description = 'description' + i;
      await request(app.getHttpServer()).post('/api/item').set('Authorization', `Bearer ${bearerToken}`)
        .send(item)
        .expect(201);
    }
    return request(app.getHttpServer()).get('/api/item').set('Authorization', `Bearer ${bearerToken}`)
      .expect(200)
      .expect(({ body }) => {
        let items = body as Item[];
        expect(items.length).toEqual(10);
      });
  });
});
