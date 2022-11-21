import { Injectable, NotFoundException } from '@nestjs/common';
import { WebhookEntity } from './entity/webhook.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import 'dotenv/config'
import { RegistrationService } from '../registration/registration.service';


@Injectable()
export class WebhookService {    

  
    constructor(
    private readonly registrationService: RegistrationService
  ) {}
    
  async webhookZapsign(zapsignData: any) {
  
    if (zapsignData.status !== "signed"){ 
      return 'Documento não assinado por todas as partes'
    } 
    try{
      const registration = await this.registrationService.update(zapsignData.external_id, {mat_status: 'Assinado'});
      return registration;
    } catch(error) {
      return error
    }

  }
}