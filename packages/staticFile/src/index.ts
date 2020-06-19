import { Provide, ScopeEnum, Scope, Config } from '@midwayjs/decorator';
import * as staticCache from 'koa-static-cache';

@Provide('staticFile')
@Scope(ScopeEnum.Singleton)
export class StaticFile {
  @Config('staticFile')
  staticConfig;

  resolve() {
    if (this.staticConfig?.index) {
      if (!this.staticConfig.alias) {
        this.staticConfig.alias = {};
      }
      const { alias, index, prefix = '/' } = this.staticConfig;
      alias[prefix] = `${prefix.replace(/\/$/g, '')}/${index.replace(/^\//g, '')}`;
    }
    return staticCache(this.staticConfig);
  }
}
