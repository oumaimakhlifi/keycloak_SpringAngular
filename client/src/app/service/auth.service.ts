import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  /**
   * Récupère les détails de l'utilisateur connecté depuis le token Keycloak.
   */
  public getLoggedUser() {
    try {
      const userDetails = this.keycloak.getKeycloakInstance().idTokenParsed;
      return userDetails;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails utilisateur:', error);
      return undefined;
    }
  }

  /**
   * Vérifie si l'utilisateur est connecté.
   */
  public async isLoggedIn(): Promise<boolean> {
    try {
      const loggedIn = await this.keycloak.isLoggedIn();
      return loggedIn;
    } catch (error) {
      console.error('Erreur lors de la vérification de la connexion:', error);
      return false;
    }
  }

  /**
   * Charge le profil de l'utilisateur connecté.
   */
  public loadUserProfile() {
    return this.keycloak.loadUserProfile();
  }

  /**
   * Effectue la connexion de l'utilisateur.
   */
  public login(): void {
    this.keycloak.login().catch((error) => {
      console.error('Erreur lors de la tentative de connexion:', error);
    });
  }

  /**
   * Déconnecte l'utilisateur.
   */
  public logout(): void {
    this.keycloak.logout().catch((error) => {
      console.error('Erreur lors de la tentative de déconnexion:', error);
    });
  }

  /**
   * Récupère le token d'accès de l'utilisateur connecté.
   */
  public async getToken(): Promise<string | undefined> {
    try {
      const token = await this.keycloak.getToken();
      if (!token) {
        console.warn('Aucun token disponible.');
      }
      return token;
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      return undefined;
    }
  }

  /**
   * Ajoute le token d'accès à un objet HttpHeaders.
   */
  public async addTokenToHeader(headers: HttpHeaders): Promise<HttpHeaders> {
    try {
      const token = await this.getToken();
      if (!token) {
        throw new Error('Token absent, impossible de définir l\'en-tête Authorization.');
      }
      headers = headers.set('Authorization', `Bearer ${token}`);
      return headers;
    } catch (error) {
      console.error('Erreur lors de l’ajout du token aux en-têtes:', error);
      throw error;  // Relance l'erreur pour la gestion en aval
    }
  }
}

