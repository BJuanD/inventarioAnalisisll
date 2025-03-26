import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit{

  materiales: any[] = [];
  materialesFilter: any[] = [];

  filterName = '';
  filterCategory = '';
  filterProo = '';

  materialEditando: any = null;

  ngOnInit() {
    this.cargarMateriales();
  }

  cargarMateriales() {
    const data = localStorage.getItem('materiales');
    if (data) {
      this.materiales = JSON.parse(data);
      this.materialesFilter = [...this.materiales];
    }
  }

  applyFilter() {
    this.materialesFilter = this.materiales.filter(material => {
      return (
        material.nombre.toLowerCase().includes(this.filterName.toLowerCase()) &&
        material.categoria.toLowerCase().includes(this.filterCategory.toLowerCase()) &&
        material.proveedor.toLowerCase().includes(this.filterProo.toLowerCase())
      );
    });
  }

  editarMaterial(material: any) {
    this.materialEditando = { ...material };
  }

  guardarEdicion() {
    if (!this.materialEditando) return;

    const index = this.materiales.findIndex(m => m.codigo === this.materialEditando.codigo);
    if (index !== -1) {
      this.materiales[index] = { ...this.materialEditando };
      localStorage.setItem('materiales', JSON.stringify(this.materiales));
      this.cargarMateriales();
    }
    this.materialEditando = null;
  }
}
