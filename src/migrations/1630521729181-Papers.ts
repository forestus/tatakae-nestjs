import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Papers1630521729181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'papers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'title', type: 'varchar' },
          { name: 'index', type: 'int' },
          { name: 'abstract', isNullable: true, type: 'varchar' },
          { name: 'file_url', isNullable: true, type: 'varchar' },
          { name: 'author', type: 'jsonb' },
          { name: 'submission_module_id', type: 'uuid' },
          { name: 'submission_category_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKSubmissionModulePapers',
            referencedTableName: 'submission_module',
            referencedColumnNames: ['id'],
            columnNames: ['submission_module_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCategoriesPapers',
            referencedTableName: 'submission_categories',
            referencedColumnNames: ['id'],
            columnNames: ['submission_category_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('papers');
  }
}
