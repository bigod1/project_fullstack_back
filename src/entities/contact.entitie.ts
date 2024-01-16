import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entitie";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telephone: string;

  @Column({type: "date"})
  dateJoin: Date;

  @ManyToOne(() => Client)
  client: Client
}

export { Contact };
