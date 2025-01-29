import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'] // Corrected: "styleUrl" -> "styleUrls"
})
export class AdminComponent implements OnInit {

  adminData: any; // Variable pour stocker les données administrateur

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.loadAdminData(); // Appel de la méthode pour charger les données
  }

  loadAdminData() {
    this.commonService.getAdminData().then((data) => { // Utilisation de la promesse renvoyée par `getAdminData`
      console.log('Données administrateur:', data);
      this.adminData = data; // Stockage des données récupérées
    }).catch((error) => {
      console.error('Erreur lors de la récupération des données administrateur:', error);
    });
  }
}

