import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { GlobalExceptionFilter } from '../src/common/filters/http-exception.filter';

describe('Namu Wellness API (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health returns ok', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('ok');
        expect(res.body.timestamp).toBeDefined();
      });
  });

  it('GET /programs returns paginated list', () => {
    return request(app.getHttpServer())
      .get('/programs?page=1&limit=5')
      .expect(200)
      .expect((res) => {
        expect(res.body.meta).toMatchObject({
          page: 1,
          limit: 5,
        });
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });

  it('POST /programs validates required fields', () => {
    return request(app.getHttpServer())
      .post('/programs')
      .send({ name: 'Invalid' })
      .expect(400);
  });

  it('GET /programs/:id/summary returns report structure', async () => {
    const list = await request(app.getHttpServer()).get('/programs').expect(200);

    if (list.body.data.length === 0) {
      return;
    }

    const programId = list.body.data[0].id;

    return request(app.getHttpServer())
      .get(`/programs/${programId}/summary`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          program_id: programId,
          total_activities: expect.any(Number),
          total_participations: expect.any(Number),
          top_participants: expect.any(Array),
        });
      });
  });
});
