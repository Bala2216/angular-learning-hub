export interface FormControlConfig {
  name: string;
  label: string;
  class: string;
  placeholder: string;
  type: string;
  validators: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    email?: boolean;
  };
  options?: { label: string; value: string }[]; // for radio/select
}

export interface FormSchema {
  formName: string;
  saveBtnLabel: string;
  resetBtnLabel: string;
  formControls: FormControlConfig[];
}
