import { Component } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ChargingStationsService } from './services/charging-stations.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project1';
  latitude !: number;
  longitude !: number;
  zoom !: number;
  address !: string;
  data !: any;
  dialogTitle !: any;

  display: boolean = false;
  popup: boolean = false;
  public user = {url:'https://icon-library.com/images/b64e5b449c.png',
                    scaledSize: {height: 70, width: 70}
                   };
  public icon = {url:'https://static.thenounproject.com/png/1287583-200.png',
                    scaledSize: {height: 50, width: 40}
                   };              
  public locationIcon = 'https://cdn.vox-cdn.com/thumbor/x6e1SCOtGJc6wG4Xk9tkVJZqyws=/0x0:1280x800/1400x933/filters:focal(538x298:742x502):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/66260585/googlemaps.5.png';

  markers = [
    {
      id: 1,
      lat: 23.2599,
      lng: 77.4126,
      label: 'Capital Petrol Pump,',
      city: ' Bhopal, Madhya Pradesh',
      country: 'India',
      url: './images/marker_icon'
    }
  ];

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private api : ChargingStationsService
  ) { }
  

  mapShow(){
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.display = true;

      this.data = {"latitude":this.latitude, "longitude":this.longitude};
      this.api.getCharginStations()
      .subscribe(res=>{
      this.dialogTitle = "Nearest Charging Stations";
      this.markers = res;
    },
    err=>{
      this.dialogTitle = "Something went worng! Try Again.";
    })
    });
  }
  
 
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      });
    }
  }

  //infoWindow will be open when onMouseover on ther marker
  onMouseOver(infowindow:any,map:any){

    if (map.lastOpen != null) {
      map.lastOpen.close();
  }

  map.lastOpen = infowindow;

  infowindow.open();
    
  }
  
  //infoWindow will be close when onMouseout on ther marker
  onMouseOut(infowindow:any,map:any){

    if (map.lastOpen != null) {
      map.lastOpen.close();
  }

  map.lastOpen = infowindow;

  infowindow.close();
    
  }

}
