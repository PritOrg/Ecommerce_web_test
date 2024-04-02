import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    try {
      this.signupForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [''],
        password: ['', Validators.required],
        confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]],
        dateOfBirth: [''],
        address: this.fb.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          country: ['', Validators.required],
          postalCode: ['', Validators.required]
        }),
        newsletter: [false]
      });
    } catch (error) {
      console.error('Error initializing form:', error);
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    // If either control is null, return null
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    // If passwords match, return null
    if (passwordControl.value === confirmPasswordControl.value) {
      return null;
    }

    // If passwords don't match, return an error object
    return { 'passwordsNotMatch': true };
  }
  onSubmit() {
    console.log(this.signupForm.value)
    if (this.signupForm.invalid) {
      // Display SweetAlert2 popup for invalid form
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields correctly!',
      });
      return; // Stop form submission
    }

    // Check for empty fields
    const formValue = this.signupForm.value;
    for (const key in formValue) {
      if (!formValue[key]) {
        // Display SweetAlert2 modal for empty fields
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out all fields!',
        });
        return;
      }
    }

    this.http.post('http://localhost:1969/api/users/signup', this.signupForm.value)
      .subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: formValue.email + " Signup Success",
            position: 'top',
            showConfirmButton: false,
            timer: 2000 // Auto close after 2 seconds
          });
          this.router.navigate(['/signin']);
          // Optionally, redirect the user to another page
        },
        error: (error) => {
          console.error('Error during signup', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'SignUP Failed',
          });
          return;
          // Handle error (e.g., display error message to the user)
        }
      });

  }
}
