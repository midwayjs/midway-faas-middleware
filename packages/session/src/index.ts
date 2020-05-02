import { Provide, ScopeEnum, Scope, Config, App } from '@midwayjs/decorator';
import * as session from 'koa-session';
import { session as SessionConfig } from './config/config.default';
// import { IMidwayCoreApplication } from '@midwayjs/core';

@Provide('session')
@Scope(ScopeEnum.Singleton)
export class Sessioniddlware {
  @App()
  app: any;

  @Config('session')
  sessionConfig: typeof SessionConfig;

  resolve() {
    if (!this.sessionConfig['httpOnly']) {
      this.app
        .getLogger()
        .warn(
          '[fmw-session]: please set `config.session.httpOnly` to true. It is very dangerous if session can read by client JavaScript.'
        );
    }
    return session(this.sessionConfig);
  }
}
