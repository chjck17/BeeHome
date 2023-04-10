import { MigrationInterface, QueryRunner } from "typeorm";

export class addTableDb1680860234836 implements MigrationInterface {
    name = 'addTableDb1680860234836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "local_file" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "filename" character varying NOT NULL, "path" character varying NOT NULL, "mimetype" character varying NOT NULL, CONSTRAINT "PK_e391e00bc7475063fd45ee3f38d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public_file" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_bf2f5ba5aa6e3453b04cb4e4720" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public_file"`);
        await queryRunner.query(`DROP TABLE "local_file"`);
    }

}
