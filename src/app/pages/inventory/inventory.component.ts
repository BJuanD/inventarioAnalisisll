import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/shared/services/inventario/inventario.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(100px)' }))
      ])
    ])
  ]
})
export class InventoryComponent implements OnInit {

  materiales: any[] = [];
  materialesFilter: any[] = [];
  materialEditando: any = null;
  materialSeleccionado: any = null;

  filterName = '';
  filterTipo = '';
  filterResponsable = '';
  filterEstado = '';
  filterCantidad: number | null = null;


  estadosDisponibles = ['Nuevo', 'Usado', 'Dañado'];
  ubicacionesDisponibles = ['Almacén 1', 'Almacén 2', 'Almacén 3', 'Almacén 4', 'Bodega'];

  
  constructor(private inventarioService: InventarioService, private toastService: ToastService) {}

  ngOnInit() {
    this.obtenerMateriales();
  }

  obtenerMateriales() {
    this.inventarioService.obtenerProductos().subscribe({
      next: data => {
        this.materiales = data;
        this.materialesFilter = [...data];
  
        if (data.length === 0) {
          this.toastService.mostrarToast('No hay materiales en el inventario.', 'error');
        }
      },
      error: err => {
        console.error(err);
        this.toastService.mostrarToast('Error al cargar el inventario. Intente nuevamente.', 'error');
      }
    });
  }
  

  applyFilter() {
    this.materialesFilter = this.materiales.filter(m =>
      m.nombre.toLowerCase().includes(this.filterName.toLowerCase()) &&
      m.tipo.toLowerCase().includes(this.filterTipo.toLowerCase()) &&
      m.responsable.toLowerCase().includes(this.filterResponsable.toLowerCase()) &&
      m.estado.toLowerCase().includes(this.filterEstado.toLowerCase()) &&
      (this.filterCantidad === null || m.cantidad >= this.filterCantidad)
    );
  
    if (this.materialesFilter.length === 0) {
      this.toastService.mostrarToast('No se encontraron materiales con los criterios de búsqueda.', 'error');
    }
  }
  
  

  editarMaterial(material: any) {
    this.materialEditando = { ...material };
  }

  guardarEdicion() {
    if (!this.materialEditando.estado || !this.materialEditando.ubicacion) {
      this.toastService.mostrarToast ('Estado y ubicación no pueden estar vacíos.');
      this.toastService.mostrarToast ('error');
      return;
    }

    const { cantidad } = this.materialEditando;
  
    if (isNaN(cantidad) || cantidad < 0) {
      this.toastService.mostrarToast('La cantidad ingresada no es válida. Ingrese un valor numérico mayor o igual a 0.', 'error');
      return;
    }
  
    const { id, ...datosEditados } = this.materialEditando;
  
    this.inventarioService.actualizarProducto(id, datosEditados).subscribe({
      next: () => {
        this.toastService.mostrarToast('Producto actualizado correctamente.', 'exito');
        this.obtenerMateriales();
        this.materialEditando = null;
      },
      error: err => {
        this.toastService.mostrarToast('No se pudo actualizar la cantidad. Intente nuevamente.', 'error');
        console.error(err);
      }
    });
  }
  

  verDetalles(material: any) {
    if (this.materialSeleccionado && this.materialSeleccionado.id === material.id) {
      this.materialSeleccionado = null;
    } else {
      this.materialSeleccionado = material;
    }
  }
  

  cerrarDetalles() {
    this.materialSeleccionado = null;
  }
  
  eliminarMaterial(material: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar el material "${material.nombre}"?`)) {
      console.log('ID del material a eliminar:', material.id);
      this.inventarioService.eliminarProducto(material.id).subscribe({
        next: () => {
          this.toastService.mostrarToast('Material eliminado correctamente.', 'exito');
          this.obtenerMateriales();
        },
        error: err => {
          this.toastService.mostrarToast('Error al eliminar el material. Intente nuevamente.', 'error');
          console.error(err);
        }
      });
    }
  }
  
  trackById(index: number, material: any): number {
    return material.id;
  }  
}
