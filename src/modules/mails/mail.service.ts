import { Injectable, InternalServerErrorException } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,                 
      secure: false,              
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    });
  }

  async sendResetCode(email: string, code: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"MenuPocket" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Código de recuperação',
        html: `
          <h2>Recuperação de senha</h2>
          <p>Seu código:</p>
          <h1>${code}</h1>
        `,
      });

      return info;
      
    } catch (error) {
      throw new InternalServerErrorException("Erro interno no Servidor")
    }
  }
}
