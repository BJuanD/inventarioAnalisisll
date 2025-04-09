import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/shared/inventario/inventario.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  materiales: any[] = [];
  materialesFilter: any[] = [];
  materialEditando: any = null;

  filterName = '';
  filterTipo = '';
  filterResponsable = '';

  mensaje: string = '';
  mensajeTipo: 'exito' | 'error' = 'exito';
  
  constructor(private inventarioService: InventarioService) {}

  ngOnInit() {
    this.obtenerMateriales();
  }

  obtenerMateriales() {
    this.inventarioService.obtenerProductos().subscribe(data => {
      this.materiales = data;
      this.materialesFilter = [...data]; // para filtros
    });
  }

  applyFilter() {
    this.materialesFilter = this.materiales.filter(m =>
      m.nombre.toLowerCase().includes(this.filterName.toLowerCase()) &&
      m.tipo.toLowerCase().includes(this.filterTipo.toLowerCase()) &&
      m.responsable.toLowerCase().includes(this.filterResponsable.toLowerCase())
    );
  }

  editarMaterial(material: any) {
    this.materialEditando = { ...material }; // copia para editar
  }

  guardarEdicion() {
    if (!this.materialEditando) return;
  
    const { cantidad } = this.materialEditando;
  
    if (isNaN(cantidad) || cantidad < 0) {
      this.mensaje = 'La cantidad ingresada no es válida. Ingrese un valor numérico mayor o igual a 0.';
      this.mensajeTipo = 'error';
      return;
    }
  
    const { id, ...datosEditados } = this.materialEditando;
  
    this.inventarioService.actualizarProducto(id, datosEditados).subscribe({
      next: () => {
        this.mensaje = 'Producto actualizado correctamente.';
        this.mensajeTipo = 'exito';
        this.obtenerMateriales();
        this.materialEditando = null;
  
        // Limpiar mensaje luego de 3 segundos
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: err => {
        this.mensaje = 'No se pudo actualizar la cantidad. Intente nuevamente.';
        this.mensajeTipo = 'error';
        console.error(err);
      }
    });
  }
}
