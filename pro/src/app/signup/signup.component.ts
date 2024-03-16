import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    try {
      this.signupForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [''],
        password: ['', Validators.required],
        dateOfBirth: [''],
        address: this.fb.group({
          street: ['a', Validators.required],
          city: ['c', Validators.required],
          state: ['e', Validators.required],
          country: ['r', Validators.required],
          postalCode: ['e', Validators.required]
        }),
        newsletter: [false]
      });
    } catch (error) {
      console.error('Error initializing form:', error);
    }
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

    this.http.post('http://localhost:3030/api/users', this.signupForm.value)
      .subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          // Optionally, redirect the user to another page
        },
        error: (error) => {
          console.error('Error during signup', error);
          // Handle error (e.g., display error message to the user)
        }
      });

  }
}
