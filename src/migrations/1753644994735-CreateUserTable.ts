import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1753644994735 implements MigrationInterface {
    name = 'CreateUserTable1753644994735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, "method" character varying NOT NULL, "headers" jsonb, "body" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "request_group_id" uuid, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "workspace_id" uuid, CONSTRAINT "PK_6a34c14e16036848693877ceb9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workspace" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_provider_enum" AS ENUM('google', 'local')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "provider" "public"."user_provider_enum" NOT NULL DEFAULT 'local'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_b73b8deb743510504a8164ec6e1" FOREIGN KEY ("request_group_id") REFERENCES "request_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request_group" ADD CONSTRAINT "FK_a7ddce4e6c697b95f31720570bb" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace" ADD CONSTRAINT "FK_a09cff0ab849da007d391eb9284" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" DROP CONSTRAINT "FK_a09cff0ab849da007d391eb9284"`);
        await queryRunner.query(`ALTER TABLE "request_group" DROP CONSTRAINT "FK_a7ddce4e6c697b95f31720570bb"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_b73b8deb743510504a8164ec6e1"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
        await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`);
        await queryRunner.query(`DROP TABLE "workspace"`);
        await queryRunner.query(`DROP TABLE "request_group"`);
        await queryRunner.query(`DROP TABLE "request"`);
    }

}
