import { MigrationInterface, QueryRunner } from "typeorm";

export class editTable1683436300276 implements MigrationInterface {
    name = 'editTable1683436300276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "status" character varying DEFAULT 'PROCESSING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "status"`);
    }

}
