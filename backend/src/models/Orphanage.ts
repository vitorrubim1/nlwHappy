import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";

import Image from "./Images";

@Entity("orphanages") //automaticamente o typeorm, vai saber que esta classe abaixo esta associada com esta tabela do bd
export default class Orphanage {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  //nao tem no banco de dados
  @OneToMany(() => Image, (image) => image.orphanage, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "orphanage_id" }) //nome da coluna qe armazana o relacionamento de orfanato com imagem
  images: Image[];
}
