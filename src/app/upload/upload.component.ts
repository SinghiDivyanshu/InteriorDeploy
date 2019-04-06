import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  profileForm: FormGroup;
  error: string;

  fileUpload = {status: '', message: '', filePath: ''};

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [''],
      profile: ['']
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length != 0) {
      const file = event.target.files[0];
      this.profileForm.get('profile').setValue(file);
    }
  }

}
