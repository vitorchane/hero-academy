import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { HeroesModule } from '../src/heroes/heroes.module';
import { HEROES_REPOSITORY } from '../src/heroes/repository/heroes-repository.interface';

const mockHero = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Peter Parker',
  nickname: 'Homem-Aranha',
  date_of_birth: new Date('2001-08-10'),
  universe: 'MARVEL',
  main_power: 'LANCAMENTO_DE_TEIAS',
  avatar_url: 'https://example.com/spiderman.png',
  is_active: true,
  created_at: new Date(),
  updated_at: new Date(),
};

const mockRepository = {
  create: jest.fn().mockResolvedValue(mockHero),
  findAll: jest.fn().mockResolvedValue({ data: [mockHero], total: 1 }),
  findById: jest.fn().mockResolvedValue(mockHero),
  update: jest.fn().mockResolvedValue(mockHero),
  delete: jest.fn().mockResolvedValue(mockHero),
};

describe('HeroesController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HeroesModule],
    })
      .overrideProvider(HEROES_REPOSITORY)
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository.findById.mockResolvedValue(mockHero);
  });

  describe('POST /api/v1/heroes', () => {
    it('should create a hero (201)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/heroes')
        .send({
          name: 'Peter Parker',
          nickname: 'Homem-Aranha',
          date_of_birth: '2001-08-10T00:00:00.000Z',
          universe: 'MARVEL',
          main_power: 'LANCAMENTO_DE_TEIAS',
          avatar_url: 'https://example.com/spiderman.png',
          is_active: true,
        })
        .expect(201);
    });

    it('should return 400 for invalid body', () => {
      return request(app.getHttpServer())
        .post('/api/v1/heroes')
        .send({ name: '' })
        .expect(400);
    });
  });

  describe('GET /api/v1/heroes', () => {
    it('should return paginated heroes (200)', () => {
      return request(app.getHttpServer())
        .get('/api/v1/heroes')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
        });
    });

    it('should accept query parameters', () => {
      return request(app.getHttpServer())
        .get('/api/v1/heroes?page=1&limit=5&search=spider')
        .expect(200);
    });
  });

  describe('GET /api/v1/heroes/:id', () => {
    it('should return a hero by id (200)', () => {
      return request(app.getHttpServer())
        .get(`/api/v1/heroes/${mockHero.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe('Peter Parker');
        });
    });

    it('should return 404 for non-existent hero', () => {
      mockRepository.findById.mockResolvedValue(null);
      return request(app.getHttpServer())
        .get('/api/v1/heroes/00000000-0000-0000-0000-000000000000')
        .expect(404);
    });
  });

  describe('PATCH /api/v1/heroes/:id', () => {
    it('should update a hero (200)', () => {
      return request(app.getHttpServer())
        .patch(`/api/v1/heroes/${mockHero.id}`)
        .send({ name: 'Peter B. Parker' })
        .expect(200);
    });
  });

  describe('DELETE /api/v1/heroes/:id', () => {
    it('should delete a hero (204)', () => {
      return request(app.getHttpServer())
        .delete(`/api/v1/heroes/${mockHero.id}`)
        .expect(204);
    });
  });
});
