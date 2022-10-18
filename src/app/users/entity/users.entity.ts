import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { hashSync } from 'bcrypt';


@Entity({ name: 'usuarios' })
export class UsersEntity {
    
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

    // @CreateDateColumn({ name: 'created_at' })
    // createAt: string;

    // @UpdateDateColumn({ name: 'update_at' })
    // updateAt: string;

    // @DeleteDateColumn({ name: 'delete_at'})
    // deleteAt: string

    @BeforeInsert()
    hashPassword() {
        this.usr_password = hashSync(this.usr_password, 10);
    }
}