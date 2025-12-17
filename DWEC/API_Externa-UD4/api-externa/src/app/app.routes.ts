import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { UserView } from './pages/user-view/user-view';
import { UserForm } from './pages/user-form/user-form';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'usuario/:id', component: UserView },
    { path: 'usuario/edit/:id', component: UserForm },
    { path: 'newuser', component: UserForm }
];
