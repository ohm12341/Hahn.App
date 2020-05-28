import {Router, RouterConfiguration} from 'aurelia-router';
  import {PLATFORM} from 'aurelia-pal';
  import { ApplicantService } from './services/ApplicantServices';
  import {inject} from 'aurelia-framework';
 

  @inject(ApplicantService)
  export class App {
    
    router: Router;
  
constructor(private applicantService: ApplicantService){
 
    
  
}

    configureRouter(config: RouterConfiguration, router: Router){
      config.title = 'Applicants';
      config.options.pushState = true;
      config.options.root = '/';
      config.map([
        { route: '/',  moduleId: PLATFORM.moduleName('no-selection'), name:'select' },
        { route: '/:applicant',  moduleId: PLATFORM.moduleName('contact-detail'), name:'applicant' }
        
      ]);
  
      this.router = router;

      
    }
  }
  

  

