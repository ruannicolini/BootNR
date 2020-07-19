import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:3333",
});

/*

 ***** Configuracao da baseURL do axios *****
 * ios com Emulador: localhost
 
 * ios com disp. Físico: ip da maquina
  
 * Android com Emulador: localhost
   Como o emulador do android entende como localhost, ele mesmo (o proprio emulador), por isso
   é necessário fazer um redirecionamento de portas com o comando
   adb reverse tcp:3333 tcp:3333
   que diz que a porta 3333 da nossa maquina sera redirecionada para a porta 3333 do emulador 

* Android com Emulador android studio : 10.0.2.2
    Utiliza o ip especifico para o emulador android studio

* Android com Emulador Genymotion : 10.0.3.2
    Utiliza o ip especifico para o emulador Genymotion

 * Android com disp. Físico: ip da maquina

 */

export default api;
