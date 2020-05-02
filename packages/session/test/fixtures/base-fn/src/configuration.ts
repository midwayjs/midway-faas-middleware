import { Configuration } from '@midwayjs/decorator';
import { join } from 'path';

@Configuration({
  importConfigs: [
    './config.default'
  ],
  imports: [
    join(__dirname, '../../../../src')
  ]
})
export class ContainerConfiguration {
}
