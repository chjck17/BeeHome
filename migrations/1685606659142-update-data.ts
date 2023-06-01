import { MigrationInterface, QueryRunner } from "typeorm";

export class updateData1685606659142 implements MigrationInterface {
    name = 'updateData1685606659142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "bank_name"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "trading_code"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "trading_title"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "amount_of_money"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" ADD "status" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "amount_of_money" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "trading_title" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "trading_code" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "bank_name" character varying(50)`);
    }

}
