/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_BACKEND_DATA?: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
