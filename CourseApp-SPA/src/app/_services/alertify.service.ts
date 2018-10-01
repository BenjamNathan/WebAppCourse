import { Injectable } from '@angular/core';
declare let alertify: any;
// The declare is so that it can be used in this service without tslint giving errors

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() {}

  // Method listen for event of user clicking OK. else command is empty because nothing needs to be done if the user clicks cancel
  // okCallBack is a function we provide so when OK is clicked we send a message back
  confirm(message: string, okCallBack: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallBack();
      } else {}
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
