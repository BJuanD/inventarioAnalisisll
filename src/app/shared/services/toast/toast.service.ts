import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new BehaviorSubject<{ mensaje: string, tipo: 'exito' | 'error' | 'info' } | null>(null);
  toastState$ = this.toastSubject.asObservable();

  mostrarToast(mensaje: string, tipo: 'exito' | 'error' | 'info' = 'info') {
    this.toastSubject.next({ mensaje, tipo });

    setTimeout(() => {
      this.toastSubject.next(null);
    }, 3000);
  }
}
