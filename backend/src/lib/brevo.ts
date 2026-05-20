/**
 * Thin Brevo (formerly Sendinblue) transactional email wrapper.
 * Docs: https://developers.brevo.com/reference/sendtransacemail
 */

interface BrevoSendInput {
  apiKey: string;
  to: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  textContent?: string;
  sender?: { email: string; name?: string };
  replyTo?: { email: string; name?: string };
  tags?: string[];
}

export async function brevoSendEmail({
  apiKey,
  to,
  subject,
  htmlContent,
  textContent,
  sender = { email: 'benefactorfundme@gmail.com', name: 'Benefactor' },
  replyTo,
  tags,
}: BrevoSendInput) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender,
      to: [to],
      subject,
      htmlContent,
      textContent,
      replyTo,
      tags,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Brevo API ${res.status}: ${errorBody}`);
  }

  return res.json() as Promise<{ messageId: string }>;
}

interface ReceiptInput {
  apiKey: string;
  to: { email: string; name?: string };
  amount: number;
  currency: string;
  paymentRef: string;
}

/** Builds and sends a "thank you for your donation" receipt. */
export async function sendDonationReceipt({
  apiKey,
  to,
  amount,
  currency,
  paymentRef,
}: ReceiptInput) {
  const code = currency.toUpperCase();
  const symbol = code === 'GBP' ? '£' : code === 'USD' ? '$' : '€';
  const formatted = `${symbol}${amount.toFixed(2)}`;

  const subject = `Thank you for your donation — ${formatted}`;
  const htmlContent = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#F7F4EC;padding:32px 16px;color:#0B1B2B">
      <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:24px;padding:40px 32px;box-shadow:0 8px 28px rgba(11,27,43,0.06)">
        <div style="text-align:center">
          <div style="display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:50%;background:#10B981;margin:0 auto 20px">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h1 style="font-size:28px;line-height:1.15;margin:0 0 8px;font-weight:800">Thank you for your donation!</h1>
          <p style="font-style:italic;color:#047857;font-weight:600;font-size:17px;margin:0 0 24px">Every donation is a new hope.</p>
        </div>

        <p style="font-size:15px;line-height:1.65;color:#3F4A55;margin:0 0 24px">
          Your kindness brings real change today. Below is the receipt for your records.
        </p>

        <table style="width:100%;border-collapse:collapse;font-size:14px;margin:0 0 24px">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #ECE6D8;color:#6B7280">Amount</td>
            <td style="padding:10px 0;border-bottom:1px solid #ECE6D8;text-align:right;font-weight:700">${formatted}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #ECE6D8;color:#6B7280">Payment reference</td>
            <td style="padding:10px 0;border-bottom:1px solid #ECE6D8;text-align:right;font-family:monospace;font-size:12px">${paymentRef}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6B7280">Processed by</td>
            <td style="padding:10px 0;text-align:right">Stripe (secure payments)</td>
          </tr>
        </table>

        <div style="text-align:center;margin:24px 0 8px">
          <a href="https://benefactorteam.com" style="display:inline-block;background:#F4C430;color:#0B1B2B;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:100px;font-size:14px">Visit Benefactor</a>
        </div>

        <p style="font-size:12px;color:#6B7280;text-align:center;line-height:1.55;margin:24px 0 0">
          You're receiving this because you made a donation on benefactorteam.com.<br/>
          If this wasn't you, please reply to this email.
        </p>
      </div>
    </div>`;

  const textContent = `Thank you for your donation!\n\nEvery donation is a new hope.\n\nAmount: ${formatted}\nPayment reference: ${paymentRef}\n\nVisit https://benefactorteam.com`;

  return brevoSendEmail({
    apiKey,
    to,
    subject,
    htmlContent,
    textContent,
    tags: ['donation-receipt'],
  });
}
