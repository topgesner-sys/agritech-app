# 🌿 AgriTech v2 — Gestión Agrícola Integral

Sistema completo de gestión agrícola: cosechas, trabajadores, liquidaciones, ganadería, créditos, presupuestos y más.

---

## 📁 Contenido de esta carpeta

```
agritech_app/
├── index.html        ← La aplicación completa (un solo archivo)
├── manifest.json     ← Configuración PWA (instalar como app)
├── sw.js             ← Service Worker (funciona offline)
├── icons/            ← Íconos de la app (agregar manualmente)
│   ├── icon-192.png
│   └── icon-512.png
├── .htaccess         ← Configuración para servidores Apache
├── nginx.conf        ← Configuración para servidores Nginx
└── README.md         ← Este archivo
```

---

## 🚀 Opciones de publicación

### Opción 1 — Uso directo (sin servidor)
Abre `index.html` directamente en el navegador. Funciona sin internet para todo excepto los gráficos Chart.js.

### Opción 2 — Servidor Apache (cPanel, Hostinger, etc.)
1. Sube todos los archivos a la carpeta `public_html` de tu hosting
2. El archivo `.htaccess` se aplica automáticamente
3. Accede desde tu dominio o IP

### Opción 3 — Servidor Nginx (VPS, Ubuntu)
```bash
# Instalar Nginx
sudo apt update && sudo apt install nginx

# Crear carpeta de la app
sudo mkdir -p /var/www/agritech

# Copiar archivos
sudo cp -r * /var/www/agritech/

# Configurar Nginx
sudo cp nginx.conf /etc/nginx/sites-available/agritech
sudo ln -s /etc/nginx/sites-available/agritech /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Opción 4 — Netlify (gratis, recomendado)
1. Entra a https://netlify.com y crea cuenta gratuita
2. Arrastra y suelta esta carpeta en el área de deploy
3. En segundos tienes URL pública tipo: `https://agritech-xxxxx.netlify.app`

### Opción 5 — GitHub Pages (gratis)
1. Crea repositorio en GitHub
2. Sube los archivos
3. Settings → Pages → Source: main branch
4. URL: `https://tu-usuario.github.io/agritech`

### Opción 6 — Vercel (gratis)
```bash
npm install -g vercel
vercel deploy
```

---

## 📱 Instalar como App (PWA)

### En iPhone/iPad (Safari):
1. Abre la URL en Safari
2. Toca el botón Compartir (□↑)
3. Selecciona "Agregar a pantalla de inicio"
4. La app aparece como ícono en tu pantalla

### En Android (Chrome):
1. Abre la URL en Chrome
2. Toca el menú (⋮) → "Agregar a pantalla de inicio"
3. O espera el banner automático de instalación

### En PC/Mac (Chrome o Edge):
1. Busca el ícono de instalación (⊕) en la barra de URL
2. Clic → "Instalar AgriTech"

---

## 🔧 Configuración de íconos

Para una instalación PWA completa, agrega íconos en la carpeta `icons/`:
- `icon-192.png` — 192×192 píxeles (PNG, fondo verde #1a3325)
- `icon-512.png` — 512×512 píxeles (PNG, fondo verde #1a3325)

Puedes generarlos en: https://realfavicongenerator.net

---

## 🔒 HTTPS (recomendado para producción)

Para activar alertas de sonido en iOS/Chrome moderno, el sitio debe servirse por HTTPS.

Certificado SSL gratuito con Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

---

## 💾 Datos y respaldo

Los datos se guardan en `localStorage` del navegador. Para hacer respaldo:
- Usa **Exportar → Todo CSV** dentro de la app
- Los datos persisten entre sesiones en el mismo dispositivo/navegador

---

## 📊 Módulos incluidos

| Módulo | Descripción |
|--------|-------------|
| 📊 Dashboard | Resumen general y KPIs |
| 🍓 Cosechas | Palta (kg + BINs) y Frutilla (1ra/2da) |
| 🧪 Insumos | Fertilizantes, pesticidas, herbicidas |
| 📦 Inventario | Stock y alertas de stock mínimo |
| 👷 Trabajadores | Personal con tarifas individuales |
| 🧾 Liquidaciones | Pagos por rango de fechas + impresión |
| 💰 Costos | Gastos categorizados |
| 🌦️ Clima | Registro meteorológico diario |
| 🐄 Animales | Ganado con especies personalizables |
| 💉 Sanidad | Vacunas y tratamientos veterinarios |
| 🐣 Reproducción | Gestaciones y partos |
| 📅 Calendario | Tareas y eventos agrícolas |
| 🔔 Alertas | Notificaciones con sonido |
| 🏦 Créditos | Créditos vs producción valorizada |
| 📋 Presupuesto | Planificación financiera por temporada |
| 📈 Análisis | Reportes avanzados y comparativos |
| 📤 Exportar | CSV y PDF imprimible |

---

## 🛠 Requisitos técnicos

- **Navegador**: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+
- **Servidor**: Cualquier servidor web estático (Apache, Nginx, Netlify, etc.)
- **Sin base de datos**: Los datos se almacenan localmente en el navegador
- **Sin backend**: Es una aplicación 100% del lado del cliente

---

**AgriTech v2 Pro** — Desarrollado con 🌿
