import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent  implements OnInit {

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'name',
        type: 'string',
      },
      height: {
        title: 'height',
        type: 'number',
      },
      mass: {
        title: 'mass',
        type: 'number',
      },
      hair_color: {
        title: 'hair_color',
        type: 'string',
      },
      eye_color: {
        title: 'eye_color',
        type: 'string',
      },
      birth_year: {
        title: 'birth_year',
        type: 'string',
      },
      gender: {
        title: 'gender',
        type: 'string',
      },
    },
  };
  firstForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,
              public fb: FormBuilder) {
    
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      Personaje: ['', Validators.required],
    });
  }

  ngSubmit(){
    if(this.firstForm.valid) {
      this.service.getDataSource(this.firstForm.get('Personaje').value).subscribe((data:any)=>{
        console.log("--------------------")
        console.log(data.results)
        console.log("--------------------")
        this.source.load(data.results);
      });
    }
  }
}
