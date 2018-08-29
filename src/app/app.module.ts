import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpClientModule} from "@angular/common/http";
import {QRScanner} from "@ionic-native/qr-scanner";

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {WalletPage} from "../pages/wallet/wallet";
import {SettingPage} from "../pages/setting/setting";
import {AboutPage} from "../pages/about/about";
import {PopoverSettingPage} from "../pages/popoverSetting/popoverSetting";

import {ApiService} from "../services/api.service";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        WalletPage,
        SettingPage,
        AboutPage,
        PopoverSettingPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        WalletPage,
        SettingPage,
        AboutPage,
        PopoverSettingPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ApiService,
        QRScanner,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
