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
import { VisionComponent } from './vision/vision.component';
import { OfficeGalleryComponent } from './office-gallery/office-gallery.component';
import { UploadComponent } from './upload/upload.component';
import { HomeGalleryComponent } from './home-gallery/home-gallery.component';



import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateCatergoryComponent } from './create-catergory/create-catergory.component';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';


import { CategoryService } from './category.service';
import { ManageProjectService } from './manage-project.service';
import { AdminLoginService } from './admin-login.service';
import { FooterComponent } from './footer/footer.component';
import { FormAPIService } from './form-api.service';

 
@NgModule({
  declarations: [
    AppComponent,
    ContactUSComponent,
    HomeComponent,
    NavBarComponent,
    KitchenGalleryComponent,
    OfficeGalleryComponent,
    AboutUsComponent,
    UploadComponent,
    CreateCatergoryComponent,
    DeleteProjectComponent,
    VisionComponent,
    AdminHomeComponent,
    DeleteProjectComponent,
    AdminloginComponent,
    FooterComponent,
    HomeGalleryComponent
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
      { path: 'kitchenGallery', component: KitchenGalleryComponent },
      { path: 'officeGallery', component: OfficeGalleryComponent },
      { path: 'homeGallery', component: HomeGalleryComponent },
      { path: 'vision',component:VisionComponent},
      { path:'adminlogin', component:AdminloginComponent},
      { path: 'adminHome', component: AdminHomeComponent, children:[{path:'', component:UploadComponent, canActivate: [AdminLoginService]},
                                                                  {path:'fileUpload', component:UploadComponent, canActivate: [AdminLoginService]},
                                                                  { path:'createCatergory', component:CreateCatergoryComponent, canActivate: [AdminLoginService]},
                                                                  { path:'deleteProject', component:DeleteProjectComponent, canActivate: [AdminLoginService]}]},
     ])
     
  ],
  providers: 
   [CategoryService, ManageProjectService, FormAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
