# Admin Panel Easyreserv Business

Admin panel pentru gestionarea platformei Easyreserv B2B.

## Arhitectura Proiectului

Acest admin panel face parte dintr-un ecosistem compus din 3 aplicații:

### 1. Backend API
- **Locație**: `C:\Users\ishun\website-backend-easyreserv-b2b`
- **Port**: `7500`
- **URL Local**: `http://localhost:7500`
- **URL Producție**: `https://business.easyreserv.io/api`

### 2. Frontend Website (Public)
- **Locație**: `C:\Users\ishun\Easyreserv-Website-B2B`
- **Port**: `7510`
- **URL Local**: `http://localhost:7510`
- **URL Producție**: `https://business.easyreserv.io`

### 3. Admin Panel (acest proiect)
- **Locație**: `C:\Users\ishun\Admin-Panel-EasyreservB2B-V29_01-1`
- **Port Dezvoltare**: `7520`
- **URL Local**: `http://localhost:7520/admin`
- **URL Producție**: `https://business.easyreserv.io/admin`
- **Backend API**: Conectare la `http://localhost:7500`
- **Bază rută**: `/admin` (configurat în VITE_APP_BASE_NAME)

## Configurare Locală

### Cerințe
- Node.js v16+
- npm sau yarn
- Backend rulând pe portul 7500

### Instalare
```bash
npm install
```

### Rulare Dezvoltare
```bash
npm start
```

Aplicația va porni pe `http://localhost:7520/admin`

### Build Producție
```bash
npm run build
```

## Note Importante

- Admin Panel-ul este configurat să ruleze pe portul **7520** pentru a fi în whitelist-ul CORS al backend-ului
- Backend-ul rulează pe portul **7500** și acceptă request-uri de la porturile 7510 (frontend) și 7520 (admin)
- În producție, admin panel-ul este accesibil la ruta `/admin` pe domeniul `business.easyreserv.io`
- Toate rutele din admin panel sunt relative la `/admin` (de exemplu: `/admin/dashboard`, `/admin/users`, etc.)
- `VITE_APP_BASE_NAME` este setat la `/admin` pentru a asigura rutarea corectă în producție
