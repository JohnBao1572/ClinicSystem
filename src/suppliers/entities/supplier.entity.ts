import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('suppliers')
export class SupplierEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    description: string;

    @Column({type: 'boolean', default: false})
    isDeleted: boolean;

    @ManyToOne(() => UserEntity, (user)=> user.suppliers)
    addedBy: UserEntity;
}
