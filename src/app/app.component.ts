import { Component } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'english-vocab';
  word:string="Loading";
  meaning:string="Please wait while we collect and curate all the words";
  fetchedDataList:string[]=[""];

  constructor(private http: HttpClient) { 
      this.fetchDataFromGit();
  }

  httpurl:string="https://raw.githubusercontent.com/hey-om7/english-vocabulary/main/Printable/PrintReadyFile.txt";
  currentIndex=0;
  

  buttonPrevPress(){
    if(this.currentIndex>0){
      this.currentIndex-=1;
    }
    this.getWord();
  }

  buttonNextPress(){
    this.currentIndex+=1;
    console.log(this.currentIndex);
    this.getWord();
  }

  
 async fetchDataFromGit(){
     this.http.get(this.httpurl, { responseType: 'text' }).subscribe(
      (response: string) => {
        this.fetchedDataList=response.split("--------------------");
        this.getWord();
      },(error) => {
        // Handle any errors
        // console.error(error);
      });
      
  }
  getWord(){
    const current_element:string=this.fetchedDataList[this.currentIndex];
    const l2:string[]=current_element.split(":");
    
    //assigning meaningHead
    let meaningHead:string=l2[0].split(".)")[1].trim();
    meaningHead=meaningHead[0].toUpperCase()+meaningHead.substring(1,);
    this.word=meaningHead;

    // assigning meaningTail
    let meaningTail:string=l2[1].trim();
    meaningTail=meaningTail[0].toUpperCase()+meaningTail.substring(1,meaningTail.length-3);
    this.meaning=meaningTail;
  }

  
  
 
}
