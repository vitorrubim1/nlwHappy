import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1602774030057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //Alterações no banco de dados, create, update, delete ...

    await queryRunner.createTable(
      new Table({
        name: "orphanages", //nome da tabela no banco
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
            name: "name",
            type: "varchar",
          },
          {
            name: "latitude",
            type: "decimal",
            scale: 10, //numero dps da virgula
            precision: 2, //numero antes da virgula
          },
          {
            name: "longitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "about",
            type: "text",
          },
          {
            name: "instructions",
            type: "text",
          },
          {
            name: "opening_hours",
            type: "varchar",
          },
          {
            name: "open_on_weekends",
            type: "boolean",
            default: false, //por padrão não
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //Desfazer o que foi feito no metódo up, mudar um campo de string pra int...
    await queryRunner.dropTable("orphanages");
  }
}
