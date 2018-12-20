const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');

it('readme version', async () => {
  const readme = await fs.promises.readFile(path.join(__dirname, '../readme.md'), 'utf8');
  const re = /(?<=[v@])\d+\.\d+\.\d+/g;
  let m = null;
  while ((m = re.exec(readme))) {
    expect(m[0]).toBe(pkg.version);
  }
});
