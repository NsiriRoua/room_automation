# Room Automation System 

![image](https://user-images.githubusercontent.com/69841466/148640357-37b54e81-23ac-4704-8204-ecd4854abe89.png)



## Problématique
Assurer la sécurité de la maison est devenu primordial depuis que les incidents comme les
courts-circuits, les incendies ou encore l’utilisation excessive de l'électricité sont devenus très
fréquents.
## Contexte du projet 
Nous nous intéressons dans ce projet au contrôle de la température, la lumière dans la maison
qui est devenue plus facile avec les solutions IoT qui, grâce à des capteurs placés dans
plusieurs coins de la pièce fournissent des informations tout à l’utilisateur de l’application.
En effet, grâce au service de géolocalisation dans le smartphone, le client sera averti de la
situation de sa maison dès qu’il s’éloigne d’une distance seuil.
## Technologies utilisées
Ionic 5.6.12

Capacitor

Angular V13

Node JS 

Express

MongoDB

Mosquitto Broker

MQTT
## matériel utilisé pour l'IoT
DHT22

Arduino

Module WIFI ESP32

## Backend
npm start server.js pour mettre le serveur en marche et ionic serve pour que l'application soit lancée.



## Fonctionnalités 

Les mesures du capteur DHT11

![image](https://user-images.githubusercontent.com/69841466/148639846-d106c8b0-1612-40c5-9388-f21a8f6939bb.png)

Login Page :



![image](https://user-images.githubusercontent.com/57712621/148639987-cce8a59e-4067-42f3-9882-f7f219835cbf.png)

Si l'utilisateur n'existe pas, l'authentification échoue.Une message d'erreur s'affiche et l'utilisateur doit s'enregistrer avant de s'inscrire.

![image](https://user-images.githubusercontent.com/69841466/148640269-40f942f0-cc2b-4829-b947-e3214c0b8dd6.png)


Register Page

![image](https://user-images.githubusercontent.com/57712621/148640041-4406eb4d-9c1f-4eb7-a93e-040973951e8c.png)

Si l'utilisateur est déja enregistré , cette message s'affiche :

![image](https://user-images.githubusercontent.com/69841466/148640307-84d36e27-8909-4c8d-8def-8ee343ba7b97.png)


Localisation Page :

![image](https://user-images.githubusercontent.com/69841466/148640154-fea76b93-de5e-48f9-9508-12a00143c7d9.png)


![image](https://user-images.githubusercontent.com/69841466/148640175-a5969e90-8570-45b9-9d0a-8b4e9c4cd6e8.png)






