import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Api } from '../../../core/services/api';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  vehicules: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private api: Api,
    private router: Router,
    private route: ActivatedRoute   
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.api.get<any[]>('/vehicules/user_vehicules').subscribe({
      next: (data) => {
        this.vehicules = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des véhicules:', error);
        this.errorMessage = 'Erreur lors du chargement des véhicules';
        this.isLoading = false;
      }
    });
  }

  editVehicule(id: string): void {
    this.router.navigate(['edit', id], { relativeTo: this.route }); 
  }

  deleteVehicule(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      this.api.delete(`/vehicules/${id}`).subscribe({
        next: () => {
          this.loadVehicules();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }
}
