import { Component, OnInit ,Inject} from '@angular/core';
import { HttphandlerService } from "../../../Services/HTTPServices/httphandler.service"
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserDataService } from 'src/app/Services/user-data.service';
import { Router } from '@angular/router';
// import image from "../../../images/back.jpg"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private http:HttphandlerService,
    private router: Router,
    public dialog: MatDialog,
    private userDataService : UserDataService) { }
  userData = null

  ngOnInit(): void {
    this.userDataService.userData.subscribe(data => {
      this.userData = data;
    })
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  checkSignIn(route){
    if(this.userData){
      this.router.navigate([route]);
    }else{
      this.router.navigate(['/login'])
    }
  }
  login(){
    this.router.navigate(['/login']);
  }
  logout(){
    this.http.apiPost('/users/logout',{}).subscribe((res:any)=>{
      console.log("res",res)
      localStorage.clear();
      this.userDataService.updateUser(null);
      window.location.reload();
    })
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./home.component.css']
})
export class DialogOverviewExampleDialog {

  
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private userDataService : UserDataService
    ) {

      this.dialogRef.afterClosed().subscribe(result => {
        console.log("result",result)
      });
    }
    ngOnInit(): void {
      
    }

    

  onNoClick(): void {
    this.dialogRef.close();
  }

}
