import {DialogController} from 'aurelia-dialog';
import {ApiError} from '../ApiError'
  export class ApiErrorDialog {
    static inject = [DialogController];
   resposnse:ApiError;
    constructor(private controller:DialogController){
      this.controller = controller;
    }
    activate(resposnse){
      this.resposnse = resposnse;
    }
  }
  
