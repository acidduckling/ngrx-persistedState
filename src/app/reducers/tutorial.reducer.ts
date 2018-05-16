import { Action } from '@ngrx/store';
import { Tutorial } from '../models/tutorial.model';
import * as TutorialActions from '../actions/tutorial.actions';

const defaultState: Tutorial = {
  name: 'Initial Tutorial',
  url: 'http://www.google.com'
};

export function tutorialReducer(
  state: Tutorial[],
  action: TutorialActions.Actions
) {
  switch (action.type) {
    case TutorialActions.ADD_TUTORIAL:
      return [...state, action.payload];

    case TutorialActions.REMOVE_TUTORIAL:
      return state.filter((v, i) => i !== action.payload);

    default:
      return loadState();
  }
}

function loadState(): Tutorial[] {
  try {
    const state = localStorage.getItem('state');
    const parsed = <Tutorial[]>JSON.parse(state).tutorial;
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [defaultState];
  } catch {
    localStorage.removeItem('state');
    return [defaultState];
  }
}
