import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {
  bookingForm: FormGroup;
  minDate: string;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private appointmentService: AppointmentService
  ) {
    // Set min date to current date
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    // Initialize form with no default selection for withSamagri
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      poojaDate: ['', [Validators.required]],
      poojaType: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      samagriOption: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.isSubmitting = true;

      // Simulate API call with setTimeout
      setTimeout(() => {
        this.appointmentService.bookPooja(this.bookingForm.value).subscribe((response: any) => {
          // Show success message
          this.toastr.success('Your Pooja has been booked successfully!');
          // Reset form
          this.bookingForm.reset();
          // Ensure withSamagri is null again after reset
          this.bookingForm.patchValue({
            withSamagri: null
          });
          this.isSubmitting = false;
        }, (error) => {
          this.toastr.error(error.error.message);
          this.isSubmitting = false;
        });

      }, 1500);
    } else {
      this.markFormGroupTouched(this.bookingForm);
    }
  }

  // Helper method to mark all form controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
