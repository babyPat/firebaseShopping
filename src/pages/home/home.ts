import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  uploadItems={
    item:''
  }
  name='';

  retrievedItems = [{
    name:'',
    keyName:''
  }]
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {

    firebase.database().ref('/dudu/').on("value",(snapshot)=>{
     this.retrievedItems=[]
      snapshot.forEach((snap) =>{

       // console.log(snap.key)
        console.log(snap.val().item)
        this.retrievedItems.push({name:snap.val().item, keyName:snap.key})
        return false;
      });
    })
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  writeCuisine(){
    
    this.uploadItems.item = this.name;
    var database = firebase.database();
    database.ref('/dudu/').push(this.uploadItems);
    this.name = '';
  }

  delete(key){
    
    var database = firebase.database();
    database.ref('/dudu/'+key).remove();
  }

  
    update(key){

      let alert = this.alertCtrl.create({
        title: 'update',
        message: "Please update item",
        inputs: [
          {
            name: 'title',
            placeholder: 'Title'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Update',
            handler: (data) => {
              console.log('Saved clicked');{
                var database = firebase.database();
              database.ref('/dudu/'+key).set({item:data.title});
              }
            }
          }
        ]
      });
      alert.present();;
    }
  
}



