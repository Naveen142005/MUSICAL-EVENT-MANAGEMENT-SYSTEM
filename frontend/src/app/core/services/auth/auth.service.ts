import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseAPIUrl = environment.apiBase;
    isLoggedIn = signal(false)


    private tokenKey = 'token';
    private userKey = 'user';

    constructor(private http: HttpClient) {}

    register(userData: any): any {
        const url = this.baseAPIUrl + '/users/register';

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/json',
        });

        alert(userData.role)

        const payload = {
            name: userData.name,
            email: userData.email,
            phone: parseInt(userData.phone, 10),
            password: userData.password,
            role_id: userData.role === 'organizers' ? 2 : 3,
        };

        return firstValueFrom(this.http.post<any>(url, payload, { headers }));
    }

    login(email: string, password: string): Observable<any> {
        // Create form data for OAuth2
        const formData = new URLSearchParams();
        formData.set('username', email); // OAuth2 uses 'username' field
        formData.set('password', password);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        return this.http.post(`${this.baseAPIUrl}/users/login`, formData.toString(), { headers }).pipe(
            tap((response: any) => {
                // Store token and user data
                if (response.access_token) {
                    sessionStorage.setItem('token', response.access_token);
                }
                if (response.user) {
                    sessionStorage.setItem('user', JSON.stringify(response.user));
                }
            })
        );
    }

    logout(): void {
        sessionStorage.removeItem(this.tokenKey);
        sessionStorage.removeItem(this.userKey);
        this.isLoggedIn.set(false);
        // this.router.navigate(['/']);
    }

    // Get token
    getToken(): string | null {
        return sessionStorage.getItem(this.tokenKey);
    }

    // Check if logged in
    hasToken(): boolean {
        return !!this.getToken();
    }

    // Get current user
    getUser(): any {
        const user = sessionStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    // Get user role
    getUserRole(): string {
        const user = this.getUser();
        return user?.role || '';
    }

    // Check if user has specific role
    hasRole(role: string): boolean {
        return this.getUserRole() === role;
    }

    // Check if user is organizer
    isOrganizer(): boolean {
        return this.hasRole('organizers');
    }

    // Check if user is audience
    isAudience(): boolean {
        return this.hasRole('audience');
    }
}
