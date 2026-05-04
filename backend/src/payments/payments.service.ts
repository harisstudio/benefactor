import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!, {
      apiVersion: '2025-01-27-acacia' as any,
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'gbp') {
    return this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents/pence
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  }
}
