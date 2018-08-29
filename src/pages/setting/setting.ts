import {Component} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {QRScanner} from "@ionic-native/qr-scanner";

@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html'
})
export class SettingPage {
    isDoge: boolean;
    isBtc: boolean;
    dogeAddrr: string;
    btcAddrr: string;

    constructor(private apiServices: ApiService,
                private qrScanner: QRScanner) {
        this.loadConfig();
    }

    loadConfig() {
        if (this.apiServices.addresses != null) {
            let tmp = this.apiServices.addresses.filter(w => w.type === "DOGE");
            if (tmp.length > 0) {
                this.isDoge = true;
                this.dogeAddrr = tmp[0].address;
            }

            tmp = this.apiServices.addresses.filter(w => w.type === "BTC");
            if (tmp.length > 0) {
                this.isBtc = true;
                this.btcAddrr = tmp[0].address;
            }
        }
    }

    saveAddrr() {
        let address: any[] = [];

        if (this.isDoge && this.dogeAddrr != null) {
            address.push({
                type: 'DOGE',
                address: this.dogeAddrr,
                balance: 0
            });
        }

        if (this.isBtc && this.btcAddrr != null) {
            address.push({
                type: 'BTC',
                address: this.btcAddrr,
                balance: 0
            });
        }

        this.apiServices.setAddressesData(address);
    }

    qrScan(type) {
        this.qrScanner.scan()
            .subscribe((text: string) => {
                switch (type) {
                    case 'doge':
                        this.dogeAddrr = text;
                        break;
                    case 'btc':
                        this.btcAddrr = text;
                        break;
                }

                this.qrScanner.hide(); // hide camera preview
            });
    }
}
