import { NgModule } from '@angular/core';
import { StoreModule} from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { StoreRouterConnectingModule} from '@ngrx/router-store'

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.components';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from "../environments/environment";
import * as fromApp from './store/app.reducer'
import { AuthEffects } from './auth/store/auth.effects';
import { RecipeEffects } from './recipes/store/recipe.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style} from '@angular/animations'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    HttpClientModule,
    SharedModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],

  bootstrap: [AppComponent],
 // providers: [LoggingService]

})
export class AppModule { }
