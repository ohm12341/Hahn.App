import {WebAPI} from './web-api';
import {Applicant} from './Applicant'
import {inject,bindable} from 'aurelia-framework';
import { ApplicantService } from './services/ApplicantServices';
import {Validator, ValidationRules,validationMessages,
    ValidationControllerFactory} from 
    'aurelia-validation';
import {BootstrapFormRenderer} from './bootstrap-form-renderer'
import {BindingEngine} from 'aurelia-binding';
import {DialogService} from 'aurelia-dialog';
import {Confirm} from './prompt';

  
  @inject(WebAPI,ApplicantService,Validator,ValidationControllerFactory,BindingEngine,DialogService)
  export class ContactList {
  contacts;
  selectedId = 0;
  canSave:boolean;
  public applicants: Applicant = new Applicant()
  isResetButtonEnAbled:boolean;

  
   controller = null;
    constructor(private api: WebAPI,
      private applicantservice: ApplicantService,
      private validator:Validator,
      private controllerFactory: ValidationControllerFactory,
      private bindingEngine:BindingEngine,private dialogService:DialogService
      ) { 
       
    this.canSave = true;
    this.isResetButtonEnAbled=true;
    this.controller = controllerFactory.createForCurrentScope(validator);
    this.controller.subscribe(event => this.validateWhole());
    this.controller.addRenderer(new BootstrapFormRenderer())
    
    bindingEngine.propertyObserver(this.applicants, 'name')
      .subscribe((newValue, oldValue) => this.EnableOrDisableResetBUtton(newValue));
    
    bindingEngine.propertyObserver(this.applicants, 'family')
      .subscribe((newValue, oldValue) =>this.EnableOrDisableResetBUtton(newValue));

   bindingEngine.propertyObserver(this.applicants, 'age')
      .subscribe((newValue, oldValue) => this.EnableOrDisableResetBUtton(newValue));

   bindingEngine.propertyObserver(this.applicants, 'countryOfOrgin')
      .subscribe((newValue, oldValue) => this.EnableOrDisableResetBUtton(newValue));

   bindingEngine.propertyObserver(this.applicants, 'email')
      .subscribe((newValue, oldValue) =>this.EnableOrDisableResetBUtton(newValue));

     bindingEngine.propertyObserver(this.applicants, 'address')
      .subscribe((newValue, oldValue) => this.EnableOrDisableResetBUtton(newValue));

    ValidationRules
    .ensure((x:Applicant)=>x.name).required().minLength(5)
    .ensure((x:Applicant)=>x.family).required().minLength(5)
    .ensure((x:Applicant)=>x.address).required().minLength(10)
    .ensure((x:Applicant)=>x.email).required().email()
    .ensure((x:Applicant)=>x.age).required().min(20).max(60)
    .on(Applicant)
    
    }
  
private validateWhole() {
      this.validator.validateObject(this.applicants)
          .then(results => this.canSave = !results.every(result => result.valid));
}
EnableOrDisableResetBUtton(value:string){
  if(value.length>0){
    this.isResetButtonEnAbled=false;
    
  }
  
}

OnReset(){
  this.dialogService.open( {viewModel: Confirm, model: 'Are you sure?' }).whenClosed().then(response => {
   
 
    if (!response.wasCancelled) {
     
     this.applicants.clearAllPrperty()
     this.controller.reset();
     this.isResetButtonEnAbled=true;
    } else {
       console.log('cancelled');
    }
   
 });
 
}

addApplicant(){
      this.controller.validate()
      .then(result => {
        if (result.valid)
        alert(JSON.stringify(this.applicants));
        else
          {

          }

          
      })
      
      
     

}

created() {
      this.api.getContactList().then(contacts => this.contacts = contacts);
      
}
  
  }
  
