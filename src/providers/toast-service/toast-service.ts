import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";


@Injectable()
export class ToastService {
    constructor(private toastCtrl: ToastController) {
    }

    showMessage(message: string, duration: number = 3000) {
        return this.toastCtrl.create({
            message: message,
            duration: duration
        }).present();
    }
}