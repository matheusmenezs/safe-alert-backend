import { Test, TestingModule } from '@nestjs/testing';
import { IncidentsNotificationService } from './incidents-notification.service';

describe('IncidentsNotificationService', () => {
  let service: IncidentsNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncidentsNotificationService],
    }).compile();

    service = module.get<IncidentsNotificationService>(
      IncidentsNotificationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
