import { Component, OnInit } from '@angular/core';
import { Api } from '../../../core/services/api';
import { Auth } from '../../../core/services/auth';

interface DashboardStats {
  totalVehicules: number;
  totalReclamations: number;
  totalRendezVous: number;
  totalFactures: number;
  reclamationsEnAttente: number;
  rendezVousAujourdhui: number;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  stats: DashboardStats = {
    totalVehicules: 0,
    totalReclamations: 0,
    totalRendezVous: 0,
    totalFactures: 0,
    reclamationsEnAttente: 0,
    rendezVousAujourdhui: 0
  };
  
  isLoading = true;
  currentUser: any = null;
  recentReclamations: any[] = [];
  upcomingRendezVous: any[] = [];

  constructor(
    private api: Api,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.currentUser = this.auth.getCurrentUser();
  }

  loadDashboardData(): void {
    this.isLoading = true;

    Promise.all([
      this.api.get<any[]>('/vehicules/user_vehicules').toPromise(),
      this.api.get<any[]>('/reclamations').toPromise().catch(() => []),
      this.api.get<any[]>('/rendezvous').toPromise().catch(() => []),
      this.api.get<any[]>('/factures').toPromise().catch(() => [])
    ]).then(([vehicules, reclamations, rendezvous, factures]) => {
      this.stats.totalVehicules = vehicules?.length || 0;
      this.stats.totalReclamations = reclamations?.length || 0;
      this.stats.totalRendezVous = rendezvous?.length || 0;
      this.stats.totalFactures = factures?.length || 0;

      this.stats.reclamationsEnAttente = reclamations?.filter((r: any) => 
        r.etat === 'EN_ATTENTE' || r.etat === 'EN_COURS'
      ).length || 0;

      const today = new Date().toISOString().split('T')[0];
      this.stats.rendezVousAujourdhui = rendezvous?.filter((r: any) => {
        const rdvDate = new Date(r.date).toISOString().split('T')[0];
        return rdvDate === today;
      }).length || 0;

      this.recentReclamations = reclamations?.slice(0, 5) || [];

      this.upcomingRendezVous = rendezvous
        ?.filter((r: any) => new Date(r.date) >= new Date())
        .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5) || [];

      this.isLoading = false;
    }).catch((error) => {
      console.error('Erreur lors du chargement des données:', error);
      this.isLoading = false;
    });
  }

  getEtatBadgeClass(etat: string): string {
    const etatMap: { [key: string]: string } = {
      'EN_ATTENTE': 'badge-warning',
      'EN_COURS': 'badge-info',
      'RESOLU': 'badge-success',
      'ANNULE': 'badge-danger'
    };
    return etatMap[etat] || 'badge-secondary';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
