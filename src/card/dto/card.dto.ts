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
export class transferDto{
    @IsNotEmpty()
    cardNumber: number
    @IsNotEmpty()
    amount: number
    @IsNotEmpty()
    iban: string
    @IsNotEmpty()
    externalIban: string
}

export class activateCardDto{
    @IsNotEmpty()
    cardNumber: number
}
export class pinCardDto{
    @IsNotEmpty()
    cardNumber: number
    @IsNotEmpty()
    pin: number
}