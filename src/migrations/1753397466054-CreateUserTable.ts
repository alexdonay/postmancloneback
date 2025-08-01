import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1753397466054 implements MigrationInterface {
  name = 'CreateUserTable1753397466054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "user"
            WHERE id NOT IN (
                SELECT MIN(id) FROM "user"
                GROUP BY email
            )
            AND email IN (
                SELECT email FROM "user"
                GROUP BY email
                HAVING COUNT(*) > 1
            )
        `);

    await queryRunner.query(`
            ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"
        `);
  }
}
