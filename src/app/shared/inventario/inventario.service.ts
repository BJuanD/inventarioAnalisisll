import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private baseUrl = 'http://localhost:3000/inventario';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  agregarProducto(producto: any): Observable<any> {
    return this.http.post(this.baseUrl, producto);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, producto);
  }
  
}
