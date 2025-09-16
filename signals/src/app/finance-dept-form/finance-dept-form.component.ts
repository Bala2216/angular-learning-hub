import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: "finance-dept-form",
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: "./finance-dept-form.component.html",
  styleUrls: ["./finance-dept-form.component.scss"],
})
export class FinanceDeptFormComponent {

  constructor(private router: Router) {}

  employee = {
    name: "",
    email: "",
    department: "Finance",
    position: "",
    skills: "",
  };

  success = false;

  onCancel(): void {
    this.router.navigate(['']);
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.success = true;
    } else {
      this.success = false;
    }
  }
}
