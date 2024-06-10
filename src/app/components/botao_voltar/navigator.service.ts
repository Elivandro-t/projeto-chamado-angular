/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Injectable({
    providedIn:"root"
})
export class NavigatoService{
        private history: string[] = [];
      
        
  constructor(private router: Router) {
    // Monitora a navegação para adicionar rotas ao histórico
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url !== '/' && !this.history.includes(event.url)) {
          this.addToHistory(event.url);
        }
      });
  }
        public addToHistory(url: string): void {
          this.history.push(url);
        }
      
        public goBack(): void {
          if (this.history.length > 0) {
            this.history.pop(); 
            const previousUrl = this.history[this.history.length - 1];
            this.router.navigateByUrl(previousUrl);
          } else {
            this.router.navigate(['/']);
          }
        }
}