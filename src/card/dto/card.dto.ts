import { IsNotEmpty } from "class-validator"

export class cardDto {
    @IsNotEmpty()
    amount: number
    @IsNotEmpty()
    cardNumber: number
}

export class simpleCardDto{
    @IsNotEmpty()
    cardNumber: number
    @IsNotEmpty()
    iban: string
}
