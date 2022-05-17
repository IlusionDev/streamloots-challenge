# Backend Challenge

## Modelado de datos
La base de datos usada ha sido MongoDb, debido a su alta capacidad de lecturas.
El modelado de datos es el siguiente:

**Card**

    { 
         "_id": { "$oid": "627af29daaecda1a992dc76a" },
         "name": "name test", 
          "published": false, 
           "userId": "5a50159308f5a800111de759", 
           "limited": true,
           "quantity": 123,
           "rarity":  3
           "obtained": 119,
           "used": 45
         "__v": 0
        }

**UserCard**

    {
      "streamerId": "5a50159308f5a800111de759"
      "userId": "",
      "carts": [
         {
          "cardId": "627af29daaecda1a992dc76a"
          "quantity": 3,
          "used": 2
         }
      ],
     }
Se ha optado por este modelado por los siguientes puntos:

- El modelo de carta solo es buscado, usado por el propio dueño de la carta y las escrituras mas frequentes de este solo son para actualizar los stats de uso.
- Debido a la limitación en MongoDb de un limite de tamaño de documento de 16Mg se opta por usar otra coleccion donde se hace referencia al streamer, usuario y las cartas que ha obtenido de ese streamer. En el caso de tener las cartas de los usuarios en el modelo de carta el tamaño del documento creceria muy rapidamente haciendo inviable el uso o escritura de este, es por eso que al hacerlo de esta forma dividimos la informacion por streamer y usuario permitiendo que el documento sea tan pequeño como la cantidad de cartas que tiene de un streamer, haciendo asi que las lecturas y escrituras sean muy rapidas.

## Arquitectura
Respecto a la arquitectura de como usar las cartas propongo esto:
Debido a que en un stream no deberian salir muchas cartas y estas tienen que ir en el orden que han sido usadas, habría  que usar un sistema de colas como SQS de AWS donde estas cartas se encolan en orden y luego un microservicio estaría mandandolas al stream respetando el cooldown entre cartas que haya selecionado el streamer.
![Arch](arch.png)


## Routes
Base: /api/v1

Create a card: /cards
