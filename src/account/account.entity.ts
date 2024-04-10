import { Card } from "src/card/card.entity";
import { Move } from "src/moves/entities/move.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('account')
export class Account{
    @PrimaryColumn()
    iban: string
    @Column({unique: true})
    dni:string

    @OneToOne(()=>Card)
    card: Card

    @OneToMany(()=>Move, move => move.account)
    moves: Move
}