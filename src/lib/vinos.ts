import fs from 'node:fs';
import path from 'node:path';
import datos from '../data/vinos.json';

export type Bodega = {
  id: string;
  nombre: string;
  seccion: 'recomendados' | 'bodega';
};

export type Vino = {
  slug: string;
  nombre: string;
  bodega: string;
  cepa: string;
  anio: number | null;
  precio: number | null;
  descripcion: string;
  notasDeCata: string;
  maridaje: string;
};

export const bodegas = datos.bodegas as Bodega[];
export const vinos = datos.vinos as Vino[];
export const preciosActualizadosAl: string = datos.preciosActualizadosAl;

export const bodegasRecomendadas = bodegas.filter((b) => b.seccion === 'recomendados');
export const bodegasPropias = bodegas.filter((b) => b.seccion !== 'recomendados');

export function vinosDe(bodegaId: string): Vino[] {
  return vinos.filter((v) => v.bodega === bodegaId);
}

export function nombreBodega(bodegaId: string): string {
  return bodegas.find((b) => b.id === bodegaId)?.nombre ?? bodegaId;
}

/** 45000 -> "$ 45.000"; null -> "Precio a confirmar" */
export function formatearPrecio(precio: number | null | undefined): string {
  if (precio === null || precio === undefined || Number.isNaN(Number(precio))) {
    return 'Precio a confirmar';
  }
  const entero = Math.round(Number(precio)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `$ ${entero}`;
}

/** Devuelve "/vinos/{slug}.webp" si la foto existe en /public, o null para usar el placeholder. */
export function fotoDe(slug: string): string | null {
  const archivo = path.join(process.cwd(), 'public', 'vinos', `${slug}.webp`);
  return fs.existsSync(archivo) ? `/vinos/${slug}.webp` : null;
}

/** Los textos que empiezan con "TODO" se muestran atenuados como placeholder. */
export function esPlaceholder(texto: string | null | undefined): boolean {
  return !texto || texto.trim().toUpperCase().startsWith('TODO');
}

// Validación en build: evita slugs repetidos o bodegas mal escritas.
const vistos = new Set<string>();
for (const v of vinos) {
  if (vistos.has(v.slug)) throw new Error(`[vinos.json] slug repetido: "${v.slug}"`);
  vistos.add(v.slug);
  if (!bodegas.some((b) => b.id === v.bodega)) {
    throw new Error(`[vinos.json] el vino "${v.slug}" tiene una bodega inexistente: "${v.bodega}"`);
  }
}
