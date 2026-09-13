import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"DIGENTIC TECH" <noreply@digentic.tech>',
      to: email,
      subject: 'Reset your password — DIGENTIC TECH',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #111111; color: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid #1f1f1f;">
          <h2 style="color: #ff8c00; margin-bottom: 16px;">DIGENTIC TECH</h2>
          <h3 style="margin-bottom: 16px;">Password Reset Request</h3>
          <p style="color: #a3a3a3; line-height: 1.6;">You requested a password reset for your DIGENTIC TECH account. Click the button below to set a new password. This link is valid for 1 hour.</p>
          <div style="margin: 28px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(90deg, #ff8c00, #ff6b35); color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p style="color: #737373; font-size: 13px;">If you didn't request this email, you can safely ignore it.</p>
          <p style="color: #737373; font-size: 12px; word-break: break-all;">Or copy and paste this link into your browser: <br/><a href="${resetUrl}" style="color: #ff8c00;">${resetUrl}</a></p>
        </div>
      `,
    });
  } else {
    // Development mode console logger so local testing works seamlessly without SMTP setup
    console.log('====================================================');
    console.log(`[DIGENTIC AUTH] Password reset link for ${email}:`);
    console.log(resetUrl);
    console.log('====================================================');
  }
}
