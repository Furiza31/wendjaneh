# Copilot Instructions

## 🛠️ Technologies & bibliothèques

- [Drizzle ORM](https://orm.drizzle.team/docs/overview)
- [SvelteKit Superforms](https://superforms.rocks/get-started/zod4)
- [Zod v4 Documentation](https://zod.dev/v4)
- [shadcn-svelte Components](https://www.shadcn-svelte.com/docs/components)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs/introduction)
- [better-auth Documentation](https://www.better-auth.com/docs/introduction)
- [pnpm Documentation](https://pnpm.io/)
- [Vitest Documentation](https://vitest.dev/guide/)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🚀 Scripts & commandes NPM

| Commande               | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `pnpm run dev`         | Serveur de développement                                          |
| `pnpm run build`       | Build de production                                               |
| `pnpm run lint`        | Exécution d’ESLint pour vérification                              |
| `pnpm run lint:fix`    | Correction automatique des erreurs ESLint                         |
| `pnpm run test`        | Lancement des tests                                               |
| `pnpm run check`       | Vérification de la configuration SvelteKit et TypeScript          |
| `pnpm run check:watch` | Vérification continue de la configuration SvelteKit et TypeScript |
| `pnpm run prepare`     | Préparation de Husky pour les hooks Git                           |
| `pnpm run preview`     | Prévisualisation de la build de production                        |
| `pnpm run db:migrate`  | Exécution des migrations Drizzle                                  |
| `pnpm run db:generate` | Génération des migrations Drizzle                                 |
| `pnpm run db:studio`   | Lancer l’interface de gestion Drizzle                             |
| `pnpm run test:unit`   | Exécution des tests unitaires avec Vitest                         |
| `pnpm run test`        | Exécution des tests unitaires avec Vitest en mode continu         |

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
- **Lint CI** : Le pipeline échoue si `pnpm run lint` renvoie une erreur, assurez-vous de corriger les erreurs avant de soumettre une PR via `pnpm run lint:fix`.

## 📂 Structure du projet

Voici l’architecture principale du projet, avec une description de chaque dossier/fichier clé :

### 🏗️ Racine du projet `./`

### 📁 Dossier `./src/`

#### **Routes (`./src/routes/`)**
Structure basée sur le système de routage file-based de SvelteKit :

| Route                    | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `+layout.svelte`         | Layout principal avec styles globaux                 |
| `+page.svelte`           | Page d'accueil publique                             |
| `page.svelte.test.ts`    | Tests unitaires pour la page d'accueil              |
| `transition.svelte`      | Composant de transition entre les pages             |
| `auth/`                  | **Groupe de routes pour l'authentification**        |
| `├── login/`             | Page de connexion                                    |
| `├── register/`          | Page d'inscription (structure similaire à login)    |
| `└── error/`             | Page d'erreur d'authentification                    |
| `app/`                   | **Groupe de routes pour l'application protégée**    |

#### **Bibliothèque (`./src/lib/`)**

##### **Authentification (`./src/lib/auth/`)**
| Fichier                  | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `auth.ts`                | Configuration better-auth avec Drizzle et GitHub    |
| `auth-client.ts`         | Client better-auth pour le côté navigateur          |

##### **Base de données (`./src/lib/server/db/`)**
| Dossier/Fichier          | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `index.ts`               | Instance Drizzle configurée pour SQLite             |
| `schemas/`               | **Schémas de base de données**                      |
| `├── index.ts`           | Export centralisé des schémas                       |
| `└── auth.ts`            | Schémas pour l'authentification (users, sessions)   |
| `migrations/`            | **Migrations Drizzle générées automatiquement**     |

##### **Composants UI (`./src/lib/components/ui/`)**

##### **Hooks (`./src/lib/hooks/`)**

##### **Stores (`./src/lib/stores/`)**
