import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../../core/services/api';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {
  vehiculeForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  maxYear: number;

  constructor(
    private fb: FormBuilder,
    private api: Api,
    private router: Router
  ) {
    this.maxYear = new Date().getFullYear() + 1;
    
    this.vehiculeForm = this.fb.group({
      immatriculation: ['', [Validators.required]],
      marque: ['', [Validators.required]],
      modele: ['', [Validators.required]],
      annee: [''],
      couleur: [''],
      km: ['']
    });
  }

  onSubmit(): void {
    if (this.vehiculeForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formData = { ...this.vehiculeForm.value };
      
      // Convertir les nombres
      if (formData.annee) formData.annee = Number(formData.annee);
      if (formData.km) formData.km = Number(formData.km);

      this.api.post('/vehicules', formData).subscribe({
        next: () => {
          this.router.navigate(['/vehicules']);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error?.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Erreur lors de la création du véhicule';
          }
        }
      });
    } else {
      this.markFormGroupTouched(this.vehiculeForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get immatriculation() { return this.vehiculeForm.get('immatriculation'); }
  get marque() { return this.vehiculeForm.get('marque'); }
  get modele() { return this.vehiculeForm.get('modele'); }
  get annee() { return this.vehiculeForm.get('annee'); }
  get couleur() { return this.vehiculeForm.get('couleur'); }
  get km() { return this.vehiculeForm.get('km'); }
}
