import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

import { User } from '../models/user.model';

export interface UserStateModel {
    user: User;
    loaded: boolean;
}

export class LoginWithEmailAction {
    static readonly type = '[Auth] Login';
    constructor(public payload: { email: string, password: string }) { }
}

export class LogoutAction {
    static readonly type = '[Auth] Logout';
}

export class SetUserAction {
    static readonly type = '[Auth] Set User';
    constructor(public user: User | null) { }
}

@State<UserStateModel>({
    name: 'app',
    defaults: {
        user: null,
        loaded: false
    }
})
export class UserState implements NgxsOnInit {

    @Selector()
    static user(state: UserStateModel) { return state.user; }

    constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) { }

    ngxsOnInit(ctx: StateContext<UserStateModel>) {
        this.firebaseAuth.user.subscribe(user => {
            if (user) {
                var docRef = this.firestore.collection('users').doc(user.uid);
                docRef.get().toPromise().then(doc => {
                    if (doc.exists) {
                        const userDoc = doc.data();
                        ctx.dispatch(new SetUserAction({
                            name: userDoc.displayName || '',
                            email: userDoc.email || ''
                        }));
                    } else {
                        ctx.dispatch(new SetUserAction({
                            name: user.displayName || '',
                            email: user.email || ''
                        }));
                    }
                });
            }
        });
    }

    @Action(LoginWithEmailAction)
    async loginWithEmail({ patchState }: StateContext<UserStateModel>, { payload }: LoginWithEmailAction) {
        await this.firebaseAuth.auth.signInWithEmailAndPassword(payload.email, payload.password);
    }

    @Action(LogoutAction)
    async logout({ setState, getState }: StateContext<UserStateModel>) {
        const state = getState();
        await this.firebaseAuth.auth.signOut();

        setState({
            ...state,
            user: null
        });
    }

    @Action(SetUserAction)
    setUser({ getState, setState }, { user }: SetUserAction) {
        const state = getState();
        // console.log(user);
        setState({
            ...state,
            user: user,
            loaded: true
        });
    }
}