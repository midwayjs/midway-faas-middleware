import { Configuration } from '@midwayjs/decorator';

@Configuration({
  importConfigs: ['./config'],
  namespace: 'fmw',
})
export class ContainerConfiguration {}
