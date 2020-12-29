import { MigrationInterface, QueryRunner } from "typeorm";
import { IConference } from "../types/Conference";

export class ConferenceStub1609277824547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const values = conferences
      .map(({ id, slug, name, shortDescription, date }) => `(${id}, '${slug}', '${name}', '${shortDescription}', '${date}')`)
      .join(", ");

    await queryRunner.query(
      `INSERT OR IGNORE INTO conference (id, slug, name, shortDescription, date) VALUES ${values}`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const values = conferences.map(conference => conference.id).join(', ');
    await queryRunner.query(`DELETE FROM conference WHERE id IN (${values})`)
  }
}

const conferences: IConference[] = [
  {
    "id": 1,
    "slug": "first-ru-conf",
    "name": "Первая российская научная конференция",
    "shortDescription": "Научная конференция, посвященная последним инновациям и открытиям в области техники и медицины. Лучшие специалисты обсудят дальнейшие направления исследований и перспективы развития.",
    "date": "14 января, 2020"
  },
  {
    "id": 2,
    "slug": "ostu",
    "name": "ОГТУ",
    "shortDescription": "Конференция, организованная студентами ОГТУ для обсуждения последних достижений университета.",
    "date": "05 мая, 2020"
  }
]