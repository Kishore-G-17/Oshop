import { ErrorHandler } from "@angular/core";

export class MyGlobalError implements ErrorHandler{

    handleError(error: any): void {
        alert("An UnExpected Error Occured!");
    }
    
}