import { MigrationInterface, QueryRunner } from "typeorm";

export class updateData1685516431898 implements MigrationInterface {
    name = 'updateData1685516431898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "amount_of_money"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "bank_name"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "trading_code"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "trading_title"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "bank_name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "trading_code" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "trading_title" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "amount_of_money" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "status" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."bill_pack_type_enum" AS ENUM('FREE', 'BASIC', 'PREMIUM')`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "pack_type" "public"."bill_pack_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "transaction_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "transaction_title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "price" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "bank" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "card_type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "card_type"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "bank"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "transaction_title"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "pack_type"`);
        await queryRunner.query(`DROP TYPE "public"."bill_pack_type_enum"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "amount_of_money"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "trading_title"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "trading_code"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "bank_name"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "trading_title" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "trading_code" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "bank_name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "status" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "amount_of_money" character varying(50)`);
    }

}
