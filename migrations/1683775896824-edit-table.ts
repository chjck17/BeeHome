import { MigrationInterface, QueryRunner } from "typeorm";

export class editTable1683775896824 implements MigrationInterface {
    name = 'editTable1683775896824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_email_confirmed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_email_confirmed"`);
    }

}
