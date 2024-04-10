import { Account } from "src/account/account.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('card')
export class Card{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    pin:string
    @Column({unique: true})
    type: cardType
    @Column({default: false})
    isActive: boolean

    @OneToOne(() => Account)
    @JoinColumn()
    account: Account
}

export enum cardType{
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT'

}