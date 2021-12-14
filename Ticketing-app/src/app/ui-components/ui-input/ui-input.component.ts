import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss']
})
export class UiInputComponent implements OnInit {
  //@Input() inputType: string|null;
  @Input() placeholder: string|null = "write here...";
  @Input() inputName: string|null;
  @Input() inputInfo: string|null;
  @Input() isSubmitted: boolean = false;
  @Input() isInputDisabled: boolean = false;
  @Input("fc") set s(value: FormControl){
    this.fc = value;
  }
  fc: FormControl = new FormControl();
  @Input() errorDictionary: { [key: string]: string } = {};
  @Input() serverErrorDictionary: { [key: string]: string } = {};
  constructor() { }

  ngOnInit(): void {
  }
  get isFormControlInvalid() {
    return this.fc.dirty && !this.fc.valid && this.fc.touched;
  }
  get isFormSubmittedWithNoErrors() {
    // if(this.inputType === "email") {
    //   return this.fc.errors == null;
    // } else {
    //   return !this.isSubmitted && this.fc.errors == null;
    // }
    return !this.isSubmitted && this.fc.errors == null;
  }
  get returnErrorMsg() {
    return this.errorDictionary[
      Object.keys(this.fc.errors as ValidationErrors)[0]
    ]; 
  }
    
  get serverErrorDictionaryKeys(){
    return Object.keys(this.serverErrorDictionary)
  }

}
