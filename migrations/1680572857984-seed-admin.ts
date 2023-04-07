import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedAdmin1680572857984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`WITH ROWS AS
        (INSERT INTO "user" DEFAULT
        VALUES RETURNING id)
        INSERT INTO "admin" ("name", username, "password", user_id, status)
        SELECT 'admin', 'admin', '$2b$12$ziifWL.adNDIX5Xb.r/rVujDykhycShmLzHPwfmg4C66PSpUX/SX2', id, 'ACTIVE' FROM ROWS`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" u WHERE u.id in 
        (SELECT a.user_id FROM "admin" a WHERE a.username = 'admin'); 
    `);
    await queryRunner.query(
      `DELETE FROM "admin" a WHERE a.username = 'admin' ;`,
    );
  }
}
