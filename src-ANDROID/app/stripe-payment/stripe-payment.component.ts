import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var Stripe: any;

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss'],
})
export class StripePaymentComponent {
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;

  stripe: any;

  constructor(private httpClient: HttpClient) {
    this.stripe = Stripe('your_publishable_key');
  }

  onSubmit() {
    this.createToken();
  }

  createToken() {
    this.stripe.createToken('card', {
      number: this.cardNumber,
      exp_month: parseInt(this.cardExpiry.split('/')[0], 10),
      exp_year: parseInt(this.cardExpiry.split('/')[1], 10),
      cvc: this.cardCvc,
    })
    .then((result:any) => {
      if (result.error) {
        console.error(result.error);
      } else {
        // Send the token to your server for further processing
        this.sendTokenToServer(result.token);
      }
    });
  }

  sendTokenToServer(token: any) {
    // Send the token to your server for processing
    // Make a HTTP request to your backend to create a PaymentIntent
    // Server should handle payment processing using the secret key
    console.log('Token:', token);
    // Example: Make an HTTP request to your server
    // this.httpClient.post('your_server_payment_endpoint', { token: token.id })
    //   .subscribe(response => {
    //     console.log('Server Response:', response);
    //   });
  }
}
