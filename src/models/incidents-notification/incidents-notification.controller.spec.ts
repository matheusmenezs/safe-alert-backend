import { Test, TestingModule } from '@nestjs/testing';
import { IncidentsNotificationController } from './incidents-notification.controller';
import { IncidentsNotificationService } from './incidents-notification.service';

describe('IncidentsNotificationController', () => {
  let controller: IncidentsNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncidentsNotificationController],
      providers: [IncidentsNotificationService],
    }).compile();

    controller = module.get<IncidentsNotificationController>(
      IncidentsNotificationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
