import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources-page',
  templateUrl: './resources-page.component.html',
  styleUrls: ['./resources-page.component.css'],
})
export class ResourcesPageComponent implements OnInit {
  RESOURCE_TABS = [
    {
      id: 'whatIsDiabetes',
      name: 'What is Diabetes?',
    },
    {
      id: 'riskFactors',
      name: 'Risk Factors',
    },
    {
      id: 'symptoms',
      name: 'Symptoms',
    },
    {
      id: 'prediabetes',
      name: 'Prediabetes',
    },
    {
      id: 'typeOneDiabetes',
      name: 'Type 1 Diabetes',
    },
    {
      id: 'typeTwoDiabetes',
      name: 'Type 2 Diabetes',
    },
    {
      id: 'gestationalDiabetes',
      name: 'Gestational Diabetes',
    },
    {
      id: 'testingForDiabetes',
      name: 'Testing for Diabetes',
    },
    {
      id: 'fastFacts',
      name: 'Fast Facts',
    },
  ];

  activeTab: { id: string; name: string };

  constructor() {
    this.activeTab = this.RESOURCE_TABS[0];
  }

  ngOnInit(): void {}

  isTabActive(tabId: string) {
    return this.activeTab.id === tabId;
  }

  setActiveTab(tabId: string) {
    const tab = this.RESOURCE_TABS.find((tab) => tab.id === tabId);

    if (!tab) {
      return;
    }

    this.activeTab = tab;
  }
}
