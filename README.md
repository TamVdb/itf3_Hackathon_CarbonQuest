# Carbon Quest 🤖

Carbon Quest est un jeu éducatif de plates-formes qui vous invite à explorer les enjeux du Green IT, l’ensemble des pratiques visant à réduire l’impact environnemental des technologies numériques, de leur conception à leur utilisation.

🎯 But du jeu<br />
Votre mission est de grimper jusqu’au sommet de la canopée, tout en répondant correctement à un maximum de questions.

👾 Comment jouer ?<br />
* Utilisez les touches directionnelles et la barre d'espace pour vous déplacer vers le haut de la forêt.
* Rapprochez-vous des esprits de la forêt pour qu'ils vous posent leurs questions.
* Une fois au sommet, vous pourrez consulter vos réponses, voir vos erreurs, et en apprendre davantage sur le Green IT.

💪 Parviendrez-vous à répondre correctement à toutes les questions ?


## Visuals

![Imgur](https://tinyurl.com/bd2da62c)
![Imgur](https://tinyurl.com/yzjzudkw)
![Imgur](https://tinyurl.com/45rrddxc)
![Imgur](https://tinyurl.com/2yemrhrp)

## Installation backendNode
### Backend
Installer les dépendances
```
npm i
```

Créer une base de données `carbonquest` avec MongoDB et une collection `users`

Créer un fichier .env avec les variables suivantes
```
MONGODB_CONNECTION_STRING=MONGODB_CONNECTION_STRING="mongodb://localhost/carbonquest"
API_URL="http://localhost:5173"
``` 

Lancer le serveur
```
npm run dev
```

### Frontend
Installer les dépendances
```
npm i
```

Créer un fichier .env avec la variable suivante
```
VITE_API_URL="http://localhost:3001/"
``` 

Lancer le serveur
```
npm run dev
```

### Tester le jeu
👩‍💻 Enregistrer un nouvel utilisateur <br />
🔓 Se connecter <br />
🎮 Jouer

## Installation backendPHP
### Backend
Installer la base de données en suivant les instructions du fichier `info.md` du dossier `/backend`

Lancer le serveur
```
php -S localhost:8000
```


### Frontend
Installer les dépendances
```
npm i
```

Lancer le serveur
```
npm run dev
```

## Tester le jeu
👩‍💻 Pseudo : User <br />
🔒 Mot de passe : password

 ## Dépendances
* Axios
* React Icons
* React Router Dom
* React Unity Webgl
* Zod
* React Hook Form
* Tailwind
* Vite
* Express
* MongoDB
* Mongoose
* Nodemon
* Dotenv
* Cors