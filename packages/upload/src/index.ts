import { Provide, ScopeEnum, Scope, Config } from '@midwayjs/decorator';
import { tmpdir } from 'os';
import { resolve, extname } from 'path';
import { writeFileSync } from 'fs';
import { parseMultipart } from './upload';
import { Readable } from 'stream';
@Provide('upload')
@Scope(ScopeEnum.Singleton)
export class StaticFile {
  @Config('upload')
  upload;

  resolve() {
    return async (ctx, next) => {
      const { mod } = this.upload || { mod: 'buffer' };
      const requireId = `upload_${Date.now()}.${Math.random()}`;
      if (ctx.request && ctx.request.req) {
        ctx.request.req.bodyParsed = true;
      }
      const data = await parseMultipart(ctx.request);
      if (data) {
        ctx.files = mod === 'buffer' ? data.files : data.files.map((file, index) => {
          const { data, filename } = file;
          if (mod === 'file') {
            const ext = extname(filename);
            const tmpFileName = resolve(tmpdir(), `${requireId}.${index}${ext}`);
            writeFileSync(tmpFileName, data, 'binary');
            file.data = tmpFileName;
          } else if (mod === 'stream') {
            file.data = new Readable({
              read() {
                this.push(data);
                this.push(null);
              }
            });
          }
          return file;
        });
        ctx.fields = data.fields;
      }
      return next();
    }
  }
}