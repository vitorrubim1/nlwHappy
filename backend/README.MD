      file "ormconfig.json":

"database": >> aonde está o banco,
"type": >> banco sqlite

""migrations": [
"./src/database/migrations/*.ts"
],": >> tudo que tiver ".ts" dentro desta pasta, será migration

"entities": [
"./src/models/*.ts"
],: >> todos os arquvos q tiver, ele entenderá como entidade da aplicação

"migrationsDir" >> diretorio aonde será criado as migrations

      file "package.json":

"dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts": >> passo o server, pra ignorar o node modules pra reestartar mais rapido

"typeorm": "ts-node-dev ./node_modules/typeorm/cli.js": >> pra rodar os comando de banco, migrations ..

      //para criar migration

yarn typeorm migration:create -n NomeDaMigration

<!-- pra cada tabela, é necessario uma classe que a represente, dentro de models -->

      //para rodar as migrations

yarn typeorm migration:run

      //para desfazer a migration anterior

yarn typeorm migration:revert
