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
        from: 'Equipe Meetup <noreply@meetupapp.com>',
    }

    // host: 'smtp.mailtrap.io',
    // port: 2525,
    // secure: false,
    // auth: {
    //     user: 'f120d348dd8a16',
    //     pass: '640a0bfce08a85',
    // },
    // default: {
    //     from: 'Equipe Meetup <noreply@meetupapp.com>',
    // }

}