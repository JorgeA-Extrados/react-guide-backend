import { Injectable, BadRequestException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { getHashedPassword } from "../../../user/user.utils";
import { User } from "src/user/entities/user.entity";



Injectable()
export class UserDao {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }


    async createUser(createUserDto) {
        try {
            const { usr_email, usr_password } = createUserDto;
            const newEmail = usr_email.toLowerCase()

            let user;

            if (usr_password) {

                const hashedPassword = await getHashedPassword(usr_password);
                user = this.userRepository.create({
                    usr_email: newEmail,
                    usr_password: hashedPassword,
                    usr_create: new Date(),
                })
            } else {
                // Si la contraseña es nula (usuario de Google), guárdala como nula 
                user = this.userRepository.create({
                    usr_email: newEmail,
                    usr_password: null,
                    usr_create: new Date(),
                });
            }

            return await this.userRepository.save(user, { reload: true })

        } catch (error) {

            throw new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: `${error.code} ${error.detail} ${error.message}`,
                error: `User not found`,
            });
        }
    }

    async getUserById(usrId: number) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    usr_id: usrId,
                    usr_delete: IsNull()
                }
            })

            return user

        } catch (error) {
            throw new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: `${error.code} ${error.detail} ${error.message}`,
                error: `User not found`,
            });
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    usr_email: email,
                    usr_delete: IsNull()
                }
            })

            return user

        } catch (error) {
            throw new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: `${error.code} ${error.detail} ${error.message}`,
                error: `User not found`,
            });
        }
    }

}