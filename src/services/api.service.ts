import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ApiService {
    addresses: any[] = [];
    updtAddress: Subject<any[]> = new Subject<any[]>();

    constructor(private http: HttpClient) {
        this.readDataConfig();
    }

    setAddressesData(addresses) {
        this.addresses = addresses;

        this.writeDataConfig();
    }

    ApiBTCBalance(address) {
        return this.http.get('https://blockchain.info/es/q/addressbalance/' + address);
    }

    ApiBTCIn(address) {
        return this.http.get('https://blockchain.info/es/q/getreceivedbyaddress/' + address);
    }

    ApiBTCOut(address) {
        return this.http.get('https://blockchain.info/es/q/getsentbyaddress/' + address);
    }

    ApiDOGEBalance(address) {
        return this.http.get('https://dogechain.info/api/v1/address/balance/' + address);
    }

    ApiDOGEIn(address) {
        return this.http.get('https://dogechain.info/api/v1/address/received/' + address);
    }

    ApiDOGEOut(address) {
        return this.http.get('https://dogechain.info/api/v1/address/sent/' + address);
    }

    coinMarketValue(coin) {
        if (coin == 'DOGE') {
            return this.http.get('https://api.coinmarketcap.com/v2/ticker/74/');
        } else {
            if (coin == 'BTC') {
                return this.http.get('https://api.coinmarketcap.com/v2/ticker/1/')
            }
        }
    }

    readDataConfig() {
        this.addresses = JSON.parse(localStorage.getItem("addresses"));
    }

    writeDataConfig() {
        localStorage.setItem("addresses", JSON.stringify(this.addresses));

        this.readDataConfig();

        this.updtAddress.next(this.addresses);
    }

    getUpdatedAddresses(): Observable<any[]> {
        return this.updtAddress.asObservable();
    }
}
