import { Role } from "src/util/common/user-role";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    firstName: string;

    @Column({ type: 'varchar', length: 255 })
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({type: 'boolean', default: false})
    isVerify: boolean;

    @Column({type: 'boolean', default: true})
    isDeleted: boolean;

    @Column({nullable: true})
    verifyCode: string;

    @Column({nullable: true})
    verificationCodeExpiry: Date;

    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;
}
