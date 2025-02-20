import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { RefreshToken } from "src/auth/entities/refresh-token.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
@Unique('USR_UK', ['usr_email'])
export class User {

    @PrimaryGeneratedColumn({
        name: 'usr_id',
    })
    @IsNumber()
    usr_id: number;

    @Column({
        name: 'usr_email',
    })
    @IsNotEmpty()
    @IsEmail()
    usr_email: string;

    @Column({
        name: 'usr_password',
        nullable: true,
    })
    @IsOptional()
    @IsString()
    usr_password?: string;

    @Column({
        name: 'usr_create',
        nullable: true,
    })
    @IsOptional()
    @IsDateString()
    usr_create?: Date;

    @Column({
        name: 'usr_update',
        nullable: true,
    })
    @IsOptional()
    @IsDateString()
    usr_update?: Date;

    @Column({
        name: 'usr_delete',
        nullable: true,
    })
    @IsOptional()
    @IsDateString()
    usr_delete?: Date;

    @OneToOne(() => RefreshToken, refresh => refresh.user)
    refreshToken: RefreshToken;
}
