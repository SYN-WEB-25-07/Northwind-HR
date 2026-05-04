#!/bin/bash
set -e

echo "Entpacke und restore employees custom dump..."

gunzip -c /docker-entrypoint-initdb.d/employees.sql.gz | pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --no-owner --role="$POSTGRES_USER"

echo "Restore abgeschlossen."
