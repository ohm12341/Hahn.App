//import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {ApiErrorDialog} from './ApiErrorDialog';
import {ApiError} from '../ApiError'
import { isUndefined } from 'util';
@inject(HttpClient,DialogService)
export class ApplicantService {
    
    
    constructor(private httpClient: HttpClient,private dialogService: DialogService) {
       this.httpClient=httpClient
      
      //  this.httpClient .configure(x => {
      //   x.withBaseUrl('https://localhost:44301/api/Applicant');
        
      // });
      httpClient.configure(config => {
        config
          .useStandardConfiguration()
          .withBaseUrl('https://localhost:44301/api/Applicant')
          .withDefaults({
            credentials: 'same-origin',
            headers: {
              'X-Requested-With': 'Fetch'
            }
          })
        });
    }

    GetAll() {
      //  return this.httpClient.get('')
      //       .then(response =>response.content)
      //       .catch(error => console.log(error));
    }
    Add(applicant) {
      // return this.httpClient.post('',applicant)
      //      .then(response =>response.content)
      //      .catch(error => {

      //       alert(error)
      //       this.dialogService.open({ viewModel: ApiErrorDialog, model: error, lock: false }).whenClosed(response => {
      //         if (!response.wasCancelled) {
      //           console.log('good - ', response.output);
      //         } else {
      //           console.log('bad');
      //         }
      //         console.log(response.output);
      //       });

      //      });

      return this.httpClient
      .fetch('', {
        method: 'post',
        body: json(applicant)
      })
      .then(response => response.json())
      .then(savedComment => {
        alert(`Saved comment! ID: ${savedComment.id}`);
      })
      .catch(error => {
        error.json().then(error=>{
          let  erroresposnse=new ApiError()
          erroresposnse.errors=error['errors']
          
          erroresposnse.status=error['status']
          erroresposnse.title=error['title']

          if(!isUndefined(error["errors"]['Name'])){
            erroresposnse.PropertyError.push(error["errors"]['Name'])
          }
          if(!isUndefined(error["errors"]['Family'])){
            erroresposnse.PropertyError.push(error["errors"]['Family'])
          }
          if(!isUndefined(error["errors"]['address'])){
            erroresposnse.PropertyError.push(error["errors"]['Address'])
          }
          if(!isUndefined(error["errors"]['Age'])){
            erroresposnse.PropertyError.push(error["errors"]['Age'])
          }
          if(!isUndefined(error["errors"]['Email'])){
            erroresposnse.PropertyError.push(error["errors"]['Email'])
          }
          if(!isUndefined(error["errors"]['CountryOfOrgin'])){
            erroresposnse.PropertyError.push(error["errors"]['CountryOfOrgin'])
          }
          erroresposnse.JsonError= JSON.stringify(error, null, 4)
         
          this.dialogService.open({ viewModel: ApiErrorDialog, model: erroresposnse, lock: false }).whenClosed(response => {
                    if (!response.wasCancelled) {
                      console.log('good - ', response.output);
                    } else {
                      console.log('bad');
                    }
                    console.log(response.output);
                  });
          
                });
      })
    
  
   }
}