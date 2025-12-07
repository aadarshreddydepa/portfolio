import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message, subject, type, date, time, guests } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions;

    if (type === 'booking') {
      mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to yourself
        replyTo: email,
        subject: `New Call Request: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #000;">New Booking Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            ${guests ? '<p><strong>Guests Included:</strong> Yes</p>' : ''}
            <p><strong>Topic:</strong> ${subject}</p>
            <br />
            <strong>Additional Notes:</strong>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 8px;">${message || 'No additional notes'}</p>
          </div>
        `,
      };
    } else {
      // Message Form
       mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Portfolio Message: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #000;">New Portfolio Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <strong>Message:</strong>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
          </div>
        `,
      };
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
