import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    await runSeeders(dataSource, {
      seeds: [],
    });
  }
}
