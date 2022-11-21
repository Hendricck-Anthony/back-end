import { Injectable, NotFoundException } from '@nestjs/common';
import { RegistrationEntity } from './entity/registration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistrationDTO } from './dto/create-registration.dto';
import { UpdateRegistrationDTO } from './dto/update-registration.dto';
import * as fs from 'fs/promises';
import * as carbone from 'carbone';
import * as pify from 'pify';
import { HttpService } from '@nestjs/axios';
import 'dotenv/config'
const render = async (templatePath: string, data: object, options: carbone.RenderOptions) => pify(carbone.render)(templatePath, data, options)


@Injectable()
export class RegistrationService {    
    constructor(
    @InjectRepository(RegistrationEntity)
    private readonly registrationEntity: Repository<RegistrationEntity>,
    private readonly http : HttpService
  ) {}

  async findAll() {
    return await this.registrationEntity.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await this.registrationEntity.findOneOrFail({where:{mat_id:id}});
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateRegistrationDTO) {
    const registrationData = await this.registrationEntity.save(this.registrationEntity.create(data));
    const zapsignResponse = await this.sendZapSignContract(registrationData.mat_id)
    this.registrationEntity.merge(
      registrationData, 
      {
        ...data, 
        mat_zapsign_signature_link : zapsignResponse?.signers[0]?.sign_url, 
        mat_zapsign_doc_token : zapsignResponse?.token
      }
    );
    const registrationUpdated = await this.registrationEntity.save(registrationData);

    return registrationUpdated
  }

  async updateAndSendContract(id: string, data: UpdateRegistrationDTO) {
    const registration = await this.findOneOrFail(id);
    const zapsignResponse = await this.sendZapSignContract(registration.mat_id)
    this.registrationEntity.merge(
      registration, 
      {
        ...data, 
        mat_zapsign_signature_link : zapsignResponse?.signers[0]?.sign_url, 
        mat_zapsign_doc_token : zapsignResponse?.token
      }
    );
    return await this.registrationEntity.save(registration);
  }

  async update(id: string, data: UpdateRegistrationDTO) {
    const registration = await this.findOneOrFail(id);
    this.registrationEntity.merge(
      registration,
      data
    );
    return await this.registrationEntity.save(registration);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    return await this.registrationEntity.delete(id);
  }

  async generatePDF(id: string) {

    const enrollData = await this.findOneOrFail(id)
    
    var data = {
      TITULO_CONTRATO: "TERMO DE ADESÃO PARA CURSOS DE GRADUAÇÃO",
      NOME: enrollData.mat_name,
      EMAIL: enrollData.mat_email,
      TELCEL: enrollData.mat_mobile_phone,
      TELFIXO: enrollData.mat_home_phone,
      DATANASC: new Date(enrollData.mat_birth_date + "T00:00:00").toLocaleDateString('pt-br', { month: 'numeric', year: 'numeric', day: 'numeric' }),
      SEXO: enrollData.mat_gender,
      CPF: enrollData.mat_document_number,
      RG: enrollData.mat_rg,
      ENDERECO: enrollData.mat_address,
      NUMERO: enrollData.mat_address_number,
      COMPLEMENTO: enrollData.mat_address_complement,
      BAIRRO: enrollData.mat_district,
      CIDADE: enrollData.mat_city,
      UF: enrollData.mat_uf,
      CEP: enrollData.mat_postal_code,
      DAT_EXTENSO: new Date().toLocaleDateString('pt-Br', { dateStyle: 'long' }),
      NOME_ASSINA: enrollData.mat_name,
    };

    // TODO - configurar o caminho para a pasta do servidor onde ficarão os contratos gerados
    const filledPDF = await render(__dirname + '/documents/con_file.odt', data, { convertTo: 'pdf' });
    const path = __dirname + '/documents/'
    const fileName = enrollData.mat_id + "-" + (new Date().toISOString().replace(/\.|\:/g, "-")) + ".pdf"
    await fs.writeFile(path + fileName, filledPDF)
    
    return {
      filledPDF,
      fileName
    }
  }

 async sendZapSignContract(id: string) {

  try {
    const enrollData = await this.findOneOrFail(id)
    const pdf = await this.generatePDF(id)
    const base64_pdf = pdf.filledPDF.toString('base64')
    const response = await this.http.post(
      'https://api.zapsign.com.br/api/v1/docs/',
    {
      "name": "TERMO DE ADESÃO FECAF - " + enrollData.mat_id,
      "external_id" : enrollData.mat_id,
      "sandbox" : true,
      "signers":[
        {
          "name" : enrollData.mat_name,
          "email": enrollData.mat_email,
          "send_automatic_email": true,
          "lock_email": true,
          "lock_phone" : true,
          "phone_country" : "55",
          "phone_number" : enrollData.mat_mobile_phone,
          "auth_mode" : "assinaturaTela-tokenEmail",
          "qualification": "Contratante"
        }
      ],
      "base64_pdf": base64_pdf
    },
    {
      headers : { 
        'Content-Type' : 'application/json',
        'Accept' : '*/*',
        'Authorization' : 'Bearer ' + process.env.ZAP_SIGN_API_KEY
      }           
    }
    ).toPromise()
    return response.data
  } catch (error) {
    console.log("Erro ao tentar postar o arquivo zapsign", error)
  }

            // buscar registro do banco de dados baseado neste id e armazenar em uma const
      // gerar o pdf e armazenar em uma const. 
      // converter o arquivo pdf para base64
      // fazer requisição para zapsign e armazenar a resposta em uma const
      // retornar a resposta da zapsign que esta armazenado na const 

 }
}