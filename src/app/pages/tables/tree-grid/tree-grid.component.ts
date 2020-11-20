import { Component, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { SmartTableData } from 'app/@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent {
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
  source: LocalDataSource = new LocalDataSource();
  radioGroupValue = '0';
  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,private service: SmartTableData,) {
    this.orderArray(0);
  }

  orderArray(item) {
    console.log(item);
    this.service.getDataSourceAll().subscribe((data:any)=>{
      
      switch(item) {
        case 0:
          this.source.load(data.results.sort((a,b)=> (a.name> b.name)? 1 : -1));
          break;
        case 1:
          this.source.load(data.results.sort((a,b)=> (+a.mass> +b.mass)? -1 : 1));
          break;
        case 2:
          console.log(data.results)
          this.source.load(data.results.sort((one, two) => (+one.height > +two.height ? -1 : 1)));
          break;

      }
    });
  }

}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
