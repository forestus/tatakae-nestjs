import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Description1635542323831 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'description',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'episodes', type: 'varchar' },
          { name: 'picture', type: 'varchar' },
          { name: 'score', type: 'varchar' },
          { name: 'aired', type: 'varchar' },
          { name: 'status', type: 'varchar' },
          { name: 'genres', type: 'varchar' },
          { name: 'synopsys', type: 'varchar' },
          { name: 'anime_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKDescriptionAnime',
            referencedTableName: 'anime',
            referencedColumnNames: ['id'],
            columnNames: ['anime_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('description');
  }
}
