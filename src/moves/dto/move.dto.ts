import { IsNotEmpty } from "class-validator"

export class CreateMoveDto {
    @IsNotEmpty()
    amount:number
    
    @IsNotEmpty()
    accountNumber: string
    
    @IsNotEmpty()
    concept: string

    
}
