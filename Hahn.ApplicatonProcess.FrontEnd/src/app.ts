import {Router, RouterConfiguration} from 'aurelia-router';
  import {PLATFORM} from 'aurelia-pal';
  import { ApplicantService } from './services/ApplicantServices';
  import {inject} from 'aurelia-framework';
  

  @inject(ApplicantService)
  export class App {
    
    router: Router;
  
constructor(private applicantService: ApplicantService){
  applicantService.GetAll()
            .then(result => {
                alert(result);
            });
}

    configureRouter(config: RouterConfiguration, router: Router){
      config.title = 'Contacts';
      config.options.pushState = true;
      config.options.root = '/';
      config.map([
        { route: '',              moduleId: PLATFORM.moduleName('no-selection'),   title: 'Select' },
        { route: 'contacts/:id',  moduleId: PLATFORM.moduleName('contact-detail'), name:'contacts' }
      ]);
  
      this.router = router;

      
    }
  }
  

  

