import {Aurelia} from 'aurelia-framework';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import {I18N, TCustomAttribute} from 'aurelia-i18n';
import {GlobalValidationConfiguration, validateTrigger} from "aurelia-validation";
import Backend from 'i18next-xhr-backend';

  

  

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-table'))
    .plugin(PLATFORM.moduleName("aurelia-validation"), (config: GlobalValidationConfiguration) => {
      config.defaultValidationTrigger(validateTrigger.change);
    })
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      let aliases = ['t', 'i18n'];
      // add aliases for 't' attribute
      TCustomAttribute.configureAliases(aliases);

      // register backend plugin
      instance.i18next.use(Backend);

      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      return instance.setup({
        fallbackLng: 'de', // <------------ 6
      whitelist: ['en', 'de'],
      preload: ['en', 'de'], // <------------ 7
      ns: 'global', // <------------ 8
      defaultNS: 'global',
      fallbackNS: false,
      attributes: aliases, // <------------ 9
      lng: 'en', // <------------ 10
      debug: true, // <------------ 11
      backend: {                                  
        loadPath: './locales/{{lng}}/{{ns}}.json',  // <------------ 12
      }
      });
    });
 
  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
