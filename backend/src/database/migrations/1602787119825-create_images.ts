import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1602787119825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true, //não pode ser negativa
            isPrimary: true,
            isGenerated: true, //ser gerada automaticamente
            generationStrategy: "increment", //auto increment
          }, //cada coluna é representada por um objeto
          {
            name: "path", //onde ela será salva
            type: "varchar",
          },
          {
            name: "orphanage_id", //id do orfanato
            type: "integer",
          },
        ],

        foreignKeys: [
          {
            name: "image_orphanage",
            columnNames: ["orphanage_id"], //coluna q vai armazenar o id
            referencedTableName: "orphanages",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("images")
  }
}
