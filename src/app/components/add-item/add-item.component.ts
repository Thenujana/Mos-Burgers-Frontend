
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../service/item.service';
import { Router } from '@angular/router';
import { Item } from '../../models/item.model';
import { AdminNavComponent } from '../../header/admin-nav/admin-nav.component';
@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, AdminNavComponent],
  providers: [ItemService],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  itemForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  imagePreviewUrl: string | ArrayBuffer | null = null;
  selectedImageBase64: string = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      image_url: ['', Validators.required],
      exp_date: ['', [Validators.required, this.futureDateValidator]]
    });
  }

  futureDateValidator(control: any) {
    if (!control.value) return null;

    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate > today ? null : { pastDate: true };
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Please select a valid image file';
        return;
      }
      
      // Validate file size (max 2MB for base64 storage)
      if (file.size > 2 * 1024 * 1024) {
        this.errorMessage = 'Image size should be less than 2MB for database storage';
        return;
      }
      
      this.errorMessage = '';
      
      // Convert to base64
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageBase64 = reader.result as string;
        this.imagePreviewUrl = this.selectedImageBase64;
        
        // Update form with base64 data
        this.itemForm.patchValue({
          image_url: this.selectedImageBase64
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.itemForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    if (!this.selectedImageBase64) {
      this.errorMessage = 'Please select an image file';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const newItem: Item = {
      ...this.itemForm.value,
      price: parseFloat(this.itemForm.value.price),
      image_url: this.selectedImageBase64 // Store base64 in database
    };

    this.itemService.addItem(newItem).subscribe({
      next: (response: string) => {
        this.successMessage = response || 'Item added successfully!';
        this.errorMessage = '';
        this.resetForm();
        setTimeout(() => this.router.navigate(['/menu']), 1500);
      },
      error: (err) => {
        console.error('Error adding item:', err);
        this.errorMessage = 'Failed to add item. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  private resetForm(): void {
    this.itemForm.reset();
    this.imagePreviewUrl = null;
    this.selectedImageBase64 = '';
    this.isSubmitting = false;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.itemForm.controls).forEach(key => {
      this.itemForm.get(key)?.markAsTouched();
    });
  }

  // Remove selected image
  removeImage(): void {
    this.selectedImageBase64 = '';
    this.imagePreviewUrl = null;
    this.itemForm.patchValue({ image_url: '' });
    
    // Reset file input
    const fileInput = document.getElementById('image_url') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  get name() { return this.itemForm.get('name'); }
  get price() { return this.itemForm.get('price'); }
  get image_url() { return this.itemForm.get('image_url'); }
  get exp_date() { return this.itemForm.get('exp_date'); }
}