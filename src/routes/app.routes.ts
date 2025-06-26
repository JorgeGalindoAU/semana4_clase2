import { Routes } from '@angular/router';
import { MainScreenComponent } from '../screens/main-screen/main-screen.component';
import { UsersScreenComponent } from '../screens/users-screen/users-screen.component';
import { CreateUserScreenComponent } from '../screens/create-user-screen/create-user-screen.component';

const title: string = 'Mi Primera Aplicación';

export const routes: Routes = [
    { path: '', redirectTo: 'menu', pathMatch: 'full' },
    { path: 'menu', component: MainScreenComponent, title: title },
    { path: 'users', component: UsersScreenComponent, title: title },
    { path: 'users/create', component: CreateUserScreenComponent, title: title },
];