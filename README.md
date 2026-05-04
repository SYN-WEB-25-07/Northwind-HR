# Northwind HR Analytics

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-24.0-blue?logo=docker)](https://www.docker.com/)

Interne HR‑Analyseplattform für die Personalabteilung von Northwind Industries. Historische Mitarbeiterdaten systematisch auswerten – ohne direkte Arbeit mit Rohdaten.

---

## 🔌 API‑Endpunkte

| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| `GET` | `/health` | Server‑Status und DB‑Konnektivität |
| `GET` | `/api/employees` | Paginierte Mitarbeiterliste (`?page=&limit=`), optionaler Filter `?dept=Development` |
| `GET` | `/api/employees/:id` | Detailansicht eines Mitarbeiters inkl. aktuellem Gehalt, Titel, Abteilung |
| `GET` | `/api/reports/headcount` | Anzahl aktueller Mitarbeiter pro Abteilung |
| `GET` | `/api/reports/salary-distribution` | Verteilung der aktuellen Gehälter in Bändern `<50k`, `50k-70k`, `70k-90k`, `>90k` |

Alle Antworten sind JSON. Paginierte Endpunkte liefern zusätzlich Metadaten (`page`, `limit`, `total`, `pages`).

---

## 🧱 Technologie‑Stack

| Bereich | Technologie |
|--------|-------------|
| **Backend** | Node.js, Express 4, TypeScript |
| **Datenbank** | PostgreSQL 15 (offizielles Docker‑Image) |
| **ORM / DB‑Zugriff** | `pg` (node-postgres), reines SQL |
| **Monorepo‑Verwaltung** | npm Workspaces |
| **Containerisierung** | Docker, Docker Compose |
| **Datenimport** | Automatisch via `docker-entrypoint-initdb.d` |
| **Linting / Formatting** | Vorbereitet für ESLint + Prettier (optional) |

---

## 📁 Projektstruktur

\`\`\`
Northwind-HR/
├── docker-compose.yml            # Container‑Orchestrierung
├── package.json                  # Root‑Workspace‑Definition
├── .env                          # Umgebungsvariablen (DB‑Credentials, Ports)
├── db/
│   └── init/                     # SQL‑Dateien für die Erstinitialisierung (Dump wird durch Nutzer ergänzt)
├── packages/
│   ├── backend/                  # Express‑Server
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── server.ts         # Express‑App + Middleware
│   │       ├── db.ts             # PostgreSQL‑Pool
│   │       └── routes/
│   │           ├── employees.ts  # Mitarbeiter‑Routen mit Pagination
│   │           └── reports.ts    # Analytics‑Routen (Headcount, Gehaltsverteilung)
│   └── shared/                   # Geteilte TypeScript‑Typen
│       ├── package.json
│       └── src/
│           └── types.ts          # Employee, HeadCountRow, SalaryDistRow
└── README.md
\`\`\`

---

## 🧪 Entwicklung & weitere Befehle

- **Backend lokal entwickeln (ohne Docker)**  
  Voraussetzung: PostgreSQL läuft unter `DB_HOST=localhost`.  
  \`\`\`bash
  npm install
  npm run dev -w @northwind/backend
  \`\`\`

- **Docker‑Container stoppen**
  \`\`\`bash
  docker compose down
  \`\`\`

- **Datenbank zurücksetzen und neu importieren**
  \`\`\`bash
  docker compose down -v
  docker compose up -d
  \`\`\`