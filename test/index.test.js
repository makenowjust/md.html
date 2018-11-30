it('Render index.html', async () => {
  await page.goto('http://localhost:8080/index.html');
  const body = await page.evaluate(() => document.querySelector('.markdown-body').outerHTML);
  expect(body).toMatchSnapshot();
  const title = await page.evaluate(() => document.title);
  expect(title).toBe('index - md.html');
});

it('Render inline.html', async () => {
  await page.goto('http://localhost:8080/inline.html');
  const body = await page.evaluate(() => document.querySelector('.markdown-body').outerHTML);
  expect(body).toMatchSnapshot();
  const title = await page.evaluate(() => document.title);
  expect(title).toBe('inline - md.html');
});

it('Render block.html', async () => {
  await page.goto('http://localhost:8080/block.html');
  const body = await page.evaluate(() => document.querySelector('.markdown-body').outerHTML);
  expect(body).toMatchSnapshot();
  const title = await page.evaluate(() => document.title);
  expect(title).toBe('block - md.html');
});

it('Render footnote.html', async () => {
  await page.goto('http://localhost:8080/footnote.html');
  const body = await page.evaluate(() => document.querySelector('.markdown-body').outerHTML);
  expect(body).toMatchSnapshot();
  const title = await page.evaluate(() => document.title);
  expect(title).toBe('footnote - md.html');
});
