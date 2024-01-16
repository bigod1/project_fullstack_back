import { MigrationInterface, QueryRunner } from "typeorm";

export class EditClientEntitie1703646294003 implements MigrationInterface {
    name = 'EditClientEntitie1703646294003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "dateJoin"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "dateJoin" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "dateJoin"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "dateJoin" TIMESTAMP NOT NULL`);
    }

}
