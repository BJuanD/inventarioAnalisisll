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

  const { id, ...datosEditados } = this.materialEditando;

  this.inventarioService.actualizarProducto(id, datosEditados).subscribe({
    next: () => {
      alert('Producto actualizado correctamente');
      this.obtenerMateriales();
      this.materialEditando = null;
    },
    error: err => {
      console.error('Error al actualizar producto', err);
      alert('Error al actualizar');
    }
  });
}


}
