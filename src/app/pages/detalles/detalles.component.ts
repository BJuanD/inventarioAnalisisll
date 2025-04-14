import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {

  @Input() material: any;
  @Output() cerrar = new EventEmitter<void>();

  cerrarDetalles() {
    this.cerrar.emit();
  }
}
