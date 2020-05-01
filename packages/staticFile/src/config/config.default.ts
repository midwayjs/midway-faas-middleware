import { join } from 'path';

module.exports = (appInfo) => {
  const exports = {} as any;

  /**
   * Static file serve
   *
   * @member Config#static
   * @property {String} prefix - `/public/` by default
   * @property {String} dir - static files store dir, `${baseDir}/app/public` by default
   * @property {Number} maxAge - cache max age, default is 0
   * @see https://github.com/koajs/static-cache
   */
  exports.staticFile = {
    prefix: '/public/',
    dir: join(appInfo.baseDir, '../public'),
    dynamic: true,
    preload: false,
    buffer: true,
    maxFiles: 1000,
  };
  return exports;
};
