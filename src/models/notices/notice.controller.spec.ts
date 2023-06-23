import { Test, TestingModule } from '@nestjs/testing';
import { NoticesController } from './notice.controller';
import { NoticeService } from './notice.service';

describe('NoticesController', () => {
  let controller: NoticesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticesController],
      providers: [NoticeService],
    }).compile();

    controller = module.get<NoticesController>(NoticesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
