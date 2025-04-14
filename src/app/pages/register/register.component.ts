import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';// ajusta la ruta si es necesario
import { InventarioService } from 'src/app/shared/services/inventario/inventario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  materialForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService
  ) {}

  ngOnInit() {
    this.materialForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      ubicacion: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
      responsable: ['', Validators.required]
    });
    
  }

  guardarMaterial() {
    if (this.materialForm.valid) {
      this.inventarioService.agregarProducto(this.materialForm.value).subscribe({
        next: res => {
          alert('Producto guardado correctamente');
          this.materialForm.reset();
        },
        error: err => {
          console.error('Error al guardar producto', err);
          alert('Error al guardar el producto');
        }
      });
    }
  }
  
  
}
