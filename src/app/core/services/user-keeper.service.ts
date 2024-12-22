import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserKeeperService {
  credits$ = new BehaviorSubject(0);
}
