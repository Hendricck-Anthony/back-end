import { 
    PrimaryGeneratedColumn, 
    Column, 
    Entity, 
} 
from 'typeorm';

@Entity({ name: 'tb_matricula' })
export class WebhookEntity {
    
    @PrimaryGeneratedColumn('uuid')
    mat_id: string;

    @Column({ name: 'mat_status', width: 255})
    mat_status: string;
    
}