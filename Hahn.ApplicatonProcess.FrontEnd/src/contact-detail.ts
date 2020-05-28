
  
  export class ContactDetail {
    routeConfig;
    applicantData;
   isVisible:boolean;
    constructor() { 

        this.isVisible=false;
    }
  
    activate(params, routeConfig) {
     
        try {
           this.applicantData=JSON.parse(params.applicant);
           this.isVisible=true;
        } catch (error) {
            this.isVisible=false;  
        }
      

    }
  
   
  }
  

  