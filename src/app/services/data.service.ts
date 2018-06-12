import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// rxjs
import {Observable} from 'rxjs';

// models
import {Material} from '../models/material';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly URL = 'http://localhost:3000/api/materials';

  constructor(private httpClient: HttpClient) {
  }

  public getMaterialsList(): Observable<Array<Material>> {
    return this.httpClient.get<Array<Material>>(this.URL);
  }
}
