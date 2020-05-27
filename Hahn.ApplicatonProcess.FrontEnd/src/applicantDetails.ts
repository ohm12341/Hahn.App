import { ApplicantService } from './services/ApplicantServices';
  import {inject} from 'aurelia-framework';

@inject(ApplicantService)
export class ApplicantDetails{
applicantdetails;
selectedId;
constructor(private applicantservice:ApplicantService){
}
created() {
  this.applicantservice.GetAll().then(contacts => this.applicantdetails = contacts);
}

select(contact) {
  this.selectedId = contact.id;
  return true;
}
}