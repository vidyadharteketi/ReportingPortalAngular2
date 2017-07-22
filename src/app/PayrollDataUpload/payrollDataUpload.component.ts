import { Component,EventEmitter,ViewChild,ElementRef } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { CONFIGURATION } from '../app.config';
@Component({
    moduleId: module.id,
    templateUrl: 'payrollDataUpload.html'

})
export class PayrollDataUploadComponent {


  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
   @ViewChild('statusDiv') statusDiv: ElementRef;
  
    //private _aleFileUploadUrl = CONFIGURATION.baseServiceUrl + 'file/upload/';
    private _aleFileUploadUrl = 'http://localhost:8080/SpringFileUpload/uploadFile';
  

   constructor() {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

   startUpload(): void {  // manually start uploading
    const event: UploadInput = {
      type: 'uploadAll',
      url: this._aleFileUploadUrl,
      method: 'POST',
      data: { dataUploadType: 'payrollData' },
      concurrency: 1 // set sequential uploading of files with concurrency 1
    }

    this.uploadInput.emit(event);
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(output); // lets output to see what's going on in the console

    if (output.type === 'done') {
       console.log('upload completed'); 
       this.statusDiv.nativeElement.innerHTML ='File has been successfully Uploaded.';
    } 
  }

  
 }
