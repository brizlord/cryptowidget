import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {AboutPage} from "../about/about";
import {SettingPage} from "../setting/setting";


@Component({
    selector: 'page-popoverSetting',
    template: `
        <ion-list>
            <ion-list-header>More</ion-list-header>
            <button ion-item (click)=" openPage('setting')">Setting</button>
            <button ion-item (click)=" openPage('about')">About</button>
        </ion-list>
    `
})
export class PopoverSettingPage {

    constructor(public viewCtrl: ViewController,
                public navCtrl: NavController) {
    }

    openPage(page) {
        switch (page) {
            case 'setting':
                this.navCtrl.push(SettingPage);
                break;
            case 'about':
                this.navCtrl.push(AboutPage);
                break;
        }

        this.close();
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
