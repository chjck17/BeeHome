import { MigrationInterface, QueryRunner } from "typeorm";

export class fixCustomerColumnName1677413740006 implements MigrationInterface {
    name = 'fixCustomerColumnName1677413740006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "firebase_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "firebase_id" character varying NOT NULL`);
    }

}
