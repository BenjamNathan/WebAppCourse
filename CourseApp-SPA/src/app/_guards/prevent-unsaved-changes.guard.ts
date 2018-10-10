import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AvailableShooterEditComponent } from '../available-shooters/available-shooter-edit/available-shooter-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<AvailableShooterEditComponent> {
    canDeactivate(component: AvailableShooterEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you ser you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
