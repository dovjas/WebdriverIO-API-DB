import { setWorldConstructor } from '@wdio/cucumber-framework';

class CustomWorld {
  appid: string;
  testid: string;
  constructor() {
    this.appid = '';
    this.testid = '';
  }
}
setWorldConstructor(CustomWorld);
