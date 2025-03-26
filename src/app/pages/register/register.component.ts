import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  materialForm!: FormGroup;
  materiales: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.materialForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      categoria: ['', Validators.required],
      codigo: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      unidad: ['', Validators.required],
      proveedor: [''],
      precioUnitario: [0, Validators.required],
      ubicacion: [''],
      fechaIngreso: [new Date().toISOString().slice(0, 10), Validators.required],
      responsable: ['']
    });
  }

  guardarMaterial() {
    if (this.materialForm.invalid) {
      return;
    }
  
    const data = localStorage.getItem('materiales');
    this.materiales = data ? JSON.parse(data) : [];
  
    const nuevoMaterial = this.materialForm.value;
    this.materiales.push(nuevoMaterial);
  
    localStorage.setItem('materiales', JSON.stringify(this.materiales));
  
    this.materialForm.reset();
    this.materialForm.patchValue({ fechaIngreso: new Date().toISOString().slice(0, 10) });
  }
  

  eliminarMaterial(index: number) {
    this.materiales.splice(index, 1);
    localStorage.setItem('materiales', JSON.stringify(this.materiales));
  }
}
