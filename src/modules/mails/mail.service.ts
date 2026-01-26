import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendResetCode(email: string, code: string) {
    await this.resend.emails.send({
      from: 'Meu App <no-reply@meuapp.com>',
      to: email,
      subject: 'Código de recuperação',
      html: `
        <h2>Recuperação de senha</h2>
        <p>Seu código:</p>
        <h1>${code}</h1>
      `,
    });
  }
}
