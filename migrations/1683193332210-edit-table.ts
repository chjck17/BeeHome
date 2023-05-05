import { MigrationInterface, QueryRunner } from "typeorm";

export class editTable1683193332210 implements MigrationInterface {
    name = 'editTable1683193332210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_6efabb86c5fb68b9bb2e4ce66b1"`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_6efabb86c5fb68b9bb2e4ce66b1" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_6efabb86c5fb68b9bb2e4ce66b1"`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_6efabb86c5fb68b9bb2e4ce66b1" FOREIGN KEY ("room_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
