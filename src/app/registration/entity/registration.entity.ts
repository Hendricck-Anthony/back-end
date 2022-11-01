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

    @Column({ name: 'mat_status', width: 256})
    mat_status: string;

    @Column({ name: 'mat_address', width: 256})
    mat_address: string;
    
    @Column({ name: 'mat_address_complement', width: 256})
    mat_address_complement: string;

    @Column({ name: 'mat_address_number', width: 256})
    mat_address_number: string;

    @Column({ name: 'mat_city', width: 256})
    mat_city: string;

    @Column({ name: 'mat_district', width: 256})
    mat_district: string;

    @Column({ name: 'mat_postal_code', width: 256})
    mat_postal_code: string;

    @Column({ name: 'mat_uf', width: 256})
    mat_uf: string;
    
}