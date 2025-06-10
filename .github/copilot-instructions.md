# Copilot Instructions

## 🛠️ Technologies & bibliothèques

- **Framework** : SvelteKit
- **Composants UI** : shadcn-svelte (<https://next.shadcn-svelte.com/>)
- **CSS** : Tailwind CSS
- **Authentification** : better-auth
- **ORM** : Drizzle ORM (TypeScript)
- **Langage** : TypeScript
- **Linting** : ESLint
- **Tests** : Vitest

## 🚀 Scripts & commandes NPM

| Commande                   | Description                               |
| -------------------------- | ------------------------------------------|
| `npm run dev`              | Serveur de développement                  |
| `npm run build`            | Build de production                       |
| `npm run lint`             | Exécution d’ESLint pour vérification      |
| `npm run lint:fix`         | Correction automatique des erreurs ESLint |
| `npm run test`             | Lancement des tests                       |
| `npm run drizzle:generate` | Génération des migrations Drizzle         |
| `npm run drizzle:migrate`  | Exécution des migrations Drizzle          |
| `npm run drizzle:push`     | Pousser les migrations vers la DB         |
| `npm run drizzle:studio`   | Lancer l’interface de gestion Drizzle     |

## 🔐 Variables d’environnement

| Variable               | Description                                  | Exemple                                                                                                                            |
| ---------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`             | Environnement d’exécution                    | `development` ou `production`                                                                                                      |
| `DB_FILE_NAME`         | Nom du fichier de base de données locale     | `file:local.db`                                                                                                                    |
| `BETTER_AUTH_SECRET`   | Secret pour l’authentification               | `2CkaCJzsj1GlurdV0Ps5AraemQJrtv3a`                                                                                                 |
| `BETTER_AUTH_URL`      | URL de l’API d’authentification              | `http://localhost:3000`                                                                                                            |
| `GITHUB_CLIENT_ID`     | ID client pour l’authentification GitHub     | `Oga24lF25daDAknez2265`                                                                                                            |
| `GITHUB_CLIENT_SECRET` | Secret client pour l’authentification GitHub | `a63b2ae27af010d7a8cb9faf726dcccc38edb092b169a419dab4459b9504fdd1ee88a1d0f96b42bcac18084823beace6feae9e1f2f7ed1c20e72dae3c6a8a155` |

## 🧪 Tests & qualité

- **Framework de test** : Vitest
- **Coverage minimal** : 80%
- **Lint CI** : Le pipeline échoue si `npm run lint` renvoie une erreur

## 📂 Structure du projet

Voici l’architecture principale du projet, avec une description de chaque dossier/fichier clé :

TODO