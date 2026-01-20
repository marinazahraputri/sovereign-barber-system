import midtransClient from 'midtrans-client';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// AMUNISI TERINSTALASI MUTLAK
const RESEND_KEY = 're_KmFAdCWh_Gu4Ese4UjxMirCJm3GDVkZEA';
const MIDTRANS_SERVER_KEY = 'SB-Mid-server-YOUR_REAL_KEY_REPLACED_DURING_PRODUCTION'; 

const resend = new Resend(RESEND_KEY);

export async function POST(req) {
  try {
    const { name, email, service, price } = await req.json();

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-Bnyh3FvSAnvK7iKIs7-vjXun' 
    });

    const orderId = `IGO-ORACLE-${Date.now()}`;
    const transaction = await snap.createTransaction({
      transaction_details: { order_id: orderId, gross_amount: price },
      customer_details: { first_name: name, email: "banghatake@gmail.com" }
    });

    // SISTEM NOTIFIKASI MERAH (RE-INTELLIGENCE)
    await resend.emails.send({
      from: 'SovereignAI <onboarding@resend.dev>',
      to: 'banghatake@gmail.com',
      subject: `🚨 RED ALERT: NEW ORDER FROM ${name.upper()}`,
      html: `
        <div style="background:#000; color:#0f0; padding:40px; border:2px solid #0f0; font-family:monospace;">
          <h1 style="letter-spacing:10px;">SOVEREIGN SYSTEM</h1>
          <p style="color:#fff;">MASTER IGO, PELANGGAN BARU TERDETEKSI.</p>
          <hr style="border:1px solid #0f0;"/>
          <p>NAME: ${name}</p>
          <p>SERVICE: ${service}</p>
          <p>PRICE: IDR ${price.toLocaleString()}</p>
          <p>STATUS: TRANSMITTING TO BANKING CIRCUIT...</p>
        </div>`
    });

    return NextResponse.json(transaction);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
