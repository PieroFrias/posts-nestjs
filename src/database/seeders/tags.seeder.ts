import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Tag } from '../../modules/tags/entities';
import { parseString } from '../helpers';

export class TagSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE "tags" RESTART IDENTITY CASCADE;');

    const dataPath = '../../../src/database/seeders/data/tags.data.json';
    const jsonFilePath = path.join(__dirname, dataPath);
    const data: Tag[] = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    const values = data
      .map((tag) => {
        const id = `'${tag.id}'`;
        const name = parseString(tag.name);
        const status = `'${tag.status}'`;

        return `(${id}, ${name}, ${status})`;
      })
      .join(', ');

    await dataSource.query(
      `INSERT INTO "tags" 
      (id, name, status) 
      VALUES ${values};`,
    );
  }
}
