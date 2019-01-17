import { Component, OnInit, Input } from '@angular/core';
import { tileLayer, latLng, marker, icon, layerGroup} from 'leaflet';
import { GeoEncoderService } from './../geo-encoder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {


  constructor(
    private geoEncoderService: GeoEncoderService,
    private router: Router,
    ) { }
  private myIcon = icon({
    iconUrl: './../../assets/icons/bed.png',
    iconSize: [30, 20],
    iconAnchor: [15, 10],
    popupAnchor: [-15, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });
  private user = JSON.parse(localStorage.getItem('currentUser'));
  private userlocation = this.user.data.latLong;
  public friends = this.user.friends;
  public markers = [];
  public mapReady = false;
  public school = JSON.parse(localStorage.getItem('school')).name;

  public options = {
    layers: [
      tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 13,
    center: latLng(this.userlocation.lat, this.userlocation.lng)
  };
  ngOnInit() {
    const _this = this;
    this.friends.forEach((friend, index) => {
      console.log(friend.attributes.field_location_postal);
      const searchString = `${friend.attributes.field_location_street}+` +
      `${friend.attributes.field_location_number}+` +
      `${friend.attributes.field_location_postal}+` +
      `${friend.attributes.field_location}+` +
      `Belgium`;
      _this.geoEncoderService.getLocationData(searchString).then(response => {
          console.log(response);
          const newMarker = marker([ response.data[0].lat, response.data[0].lon ], {icon: this.myIcon}).on('click', () => {
            _this.router.navigate(['home']);
          });
          _this.markers.push(newMarker);
        });
    });
  }
}
