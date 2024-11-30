import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://127.0.0.1:5000/chat'; // Corrected backend URL

  constructor(private http: HttpClient) {}

  // Method to retrieve token (assuming it's stored in localStorage)
  private getToken(): string | null {
    return localStorage.getItem('token');  // Adjust this based on where your token is stored
  }

  // Send message with Bearer token in headers
  sendMessage(message: string): Observable<any> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Add Bearer token here
    });

    return this.http.post(this.apiUrl, { message }, { headers });
  }
}
