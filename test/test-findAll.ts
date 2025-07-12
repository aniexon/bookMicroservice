import { ClientProxyFactory, Transport } from "@nestjs/microservices"
import { firstValueFrom } from "rxjs";

async function main() {

    //creamos un cliente 
    const client = ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
            host: 'localhost',
            port: 3000
        }

    });

    // ENVIAMOS un mensaje a microservicios
    const response = await firstValueFrom (client.send({cmd: 'findAll'} , { }));
    console.log(response);

    

}

main();