import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlGroupListComponent } from './controlGroupList.component';
import { ControlGroupComponent } from './controlGroup.component';
// import { ProductDetailGuard } from './product-guard.service';

// import { ProductFilterPipe } from './product-filter.pipe';
import { ControlGroupService } from './controlGroup.service';

// import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'controlgroups', component: ControlGroupListComponent },
            {
                path: 'controlgroup/:id',
                component: ControlGroupComponent
            }
        ])
    ],
    declarations: [
        ControlGroupListComponent,
        ControlGroupComponent
    ],
    providers: [
        ControlGroupService
    ]
})
export class ProductModule { }
