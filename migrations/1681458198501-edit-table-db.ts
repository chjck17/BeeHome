import { MigrationInterface, QueryRunner } from "typeorm";

export class editTableDb1681458198501 implements MigrationInterface {
    name = 'editTableDb1681458198501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boarding_house_address" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boarding_house_address" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boarding_house_address" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "boarding_house_address" ADD "version" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rule" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rule" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rule" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rule" ADD "version" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rent_deposit" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rent_deposit" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rent_deposit" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rent_deposit" ADD "version" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD "version" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rent_deposit" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rent_deposit" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rent_deposit" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rent_deposit" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rule" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rule" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rule" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_rule" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_address" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_address" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_address" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_address" DROP COLUMN "created_at"`);
    }

}
