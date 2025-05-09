import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordsMatchValidator = (
  passwordControlName: string,
  confirmPasswordControlName: string
): ValidatorFn => {
  return (form: AbstractControl): ValidationErrors | null => {
    const passwordControl = form.get(passwordControlName);
    const confirmPasswordControl = form.get(confirmPasswordControlName);

    if (!passwordControl || !confirmPasswordControl) return null;

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      confirmPasswordControl.setErrors({ ...confirmPasswordControl.errors, notMatch: true });
    } else {
      const errors = { ...confirmPasswordControl.errors };
      delete errors.notMatch;

      // Set to null if no other errors remain
      confirmPasswordControl.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  };
};
