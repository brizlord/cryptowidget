import {Component, OnInit, OnDestroy} from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {ApiService} from '../../services/api.service';
import {WalletPage} from "../wallet/wallet";
import {PopoverSettingPage} from "../popoverSetting/popoverSetting";
import {SettingPage} from "../setting/setting";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
    idInterval: any;
    addresses: any[];
    isLoading: boolean = false;

    constructor(public navCtrl: NavController,
                private apiServices: ApiService,
                public popoverCtrl: PopoverController) {

        this.addresses = this.apiServices.addresses;
    }

    ngOnInit() {
        this.intervalBalanceTrigger();

        this.idInterval = setInterval(() => {
            this.intervalBalanceTrigger();
        }, 10000);

        this.apiServices.getUpdatedAddresses()
            .subscribe(res => this.addresses = res);
    }

    settingOps(event) {
        const popover = this.popoverCtrl.create(PopoverSettingPage);
        popover.present({ev: event});
    }

    intervalBalanceTrigger() {
        if (this.addresses != null) {
            for (let i = 0; i < this.addresses.length; i++) {
                switch (this.addresses[i].type) {
                    case 'DOGE':
                        this.apiServices.ApiDOGEBalance(this.addresses[i].address)
                            .subscribe((res: any) => {
                                this.addresses[i].balance = res.balance;

                                this.apiServices.setAddressesData(this.addresses);
                            });
                        break;
                    case 'BTC':
                        this.apiServices.ApiBTCBalance(this.addresses[i].address)
                            .subscribe((data: any) => {
                                this.addresses[i].balance = parseInt(data.toString()) / 100000000;

                                this.apiServices.setAddressesData(this.addresses);
                            });
                        break;
                }
            }
        }
    }

    ngOnDestroy() {
        clearInterval(this.idInterval);
    }

    openWallet(address) {
        this.navCtrl.push(WalletPage, {address: address});
    }

    openSetting() {
        this.navCtrl.push(SettingPage);
    }
}
