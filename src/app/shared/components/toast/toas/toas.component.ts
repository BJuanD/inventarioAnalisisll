import { Component } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-toas',
  templateUrl: './toas.component.html',
  styleUrls: ['./toas.component.css']
})
export class ToasComponent {

  mensaje: string = '';
  tipo: 'exito' | 'error' | 'info' = 'info';
  visible = false;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState$.subscribe(toast => {
      if (toast) {
        this.mensaje = toast.mensaje;
        this.tipo = toast.tipo;
        this.visible = true;

        setTimeout(() => {
          this.visible = false;
        }, 3000);
      }
    });
  }
}
