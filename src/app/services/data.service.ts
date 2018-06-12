import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

// rxjs
import {Observable} from 'rxjs';

// models
import {Material} from '../models/material';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly URL = 'http://localhost:3000/api/materials';

  constructor(private httpClient: HttpClient) {
  }

  public getMaterialsList(page, limit): Observable<Array<Material>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit);
    return this.httpClient.get<Array<Material>>(this.URL, {params});
  }

  public getMaterialFromId(id: string): Observable<Material> {
    return this.httpClient.get<Material>(`${this.URL}/${id}`);
  }
}
