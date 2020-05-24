import { FunctionHandler, FaaSContext } from '@midwayjs/faas';

import { Provide, Inject, Func } from '@midwayjs/decorator';

@Provide()
export class IndexHandler implements FunctionHandler {
  @Inject()
  ctx: FaaSContext;

  @Func('index.handler', { middleware: ['fmw:staticFile'] })
  async handler() {
    return 'hello world';
  }
}
