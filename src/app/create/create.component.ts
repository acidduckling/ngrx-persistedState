import { Component, OnInit } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { AppState } from '../app.state';
import { Tutorial } from '../models/tutorial.model';
import * as TutorialActions from '../actions/tutorial.actions';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  addTutorial(name, url) {
    this.store.dispatch(
      new TutorialActions.AddTutorial({ name: name, url: url })
    );
  }

  ngOnInit() {
    this.store.subscribe(() => {
      let state: AppState;
      this.store.take(1).subscribe(s => (state = s));
      localStorage.setItem('state', JSON.stringify(state));
    });
  }
}
