# Luckiest Project — catálogo de vinos

Sitio estático hecho con [Astro](https://astro.build). Solo muestra vinos, sin carrito ni pedidos.

## Cómo correrlo en tu compu

Necesitás **Node.js 22.12 o más nuevo** ([descargar](https://nodejs.org)).

```bash
npm install      # la primera vez
npm run dev      # abre el sitio en http://localhost:4321
```

Otros comandos:

- `npm run build`: genera el sitio final en la carpeta `dist/`.
- `npm run preview`: muestra ese sitio final en tu compu.

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| Vinos, precios, bodegas y fecha de precios | `src/data/vinos.json` |
| Frase del inicio, texto de "Nosotros", Instagram | `src/data/sitio.json` |
| Fotos de las botellas | `public/vinos/` |
| Colores y tipografías | `src/styles/global.css` (arriba de todo, en `:root`) |

Los textos que empiezan con `TODO` se ven en gris e itálica en el sitio. Así sabés qué falta completar. Cuando los reemplazás por el texto real, se ven normales.

## Cómo cambiar un precio

1. Abrí `src/data/vinos.json`.
2. Buscá el vino por su nombre.
3. Cambiá `"precio": null` por el número, **sin puntos, sin signo $ y sin comillas**:

   ```json
   "precio": 45000
   ```

   En el sitio se va a ver como **$ 45.000**. Si lo dejás en `null`, aparece "Precio a confirmar".
4. Actualizá la fecha, arriba de todo en el mismo archivo:

   ```json
   "preciosActualizadosAl": "27/09/2026",
   ```

## Cómo agregar un vino

En `src/data/vinos.json`, dentro de `"vinos": [ ... ]`, copiá un bloque existente y pegalo donde quieras que aparezca (el orden del archivo es el orden en la página). Poné una coma entre bloques:

```json
{
  "slug": "bressia-monteagrelo-2021",
  "nombre": "Monteagrelo",
  "bodega": "bressia",
  "cepa": "Malbec",
  "anio": 2021,
  "precio": null,
  "descripcion": "TODO: descripción del vino.",
  "notasDeCata": "TODO: notas de cata (vista, nariz, boca).",
  "maridaje": "TODO: con qué platos acompañarlo."
}
```

- **slug**: el nombre para la dirección web (`/vinos/bressia-monteagrelo-2021`). Usá minúsculas, sin tildes ni espacios (con guiones), y que no se repita. También es el nombre de la foto.
- **bodega**: tiene que ser uno de estos: `catena-zapata`, `luca`, `bressia` (o una bodega nueva que agregues, ver abajo).
- **cepa**: si no la sabés todavía, dejala vacía (`""`) y no se muestra.
- **anio**: el número del año, o `null` si no aplica.

Si te equivocás en un slug repetido o en una bodega, `npm run build` te avisa con un error que dice qué vino es.

**Nueva bodega:** agregala en `"bodegas"` con un `id` (sin tildes ni espacios), su `nombre` y la `seccion`:

- `"recomendados"`: aparece dentro de Recomendados.
- `"bodega"`: tiene su propia sección y su propio link en el menú.

## Cómo cargar una foto

1. Prepará la foto en **formato vertical 3:4** (por ejemplo, 900 × 1200 px) y en formato **.webp**. Para convertirla podés usar [squoosh.app](https://squoosh.app), que es gratis y funciona en el navegador.
2. Nombrala exactamente igual que el **slug** del vino: `conjuro.webp`, `primus-malbec-2020.webp`, etc.
3. Guardala en la carpeta `public/vinos/`.

Listo: en ese vino, la foto reemplaza sola a la botella dibujada, tanto en la tarjeta como en su ficha. Mientras estés con `npm run dev`, puede que tengas que recargar la página.

## Cómo publicarlo en Vercel (gratis)

1. **Subí el proyecto a GitHub.** Este repositorio ya está en GitHub, así que en ese caso no tenés que hacer nada.
2. Entrá a [vercel.com](https://vercel.com) y creá una cuenta con **"Continue with GitHub"**. El plan *Hobby* es gratis.
3. Tocá **Add New… → Project**.
4. Buscá el repositorio `luckiest-project-web` y tocá **Import**. Si no aparece, tocá "Adjust GitHub App Permissions" y dale acceso.
5. Vercel detecta Astro solo. Revisá que diga:
   - Framework Preset: **Astro**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Tocá **Deploy**. En uno o dos minutos te da una dirección del tipo `luckiest-project-web.vercel.app`.
7. **Desde ahí, cada cambio que subas a la rama principal de GitHub se publica solo**: precios, vinos nuevos o fotos.

**Dominio propio (opcional):** en Vercel, andá a tu proyecto → **Settings → Domains**, agregá tu dominio y seguí las instrucciones para configurar el DNS donde lo compraste (por ejemplo, NIC Argentina).

## Estructura del proyecto

```
src/
  data/vinos.json        ← vinos, bodegas y fecha de precios
  data/sitio.json        ← textos generales
  pages/index.astro      ← página de inicio
  pages/vinos/[slug].astro ← ficha de cada vino
  components/            ← tarjeta, nav, footer, placeholder de botella…
  styles/global.css      ← colores y estilos generales
public/vinos/            ← fotos {slug}.webp
```
