import {
    Store,
    Action,
    Dispatch,
} from 'redux';

export default (store: Store) => (next: Dispatch) => (action: Action) => {
    console.log(action);
    next(action);
};
