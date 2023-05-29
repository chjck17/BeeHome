import { MigrationInterface, QueryRunner } from "typeorm";

export class updateData1685367264524 implements MigrationInterface {
    name = 'updateData1685367264524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_to_category" DROP CONSTRAINT "FK_acc9687ea21ad8db3f8a7875441"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_to_category" ADD CONSTRAINT "FK_acc9687ea21ad8db3f8a7875441" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
