import {Component, OnInit, OnDestroy} from '@angular/core';
import {Loading, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ApiService} from '../../services/api.service';
import * as $ from 'jquery';


@Component({
    selector: 'page-wallet',
    templateUrl: 'wallet.html'
})
export class WalletPage implements OnInit, OnDestroy {
    idInterval: any;
    address: any;
    loading: Loading;
    loadingCheck: any[] = [];
    inOut: { received: string, sent: string };
    marketValue: { price: string, change24h: string };

    constructor(public navCtrl: NavController,
                private apiServices: ApiService,
                private navParams: NavParams,
                public toastCtrl: ToastController,
                public loadingCtrl: LoadingController) {

        this.address = this.navParams.get('address');

        this.inOut = {
            received: '0',
            sent: '0'
        };

        this.marketValue = {
            price: '0',
            change24h: '0'
        };
    }

    ngOnInit() {
        this.Loading();

        this.intervalInOutTrigger();
        this.marketValueTrigger();

        this.idInterval = setInterval(() => {
            let tmpAddrss = this.apiServices.addresses.filter(a => a.type === this.address.type && a.address === this.address.address);

            this.address.balance = tmpAddrss[0].balance;

            this.intervalInOutTrigger();
            this.marketValueTrigger();

        }, 10000);
    }

    intervalInOutTrigger() {
        switch (this.address.type) {
            case 'DOGE':
                this.apiServices.ApiDOGEIn(this.address.address)
                    .subscribe((res: any) => {
                        this.inOut.received = res.received;

                        if (this.loadingCheck.length <= 5) {
                            this.loadingCheck.push(false);
                        }
                        else {
                            this.closeLoading();
                        }
                    });

                this.apiServices.ApiDOGEOut(this.address.address)
                    .subscribe((res: any) => {
                        this.inOut.sent = res.sent;

                        if (this.loadingCheck.length <= 5) {
                            this.loadingCheck.push(false);
                        }
                        else {
                            this.closeLoading();
                        }
                    });
                break;
            case 'BTC':
                this.apiServices.ApiBTCIn(this.address.address)
                    .subscribe((res: any) => {
                        this.inOut.received = (res / 100000000).toString();

                        if (this.loadingCheck.length <= 5) {
                            this.loadingCheck.push(false);
                        }
                        else {
                            this.closeLoading();
                        }
                    });

                this.apiServices.ApiBTCOut(this.address.address)
                    .subscribe((res: any) => {
                        this.inOut.sent = (res / 100000000).toString();

                        if (this.loadingCheck.length <= 5) {
                            this.loadingCheck.push(false);
                        }
                        else {
                            this.closeLoading();
                        }
                    });
                break;
        }
    }

    marketValueTrigger() {
        this.apiServices.coinMarketValue(this.address.type)
            .subscribe((res: any) => {
                this.marketValue.price = res.data.quotes.USD.price;
                this.marketValue.change24h = res.data.quotes.USD.percent_change_24h;

                if (this.loadingCheck.length <= 5) {
                    this.loadingCheck.push(false);
                }
                else {
                    this.closeLoading();
                }
            });
    }

    ngOnDestroy() {
        clearInterval(this.idInterval);
    }

    round(value) {
        return Math.round(value * 100) / 100;
    }

    copyboard() {
        let temp = $("<input>");
        $("body").append(temp);
        temp.val($('#addressWallet').text()).select();
        document.execCommand("copy");
        temp.remove();

        this.toastCtrl.create({
            message: "Address copied",
            duration: 6000
        }).present();
    }

    Loading() {
        this.loading = this.loadingCtrl.create({
            content: "loading...",
            duration: 3000
        });
        this.loading.present();
    }

    closeLoading() {
        this.loading.dismissAll();
    }
}
