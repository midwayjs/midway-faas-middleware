import { Provide, ScopeEnum, Scope, Config } from '@midwayjs/decorator';
import { parseMultipart } from './upload';
@Provide('upload')
@Scope(ScopeEnum.Singleton)
export class StaticFile {
  @Config('upload')
  upload;

  resolve() {
    return async (ctx, next) => {
      const data = await parseMultipart(ctx.request);
      if (data) {
        ctx.files = data.files;
        ctx.fields = data.fields;
      }
      return next();
    }
  }
}