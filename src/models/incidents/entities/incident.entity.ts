import { IncidentCategory } from 'prisma/prisma-client';

export class Incident {
  id: string;
  category: IncidentCategory;
  description: string;
  risk_scale: number;
  status: string;

  user_id: string;

  created_at: Date;
  updated_at: Date;

  districts?: string[];

  constructor(incident: Partial<Incident>) {
    Object.assign(this, incident);
  }
}
