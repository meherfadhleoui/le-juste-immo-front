import { Component, Input, OnInit } from '@angular/core';

interface Bilan {
  letter: string;
  color: string;
  range: number[];
}

@Component({
  selector: 'bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.scss'],
})
export class BilanComponent implements OnInit {
  @Input() value = 0;
  @Input() isDEP = true;
  dpe: Bilan[] = [];
  dpg: Bilan[] = [];

  ngOnInit(): void {
    this.initBilans();
  }

  initBilans() {
    this.dpe = [
      {
        letter: 'A',
        color: '#00A06C',
        range: [0, 70],
      },
      {
        letter: 'B',
        color: '#50B054',
        range: [71, 110],
      },
      {
        letter: 'C',
        color: '#A4CC72',
        range: [111, 180],
      },
      {
        letter: 'D',
        color: '#F2E61A',
        range: [181, 250],
      },
      {
        letter: 'E',
        color: '#F1B41A',
        range: [251, 330],
      },
      {
        letter: 'F',
        color: '#ED8434',
        range: [331, 420],
      },
      {
        letter: 'G',
        color: '#D71C1F',
        range: [421],
      },
    ];
    this.dpg = [
      {
        letter: 'A',
        color: '#A3DBF8',
        range: [0, 6],
      },
      {
        letter: 'B',
        color: '#8BB5D3',
        range: [7, 11],
      },
      {
        letter: 'C',
        color: '#7693B3',
        range: [12, 30],
      },
      {
        letter: 'D',
        color: '#5F6D8C',
        range: [31, 50],
      },
      {
        letter: 'E',
        color: '#4D506F',
        range: [51, 70],
      },
      {
        letter: 'F',
        color: '#383651',
        range: [71, 100],
      },
      {
        letter: 'G',
        color: '#271B34',
        range: [101],
      },
    ];
  }
}
