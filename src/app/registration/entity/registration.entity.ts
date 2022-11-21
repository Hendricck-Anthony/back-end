import { 
    PrimaryGeneratedColumn, 
    Column, 
    Entity, 
} 
from 'typeorm';

@Entity({ name: 'tb_matricula' })
export class RegistrationEntity {
    
    @PrimaryGeneratedColumn('uuid')
    mat_id: string;

    @Column({ name: 'mat_created_at', width: 50 })
    mat_created_at: string;

    @Column({ name: 'mat_email'})
    mat_email: string;

    @Column({ name: 'mat_name'})
    mat_name: string;

    @Column({ name: 'mat_status', width: 255})
    mat_status: string;

    @Column({ name: 'mat_address', width: 255})
    mat_address: string;
    
    @Column({ name: 'mat_address_complement', width: 255})
    mat_address_complement: string;

    @Column({ name: 'mat_address_number', width: 255})
    mat_address_number: string;

    @Column({ name: 'mat_city', width: 255})
    mat_city: string;

    @Column({ name: 'mat_district', width: 255})
    mat_district: string;

    @Column({ name: 'mat_postal_code', width: 255})
    mat_postal_code: string;

    @Column({ name: 'mat_uf', width: 255})
    mat_uf: string;

    @Column({ name: 'mat_pol_description', width: 255})
    mat_pol_description: string;

    @Column({ name: 'mat_document_number', width: 255})
    mat_document_number: string;

    @Column({ name: 'mat_birth_date', width: 255})
    mat_birth_date: string;

    @Column({ name: 'mat_mobile_phone', width: 255})
    mat_mobile_phone: string;

    @Column({ name: 'mat_rg', width: 255})
    mat_rg: string;

    @Column({ name: 'mat_issuing_agency', width: 255})
    mat_issuing_agency: string;

    @Column({ name: 'mat_gender', width: 255})
    mat_gender: string;

    @Column({ name: 'mat_marital_status', width: 255})
    mat_marital_status: string;

    @Column({ name: 'mat_home_phone', width: 255})
    mat_home_phone: string;
    
    @Column({ name: 'mat_zapsign_signature_link', width: 255})
    mat_zapsign_signature_link: string;

    @Column({ name: 'mat_zapsign_doc_token', width: 255})
    mat_zapsign_doc_token: string;
}