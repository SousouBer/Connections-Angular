import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptorService } from './app/auth/services/auth-interceptor.service';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from './environments/environment.prod';
import { provideStore } from '@ngrx/store';
import { profileReducers } from './app/store/reducers/profile.reducers';
import { provideEffects } from '@ngrx/effects';
import { ProfileEffects } from './app/store/effects/profile.effects';
import { groupReducers } from './app/store/reducers/groups.reducers';
import { GroupsEffects } from './app/store/effects/groups.effects';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    provideStore({profileData: profileReducers, groupsData: groupReducers}),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    provideEffects([ProfileEffects, GroupsEffects]),
  ],
});
