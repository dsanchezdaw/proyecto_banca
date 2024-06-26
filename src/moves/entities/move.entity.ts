import { Account } from "src/account/account.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('move')
export class Move{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    amount:number
    @Column()
    concept: string

    @ManyToOne(()=>Account, account => account.moves)
    account: Account
}