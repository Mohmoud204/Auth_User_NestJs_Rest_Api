import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 225, nullable: true, type: 'varchar' })
  @IsString({ message: 'Username must be a string.' })
  UserName: string;

  @Column({ unique: true, nullable: true, type: 'varchar' })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  Email: string;

  @Column({ nullable: true, type: 'varchar' })
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  Password: string;

  @Column({ default: 'user' })
  role: string;
}
