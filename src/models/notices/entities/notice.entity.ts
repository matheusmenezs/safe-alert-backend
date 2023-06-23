import { NoticeCategory } from '../enums/category.enum';

export class Notice {
  id: string;
  category: NoticeCategory;
  description: string;
  title: string;
  agent_id: string;
  created_at: Date;
  updated_at: Date;

  constructor(notice: Partial<Notice>) {
    Object.assign(this, notice);
  }
}
