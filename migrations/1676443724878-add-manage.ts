import { MigrationInterface, QueryRunner } from "typeorm";

export class addManage1676443724878 implements MigrationInterface {
    name = 'addManage1676443724878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manager" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "UQ_0df13ca5fe5c3dbbc4da54df8ee" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "FK_0df13ca5fe5c3dbbc4da54df8ee" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "FK_0df13ca5fe5c3dbbc4da54df8ee"`);
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "UQ_0df13ca5fe5c3dbbc4da54df8ee"`);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "user_id"`);
    }

}
