import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'] // Corrected: "styleUrl" -> "styleUrls"
})
export class ManagerComponent implements OnInit {

  managerData: any; // Variable pour stocker les données manager

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.loadManagerData(); // Appel de la méthode pour charger les données
  }

  loadManagerData() {
    this.commonService.getManagerData().then((data) => { // Utilisation de la promesse renvoyée par `getManagerData`
      console.log('Données manager:', data);
      this.managerData = data; // Stockage des données récupérées
    }).catch((error) => {
      console.error('Erreur lors de la récupération des données manager:', error);
    });
  }
}

