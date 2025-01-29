import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Récupère les données pour l'administrateur.
   */
  public getAdminData() {
    const url = `${environment.baseUrl}/api/v1/admin`;

    let headers = new HttpHeaders(); // Initialisation des en-têtes
    return this.authService
      .addTokenToHeader(headers)
      .then((updatedHeaders) => {
        return this.http.get(url, { headers: updatedHeaders }).toPromise(); // Requête HTTP avec les en-têtes mis à jour
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données administrateur:', error);
        throw error; // Relance l'erreur pour une gestion en aval
      });
  }

  /**
   * Récupère les données pour le manager.
   */
  public getManagerData() {
    const url = `${environment.baseUrl}/api/v1/manager`;

    let headers = new HttpHeaders(); // Initialisation des en-têtes
    return this.authService
      .addTokenToHeader(headers)
      .then((updatedHeaders) => {
        return this.http.get(url, { headers: updatedHeaders }).toPromise(); // Requête HTTP avec les en-têtes mis à jour
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données manager:', error);
        throw error; // Relance l'erreur pour une gestion en aval
      });
  }
}

