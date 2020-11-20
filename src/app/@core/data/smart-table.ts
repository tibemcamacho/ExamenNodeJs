import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableData {
  
  constructor(private http: HttpClient) {}

  getDataSource(personaje: string){
    return this.http.get('https://swapi.dev/api/people/?search=' + personaje);  
  }

  
  getDataSourceAll(){
    return this.http.get('https://swapi.dev/api/people' );  
  }
  
}
