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
import { UploadComponent } from './upload/upload.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { KitchenGalleryComponent } from './kitchen-gallery/kitchen-gallery.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateCatergoryComponent } from './create-catergory/create-catergory.component';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';


import { CategoryService } from './category.service';
import { ManageProjectService } from './manage-project.service';
import { PagerService } from './pager.service';
import { AdminLoginService } from './admin-login.service';
import { GalleryComponent } from './gallery/gallery.component';
import { OfficeGalleryComponent } from './office-gallery/office-gallery.component';




@NgModule({
  declarations: [
    AppComponent,
    ContactUSComponent,
    HomeComponent,
    UploadComponent,
    NavBarComponent,
    KitchenGalleryComponent,
    AdminHomeComponent,
    CreateCatergoryComponent,
    DeleteProjectComponent,
    AdminloginComponent,
    GalleryComponent,
    OfficeGalleryComponent,
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
      { path:'adminlogin', component:AdminloginComponent},
      { path: 'adminHome', component: AdminHomeComponent, children:[{path:'', component:UploadComponent, canActivate: [AdminLoginService]},
                                                                  {path:'fileUpload', component:UploadComponent, canActivate: [AdminLoginService]},
                                                                  { path:'createCatergory', component:CreateCatergoryComponent, canActivate: [AdminLoginService]},
                                                                  { path:'deleteProject', component:DeleteProjectComponent, canActivate: [AdminLoginService]}]},
      { path: 'kitchenGallery', component: KitchenGalleryComponent },
      { path: 'officeGallery', component: OfficeGalleryComponent }
     ])
  ],
  providers: [ CategoryService, ManageProjectService,
    PagerService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
