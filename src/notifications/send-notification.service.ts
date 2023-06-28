import { HttpException, Injectable } from '@nestjs/common';
import Axios from 'axios';

@Injectable()
export class SendNotificationService {
  async sendNotification(channel: string, message: object) {
    const url = process.env.NOTIFICATION_URL + '/' + channel;
    const body = message;

    const response = await Axios.post(url, body)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new HttpException(
          'NTFY ' + err.response.data.error,
          err.response.status,
        );
      });

    return response;
  }
}
