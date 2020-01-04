export default {
    // Configuração abaixo para MailTrap (Teste). Mas pode ser usado para Amazon SES com as devidas configurações informadas.
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    default: {
        from: 'Equipe GoBarber <noreply@gobarber.com>',
    }
}