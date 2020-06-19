import {
  FunctionHandler,
} from '@midwayjs/faas';

import { Provide, Inject, Func } from '@midwayjs/decorator';

@Provide()
export class IndexHandler implements FunctionHandler {
  @Inject()
  ctx;

  @Func('index.handler' )
  async handler() {
    this.ctx.cookies.set('bbbb', 123);
    return {
      test: 1
    }
  }
}
