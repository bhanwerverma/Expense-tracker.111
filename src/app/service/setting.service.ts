import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Setting {
  id: number;
  currency: string;
  notification: boolean;
  theme: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private apiUrl = 'http://localhost:3000/settings'; // Change if needed

  constructor(private http: HttpClient) {}

  getSettings(): Observable<Setting[]> {
    return this.http.get<Setting[]>(this.apiUrl);
  }

  updateSetting(setting: Setting): Observable<Setting> {
    return this.http.put<Setting>(`${this.apiUrl}/${setting.id}`, setting);
  }
}
