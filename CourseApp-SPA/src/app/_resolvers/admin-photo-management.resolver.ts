import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Photo } from '../_models/photo';

@Injectable()
export class AdminPhotoManagementResolver implements Resolve<Photo> {
}
