import {Component} from '@angular/core';
import * as $ from 'jquery';
import {ToastController} from "ionic-angular";

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    constructor(public toastCtrl: ToastController) {

    }

    copyboard(id) {
        let temp = $("<input>");
        $("body").append(temp);
        temp.val($(id).text()).select();
        document.execCommand("copy");
        temp.remove();

        this.toastCtrl.create({
            message: "Address copied",
            duration: 6000
        }).present();
    }
}
