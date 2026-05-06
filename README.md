# Northwind HR Analytics

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-24.0-blue?logo=docker)](https://www.docker.com/)
[![Railway](https://img.shields.io/badge/Railway-Deployed-purple?logo=railway)](https://railway.app)

Interne HR‑Analyseplattform für die Personalabteilung von Northwind Industries.  
Historische Mitarbeiterdaten systematisch auswerten – ohne direkte Arbeit mit Rohdaten.

## 🚀 Live‑Demo

Die API ist live erreichbar unter:  
**https://northwind-hr-production.up.railway.app**

## 📘 API‑Dokumentation (Postman)

Importiere die [Postman Collection](docs/Northwind-HR-API.postman_collection.json) in Postman, um alle Endpunkte interaktiv zu testen.  
Die Collection enthält bereits die Live‑URL als Umgebungsvariable.

## 🔌 API‑Endpunkte

| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| `GET` | `/health` | Server‑Status und DB‑Konnektivität |
| `GET` | `/api/employees` | Paginierte Mitarbeiterliste (`?page=&limit=`), optionaler Filter `?dept=Development` |
| `GET` | `/api/employees/:id` | Detailansicht eines Mitarbeiters inkl. aktuellem Gehalt, Titel, Abteilung |
| `GET` | `/api/employees/top-paid` | Top 10 der bestbezahlten aktuellen Mitarbeiter |
| `GET` | `/api/reports/headcount` | Anzahl aktueller Mitarbeiter pro Abteilung |
| `GET` | `/api/reports/salary-distribution` | Verteilung der aktuellen Gehälter in Bändern `<50k`, `50k-70k`, `70k-90k`, `>90k` |
| `GET` | `/api/reports/gender-distribution` | Geschlechterverteilung im Unternehmen |
| `GET` | `/api/reports/department-salary-avg` | Durchschnittsgehalt pro Abteilung |

Alle Antworten sind JSON. Paginierte Endpunkte liefern zusätzlich Metadaten (`page`, `limit`, `total`, `pages`).

## 🧱 Technologie‑Stack

| Bereich | Technologie |
|--------|-------------|
| **Backend** | Node.js, Express 4, TypeScript |
| **Datenbank** | PostgreSQL 15 (offizielles Docker‑Image) |
| **ORM / DB‑Zugriff** | `pg` (node-postgres), reines SQL |
| **Monorepo‑Verwaltung** | npm Workspaces |
| **Containerisierung** | Docker, Docker Compose |
| **Datenimport** | Automatisch via `docker-entrypoint-initdb.d` (nur lokal) |
| **Deployment** | Railway (Backend + Postgres) |

## 📁 Projektstruktur

\`\`\`
Northwind-HR/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── .env
├── db/
│   └── init/
│       └── 01-dummy-data.sql      # Lokales Init‑Skript (50 Mitarbeiter)
├── docs/
│   └── Northwind-HR-API.postman_collection.json
├── packages/
│   ├── backend/
│   │   ├── Dockerfile (optional, für lokales Bauen)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── server.ts
│   │       ├── db.ts
│   │       └── routes/
│   │           ├── employees.ts
│   │           └── reports.ts
│   └── shared/
│       ├── package.json
│       └── src/
│           └── types.ts
└── README.md
\`\`\`

## 🧪 Entwicklung & weitere Befehle

- **Lokal mit Docker starten**
  \`\`\`bash
  docker compose up -d
  \`\`\`
  Beim ersten Start werden automatisch 50 Beispiel‑Mitarbeiter importiert.

- **Docker‑Container stoppen**
  \`\`\`bash
  docker compose down
  \`\`\`

- **Datenbank zurücksetzen und neu importieren**
  \`\`\`bash
  docker compose down -v
  docker compose up -d
  \`\`\`

- **Backend lokal entwickeln (ohne Docker)**
  Voraussetzung: PostgreSQL läuft unter `DB_HOST=localhost`.
  \`\`\`bash
  npm install
  npm run dev -w @northwind/backend
  \`\`\`

## 📝 Lizenz

Dieses Projekt ist unter der MIT‑Lizenz veröffentlicht.  
Der verwendete Employees‑Datensatz (h8/employees-database) steht unter der [Creative Commons Attribution-Share Alike 3.0](http://creativecommons.org/licenses/by-sa/3.0/)-Lizenz.
