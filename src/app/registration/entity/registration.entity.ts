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
}