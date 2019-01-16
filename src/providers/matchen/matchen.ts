import { Injectable, asNativeElements } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Row } from 'ionic-angular';
import { cordovaWarn } from '@ionic-native/core';

@Injectable()
export class MatchenProvider {

    private matchLijst: Array<string> = [];

    constructor() { }
//de likes worden in de localstorage opgeslagen
    matchToevoegen(id, likeLijst): Array<string> {
        
        localStorage.setItem(id, JSON.stringify(likeLijst));
       
       var lijst = localStorage.getItem("likeLijst");
       if (lijst) {
           likeLijst = JSON.parse(lijst);
       }
        return likeLijst;
   }
// er word nageken in welke arry de ingelogde gebruiker voor komt
//en die word in een arry gestoken   id = ingelogde user
/// deze methode moet maar 1x uitgevoerd worden
    matchZoeken(id): Array<string>{

       var gevonden: string;
       //var naam: string;
       for (var a = 0; a < localStorage.length; a++) {
           
           var data = JSON.parse(localStorage.getItem(localStorage.key(a)));
           for (let i = 0; i < data.length; i++) {
               if (id == data[i]) {
                  
                   this.matchLijst.push(localStorage.key(a));
                  
               }
           }
       }
        return this.matchLijst;
       //console.log(this.matchLijst);
   }
//in de like arry van ingelogde gebruiker nakijken of er een match is
//lijst = komt van matchZoeken
   matchGevonden(user_id,likeLijst): string{
       var gevonden: string = "je hebt een match met ";
            
            for(var x =0; x<likeLijst.length; x++){
                if(user_id == likeLijst[x]){
                    gevonden = gevonden + " " + user_id;
                    return gevonden;
                    //console.log(lijst[y]);
                }
            }
        
   }
}
