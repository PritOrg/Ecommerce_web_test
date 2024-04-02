import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signInFormData!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    try {
      this.signInFormData = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    } catch (error) {
      console.error('Error initializing form:', error);
    }
  }
  //sign in method
  signIn() {

    if (this.signInFormData.invalid) {
      // Display SweetAlert2 popup for invalid form
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields correctly!',
      });
      return; // Stop form submission
    }

    const formValue = this.signInFormData.value;
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

    const { email, password } = this.signInFormData.value;
    this.http.post<any>('http://localhost:1969/api/users/signin', { email, password }).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: email + " Login Success",
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000 // Auto close after 2 seconds
        });
        // You can store token in localStorage or session storage
        localStorage.setItem('token', response.token);
        this.router.navigate(['/'])
      },
      error: (error) => {
        // Handle error response
        console.error('Sign-in error:', error);
      }
    });
    // Add authentication logic here

  }
}
