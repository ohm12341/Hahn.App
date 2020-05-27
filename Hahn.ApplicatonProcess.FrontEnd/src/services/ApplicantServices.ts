import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';


@inject(HttpClient)
export class ApplicantService {
    
    
    constructor(private httpClient: HttpClient) {
       this.httpClient=httpClient
      
       this.httpClient .configure(x => {
        x.withBaseUrl('https://localhost:44301/api/Applicant');
        
      });
    }

    GetAll() {
       return this.httpClient.get('')
            .then(response =>response.content)
            .catch(error => console.log(error));
    }
    Add(applicant) {
      return this.httpClient.get('')
           .then(response =>response.content)
           .catch(error => console.log(error));
   }
}