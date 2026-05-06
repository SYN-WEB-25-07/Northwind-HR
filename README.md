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

- **`docker-compose.yml`** – Docker Compose Konfiguration
- **`Dockerfile`** – Build-Kontext für Railway & lokalen Build
- **`package.json`** – Root-Workspace & Skripte
- **`.env`** – Umgebungsvariablen (DB-Credentials)
- **`db/init/01-dummy-data.sql`** – 50 Beispiel-Mitarbeiter (lokal)
- **`docs/`** – Postman-Dokumentation
- **`packages/backend/`** – Express-Server
  - `server.ts` – Express-App & Middleware
  - `db.ts` – PostgreSQL-Verbindungspool
  - `routes/employees.ts` – Routen für Mitarbeiter & Top-Paid
  - `routes/reports.ts` – Routen für Headcount, Gehaltsverteilung etc.
- **`packages/shared/`** – Geteilte TypeScript-Typen
  - `types.ts` – Employee, HeadCountRow, SalaryDistRow



## 🧪 Entwicklung & weitere Befehle

- **Lokal mit Docker starten**
  docker compose up -d
  Beim ersten Start werden automatisch 50 Beispiel‑Mitarbeiter importiert.

- **Docker‑Container stoppen**
  docker compose down

- **Datenbank zurücksetzen und neu importieren**
  docker compose down -v
  docker compose up -d

- **Backend lokal entwickeln (ohne Docker)**
  Voraussetzung: PostgreSQL läuft unter `DB_HOST=localhost`.
  npm install
  npm run dev -w @northwind/backend
