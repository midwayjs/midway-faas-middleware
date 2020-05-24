import { Provide, ScopeEnum, Scope, Config } from '@midwayjs/decorator';
import * as staticCache from 'koa-static-cache';

@Provide('staticFile')
@Scope(ScopeEnum.Singleton)
export class StaticFile {
  @Config('staticFile')
  staticConfig;

  resolve() {
    if (this.staticConfig) {
      if (!this.staticConfig.alias) {
        this.staticConfig.alias = {};
      }
      const { prefix, alias } = this.staticConfig;
      if (prefix && !alias[prefix]) {
        alias[prefix] = `${prefix.replace(/\/$/g, '')}/index.html`;
      }
    }
    return staticCache(this.staticConfig);
  }
}
