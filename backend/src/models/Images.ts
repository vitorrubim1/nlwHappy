import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import Orphanage from "./Orphanage";

@Entity("images") //automaticamente o typeorm, vai saber que esta classe abaixo esta associada com esta tabela do bd
export default class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Orphanage, (orphanage) => orphanage.images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage;
}
