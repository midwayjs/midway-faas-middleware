import * as koa from 'koa';
import { useKoaDevPack } from '@midwayjs/faas-dev-pack';
import { join } from 'path';
import * as request from 'supertest';
import * as assert from 'assert';

describe('/test/index.test.ts', () => {
  it('load static file in faas', (done) => {
    const app = new koa();
    app.use(
      useKoaDevPack({
        functionDir: join(__dirname, './fixtures/base-fn'),
      })
    );
    request(app.callback())
      .get('/test')
      .expect(200)
      .end((err, res) => {
        assert(/bbbb=123/.test(res.headers['set-cookie'][0]));
        assert.deepStrictEqual(res.body, { test: 1 });
        done();
      })
  });
});
