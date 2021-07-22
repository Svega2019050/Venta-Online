import { Component, OnInit,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CONNECTION } from 'src/app/services/global.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { UploadUserService } from 'src/app/services/uploadUser/upload-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public user:User;
  public token;
  public possiblePass;
  public filesToUpload:Array<File>;
  public uri:string;

  
  constructor(private restUser:RestUserService, 
    private router: Router,
    private uploadUser: UploadUserService) { 
    this.possiblePass = '';
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.uri = CONNECTION.URI;
}

  ngOnInit(): void {
  }



  updateUser(){
    delete this.user.password;
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        
        location.reload()
        alert(res.message);
        localStorage.setItem('user', JSON.stringify(res.userUpdated));

      }else{     
        localStorage.setItem('user', JSON.stringify(this.user));
        this.user = this.restUser.getUser();    
        Swal.fire({       
          icon: 'success',
          title: 'Usuario Actualizado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })   

      }
    },
    error=> alert(error.error.message));
  }

 
  deleteUser(){
    this.restUser.deleteUser(this.user._id, this.possiblePass).subscribe((res:any)=>{
      if(!res.userRemoved){
        alert(res.message)
      }else{
        Swal.fire({       
          icon: 'success',
          title: 'Usuario Eliminado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })   
        localStorage.clear();
        this.router.navigateByUrl('home');
      }
    },
    error => {
      if (error.status == 401) {
        Swal.fire({
          icon: 'error',
          title: 'Lo Sentimos...',
          background:'#000',
          text: 'Contraseña Incorrecta!',
          
          
        })
      }
    })
  }

  uploadImage(){
    this.uploadUser.fileRequest(this.user._id, [], this.filesToUpload, this.token, 'image')
      .then((res:any)=>{
        if(res.user){
          this.user.image = res.userImage;
          localStorage.setItem('user', JSON.stringify(this.user));
        }else{
          alert(res.message)
        }
      })
  }

  fileChange(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
  }


}
