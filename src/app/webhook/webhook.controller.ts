import { Body, Controller, Post} from '@nestjs/common';
import { WebhookService } from './webhook.service';

  @Controller('/api/v1/webhook')
  export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/zapsignwebhook')
  async webhookZapsign(@Body() zapsignData: any) {
    return await this.webhookService.webhookZapsign(zapsignData);
  }

}