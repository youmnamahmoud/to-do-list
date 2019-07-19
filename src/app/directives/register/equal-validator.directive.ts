import { Directive, forwardRef, Attribute } from '@angular/core';
import {
  NG_VALIDATORS, Validator, AbstractControl
} from '@angular/forms';

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective), multi: true }
  ]
})
export class EqualValidatorDirective implements Validator {
  constructor( @Attribute('validateEqual') public validateEqual: string,
    @Attribute('reverse') public reverse: string) {
  }

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true : false;
  }

  validate(c: AbstractControl): { [key: string]: any } {
    let v = c.value;
    let e = c.root.get(this.validateEqual);
    if (e && v !== e.value && !this.isReverse) {
      return {
        validateEqual: false
      }
    }

    return null;
  }
}