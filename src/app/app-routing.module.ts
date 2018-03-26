import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TasksComponent } from  './tasks/tasks.component';

import { AuthGuard } from "./guards/auth.guard";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";

// forRoot vai retornar um modulo com todas as configuracoes das rotas da app
const ROUTES = RouterModule.forRoot([
  {
    path: 'tasks/:id',
    component: TaskDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-up',
    component: SignUpFormComponent, canActivate: [NotAuthenticatedGuard]
  },
  {
    path: 'sign-in',
    component: SignInFormComponent, canActivate: [NotAuthenticatedGuard]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
])

@NgModule({
  declarations: [],
  imports: [ ROUTES ],
  exports: [ RouterModule ], // precisamos exportar aqui para que no app.module os recursos de rotas estejam disponíves para os modulos importados lá
  providers: [],
})

export class AppRoutingModule {}