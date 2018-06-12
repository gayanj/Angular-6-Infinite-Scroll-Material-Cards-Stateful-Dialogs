import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Material} from '../models/material';
import {DataService} from '../services/data.service';
import {debounceTime} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-infinity-scroll',
  templateUrl: './infinity-scroll.component.html',
  styleUrls: ['./infinity-scroll.component.css']
})
export class InfinityScrollComponent implements OnInit {
  materialList: Material[] = [];
  throttle = 50;
  scrollDistance = 5;
  showLoadingSpinner = true;
  page = 1;
  private readonly limit = '16';

  constructor(private dataService: DataService,
              private route: ActivatedRoute) {
  }

  public getMaterialsListSubject() {
    this.showLoadingSpinner = true;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.dataService.getMaterialsList(this.page, this.limit);
      })
    ).subscribe(materials => {
      if (materials.length > 0) {
        for (let index = 0; index < materials.length; ++index) {
          this.materialList['push'](materials[index]);
        }
        this.page++;
      }
      this.showLoadingSpinner = false;
    });
  }

  onScrollDown() {
    // add another 16 items
    this.getMaterialsListSubject();
  }

  ngOnInit() {
    // Populate initial list
    this.getMaterialsListSubject();
  }
}
