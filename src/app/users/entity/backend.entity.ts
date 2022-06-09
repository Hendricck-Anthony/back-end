import { RouterModule } from '@nestjs/core';
import { 
    PrimaryGeneratedColumn, 
    Column, 
    Entity, 
} 
from 'typeorm';

@Entity({ name: 'usuarios' })
export class BackendEntity {
    
    @PrimaryGeneratedColumn('uuid')
    usr_id: string;

    @Column({ name: 'usr_name', width: 50 })
    usr_name: string;

    @Column({ name: 'usr_username', width: 15 })
    usr_username: string;

    @Column({ name: 'usr_password'})
    usr_password: string;

    @Column({ name: 'usr_email', width: 256})
    usr_email: string;

    @Column({ name:'usr_role'})
    usr_role: string;
}