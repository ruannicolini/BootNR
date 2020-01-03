import pt from 'date-fns/locale/pt';
import { parseISO, format } from 'date-fns';
import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    // async handle({ data }){

    //     console.log('ENTROU NO HANDLE!');

    //     const { appointment } = data;

    //     console.log('A Fila Executou!');

    //     // Envio de email com template
    //     await Mail.sendMail({
    //         to: `${appointment.provider.name} <${appointment.provider.email}> `,
    //         subject: 'Agendamento Cancelado',
    //         template: 'cancellation',
    //         context: {
    //             provider: appointment.provider.name,
    //             user: appointment.user.name,
    //             date: format( parseISO(appointment.date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
    //                 locale: pt,
    //             }),
    //         },
    //     });
    // }

    async handle({ data }) {
        const { appointment } = data;
    
        await Mail.sendMail({
          to: `${appointment.provider.name} <${appointment.provider.email}>`,
          subject: 'Agendamento cancelado',
          template: 'cancellation',
          context: {
            provider: appointment.provider.name,
            user: appointment.user.name,
            date: format(
              parseISO(appointment.date),
              "'dia' dd 'de' MMMM', às' H:mm'h'",
              {
                locale: pt,
              }
            ),
          },
        });
    }

}

export default new CancellationMail();