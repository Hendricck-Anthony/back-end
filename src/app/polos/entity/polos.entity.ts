import { 
    PrimaryGeneratedColumn, 
    Column, 
    Entity, 
} 
from 'typeorm';

@Entity({ name: 'tb_polos' })
export class PolosEntity {

    @PrimaryGeneratedColumn('uuid')
    pol_id: string;

    @Column({ name: 'pol_name', width: 50 })
    pol_name: string;

    @Column({ name: 'pol_status', width: 10 })
    pol_status: string;

    @Column({ name: 'pol_email'})
    pol_email: string;

    @Column({ name: 'pol_is_presential'})
    pol_is_presential: number;
}