import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {DataService} from '../services/data.service';
import {Material} from '../models/material';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-material-modal',
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.css']
})
export class MaterialModalComponent implements OnInit, AfterViewInit {
  modal: HTMLElement;
  material$: Observable<Material>;
  material: Material;
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService) {
  }

  onOpenDialog() {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = (scrollBarWidth - 8) + 'px';
    this.modal.style.display = 'block';
    this.modal.scrollTop = 0;
  }

  onCloseDialog() {
    document.body.style.margin = '';
    document.body.style.overflow = '';
    this.modal.style.display = 'none';
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addTag(event: MatChipInputEvent, material: Material): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      material.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: any,  material: Material): void {
    let index = material.tags.indexOf(tag);

    if (index >= 0) {
      material.tags.splice(index, 1);
    }
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.dataService.getMaterialFromId(params.get('id'));
      })
    ).subscribe(material => {
        this.material = material;
        this.onOpenDialog();
      }
    );
  }

  ngAfterViewInit() {
    this.modal = document.getElementById('modal');
    for (let i = 0; i < this.modal.childNodes.length; i++) {
      this.modal.childNodes[i].addEventListener('click', function (event) {
        event.stopPropagation();
      });
    }
  }
}
