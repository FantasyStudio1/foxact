import { fdir as Fdir } from 'fdir';
import path from 'node:path';

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');

export async function getEntries() {
  const files = await new Fdir()
    .withRelativePaths()
    .crawl(srcDir)
    .withPromise();

  return files.reduce<Record<string, string>>((prev, cur) => {
    const entryName = path.basename(cur, path.extname(cur));
    const dir = path.dirname(cur);

    if (entryName === 'index') {
      prev[dir] = path.join('src', cur);
    }
    return prev;
  }, {});
}
