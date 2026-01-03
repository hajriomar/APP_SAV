import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../../../core/services/api';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.html',
  styleUrls: ['./edit.css'],
})
export class Edit implements OnInit {

  vehiculeForm!: FormGroup;
  isLoading = true;
  saving = false;
  errorMessage = '';
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private api: Api,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vehiculeForm = this.fb.group({
      immatriculation: ['', Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      annee: [''],
      couleur: [''],
      km: ['']
    });

    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadVehicule();
  }

  loadVehicule() {
    this.api.get(`/vehicules/${this.id}`).subscribe({
      next: (vehicule: any) => {
        this.vehiculeForm.patchValue(vehicule);
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement du véhicule';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.vehiculeForm.invalid) return;

    this.saving = true;

    this.api.patch(`/vehicules/${this.id}`, this.vehiculeForm.value).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/vehicules']);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la mise à jour';
        this.saving = false;
      }
    });
  }
}
