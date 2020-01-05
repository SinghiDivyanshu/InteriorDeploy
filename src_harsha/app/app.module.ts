import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { KitchenGalleryComponent } from './kitchen-gallery/kitchen-gallery.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactUSComponent,
    HomeComponent,
  
    NavBarComponent,
    KitchenGalleryComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    FileUploadModule,
  
    NgbModule.forRoot(),  
    RouterModule.forRoot([ 
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'contactUs', component: ContactUSComponent },
      { path: 'aboutUs', component: AboutUsComponent },
     
      { path: 'kitchenGallery', component: KitchenGalleryComponent }
     ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
