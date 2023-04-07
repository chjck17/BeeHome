import { MigrationInterface, QueryRunner } from "typeorm";

export class editTableDb1680840284608 implements MigrationInterface {
    name = 'editTableDb1680840284608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_type_detail" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" ADD "version" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "category_detail" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category_detail" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category_detail" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "category_detail" ADD "version" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "tag" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room_attribute_term" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "category" ADD "version" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_d0be05b78e89aff4791e6189f77" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_attribute_term" ADD CONSTRAINT "FK_b1e1e2555ea1a5ad32a13c2c18f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_attribute_term" DROP CONSTRAINT "FK_b1e1e2555ea1a5ad32a13c2c18f"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_d0be05b78e89aff4791e6189f77"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "room_attribute_term" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "category_detail" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "category_detail" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "category_detail" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "category_detail" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" DROP COLUMN "created_at"`);
    }

}
