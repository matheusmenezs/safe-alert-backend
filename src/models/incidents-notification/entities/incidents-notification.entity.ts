export class IncidentsNotification {
  id: string;
  agent_id: string;
  incident_id: string;
  emergency_service_id?: string;

  created_at: Date;
  updated_at?: Date;

  constructor(incidentNotification: Partial<IncidentsNotification>) {
    Object.assign(this, incidentNotification);
  }
}
