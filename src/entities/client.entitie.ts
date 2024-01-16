import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contact.entitie";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  telephone: string;

  @Column({type: "date"})
  dateJoin: Date;

  @OneToMany(() => Contact, contact => contact.client)
  contacts: Contact[]
}

export { Client };
