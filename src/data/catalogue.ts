import type { Lang } from '../i18n/ui';
import type { UiKey } from '../i18n/ui';

export type Localized = Record<Lang, string>;
export const pick = (value: string | Localized, lang: Lang): string =>
  typeof value === 'string' ? value : value[lang];

export interface Option {
  id: string;
  label: string | Localized;
  /** Difference from the base price, in cents. May be negative. */
  addCents: number;
  /** Value shown in the specification table when this option is selected. */
  spec?: string | Localized;
}

export interface SpecRow {
  label: UiKey;
  value: string | Localized;
}

export type Glyph = 'mini' | 'miniCompact' | 'miniNetwork';

export interface Product {
  slug: string;
  /** Brand and model names are not translated. */
  name: string;
  sku: string;
  category: string | Localized;
  tagline: Localized;
  basePriceCents: number;
  /** Units on the shelf; 0 means built to order. */
  stock: number;
  glyph: Glyph;
  /** Highlighted on the product card, three rows. */
  summary: { label: UiKey; value: string }[];
  specs: SpecRow[];
  options: {
    ram: Option[];
    ssd: Option[];
    os: Option[];
  };
}

export const products: Product[] = [
  {
    slug: 'minisforum-ai-x1-pro',
    name: 'Minisforum AI X1 Pro',
    sku: 'CPD-X1P',
    category: 'Mini PC',
    tagline: {
      it: 'Workstation compatta da 1,2 litri con Ryzen AI 9 HX 370. Assemblata, aggiornata nel firmware e collaudata 48 ore prima della spedizione.',
      en: 'A 1.2-litre compact workstation built on the Ryzen AI 9 HX 370. Assembled, firmware-updated and burn-in tested for 48 hours before it ships.',
    },
    basePriceCents: 129900,
    stock: 6,
    glyph: 'mini',
    summary: [
      { label: 'spec.cpu', value: 'Ryzen AI 9 HX 370' },
      { label: 'spec.ram', value: '32 GB DDR5-5600' },
      { label: 'spec.ssd', value: '1 TB NVMe Gen4' },
    ],
    specs: [
      { label: 'spec.cpu', value: 'AMD Ryzen AI 9 HX 370' },
      { label: 'spec.gpu', value: 'Radeon 890M' },
      { label: 'spec.net', value: '2,5 GbE + Wi-Fi 7' },
      { label: 'spec.ports', value: '2×USB4 · 4×USB-A · 2×HDMI' },
      { label: 'spec.size', value: '[DIMENSIONI] · [PESO]' },
    ],
    options: {
      ram: [
        { id: '16', label: '16 GB', addCents: -12000, spec: '16 GB DDR5-5600 (2×8)' },
        { id: '32', label: '32 GB', addCents: 0, spec: '32 GB DDR5-5600 (2×16)' },
        { id: '64', label: '64 GB', addCents: 21000, spec: '64 GB DDR5-5600 (2×32)' },
      ],
      ssd: [
        { id: '512', label: '512 GB', addCents: -9000, spec: '512 GB NVMe Gen4' },
        { id: '1000', label: '1 TB', addCents: 0, spec: '1 TB NVMe Gen4' },
        { id: '2000', label: '2 TB', addCents: 13000, spec: '2 TB NVMe Gen4' },
      ],
      os: [
        { id: 'none', label: { it: 'Nessuno', en: 'None' }, addCents: 0, spec: { it: 'Nessuno', en: 'None' } },
        { id: 'win', label: 'Windows 11 Pro', addCents: 14500, spec: 'Windows 11 Pro' },
        { id: 'linux', label: 'Ubuntu LTS', addCents: 0, spec: 'Ubuntu 24.04 LTS' },
      ],
    },
  },
  {
    slug: 'minisforum-ai-x1',
    name: 'Minisforum AI X1',
    sku: 'CPD-X1',
    category: 'Mini PC',
    tagline: {
      it: 'Lo stesso telaio del Pro con un processore più sobrio: la scelta giusta per postazioni d’ufficio silenziose e ordinate.',
      en: 'The same chassis as the Pro with a calmer processor: the right pick for quiet, tidy office desks.',
    },
    basePriceCents: 94900,
    stock: 11,
    glyph: 'miniCompact',
    summary: [
      { label: 'spec.cpu', value: 'Ryzen AI 9 365' },
      { label: 'spec.ram', value: '16 GB DDR5-5600' },
      { label: 'spec.ssd', value: '512 GB NVMe Gen4' },
    ],
    specs: [
      { label: 'spec.cpu', value: 'AMD Ryzen AI 9 365' },
      { label: 'spec.gpu', value: 'Radeon 880M' },
      { label: 'spec.net', value: '2,5 GbE + Wi-Fi 7' },
      { label: 'spec.ports', value: '2×USB4 · 4×USB-A · 2×HDMI' },
      { label: 'spec.size', value: '[DIMENSIONI] · [PESO]' },
    ],
    options: {
      ram: [
        { id: '16', label: '16 GB', addCents: 0, spec: '16 GB DDR5-5600 (2×8)' },
        { id: '32', label: '32 GB', addCents: 11000, spec: '32 GB DDR5-5600 (2×16)' },
        { id: '64', label: '64 GB', addCents: 30000, spec: '64 GB DDR5-5600 (2×32)' },
      ],
      ssd: [
        { id: '512', label: '512 GB', addCents: 0, spec: '512 GB NVMe Gen4' },
        { id: '1000', label: '1 TB', addCents: 8000, spec: '1 TB NVMe Gen4' },
        { id: '2000', label: '2 TB', addCents: 20000, spec: '2 TB NVMe Gen4' },
      ],
      os: [
        { id: 'none', label: { it: 'Nessuno', en: 'None' }, addCents: 0, spec: { it: 'Nessuno', en: 'None' } },
        { id: 'win', label: 'Windows 11 Pro', addCents: 14500, spec: 'Windows 11 Pro' },
        { id: 'linux', label: 'Ubuntu LTS', addCents: 0, spec: 'Ubuntu 24.04 LTS' },
      ],
    },
  },
  {
    slug: 'minisforum-ms-01',
    name: 'Minisforum MS-01',
    sku: 'CPD-MS01',
    category: { it: 'Mini PC · 10 GbE', en: 'Mini PC · 10 GbE' },
    tagline: {
      it: 'Due porte 10 GbE SFP+ in un telaio da scrivania: il nodo giusto per un homelab serio o per un piccolo cluster di virtualizzazione.',
      en: 'Two 10 GbE SFP+ ports in a desktop chassis: the right node for a serious homelab or a small virtualisation cluster.',
    },
    basePriceCents: 114900,
    stock: 3,
    glyph: 'miniNetwork',
    summary: [
      { label: 'spec.cpu', value: 'Core i9-13900H' },
      { label: 'spec.net', value: '2×10GbE SFP+' },
      { label: 'spec.ram', value: '64 GB DDR5' },
    ],
    specs: [
      { label: 'spec.cpu', value: 'Intel Core i9-13900H' },
      { label: 'spec.gpu', value: 'Iris Xe' },
      { label: 'spec.net', value: '2×10GbE SFP+ · 2×2,5 GbE' },
      { label: 'spec.ports', value: '1×USB4 · 3×USB-A · HDMI · DP' },
      { label: 'spec.size', value: '[DIMENSIONI] · [PESO]' },
    ],
    options: {
      ram: [
        { id: '32', label: '32 GB', addCents: -16000, spec: '32 GB DDR5-5200 (2×16)' },
        { id: '64', label: '64 GB', addCents: 0, spec: '64 GB DDR5-5200 (2×32)' },
        { id: '96', label: '96 GB', addCents: 24000, spec: '96 GB DDR5-5200 (2×48)' },
      ],
      ssd: [
        { id: '1000', label: '1 TB', addCents: 0, spec: '1 TB NVMe Gen4' },
        { id: '2000', label: '2 TB', addCents: 13000, spec: '2 TB NVMe Gen4' },
        { id: '4000', label: '4 TB', addCents: 34000, spec: '4 TB NVMe Gen4' },
      ],
      os: [
        { id: 'none', label: { it: 'Nessuno', en: 'None' }, addCents: 0, spec: { it: 'Nessuno', en: 'None' } },
        { id: 'proxmox', label: 'Proxmox VE', addCents: 0, spec: 'Proxmox VE 8' },
        { id: 'win', label: 'Windows 11 Pro', addCents: 14500, spec: 'Windows 11 Pro' },
      ],
    },
  },
];

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const optionById = (list: Option[], id: string): Option =>
  list.find((o) => o.id === id) ?? list[0]!;

/** Net price of a product with the given option ids, in cents. */
export function configuredPriceCents(
  product: Product,
  choice: { ram: string; ssd: string; os: string },
): number {
  return (
    product.basePriceCents +
    optionById(product.options.ram, choice.ram).addCents +
    optionById(product.options.ssd, choice.ssd).addCents +
    optionById(product.options.os, choice.os).addCents
  );
}

export function configuredSku(
  product: Product,
  choice: { ram: string; ssd: string; os: string },
): string {
  return [product.sku, choice.ram, choice.ssd, choice.os.toUpperCase()].join('-');
}

export const defaultChoice = (product: Product) => ({
  ram: product.options.ram.find((o) => o.addCents === 0)?.id ?? product.options.ram[0]!.id,
  ssd: product.options.ssd.find((o) => o.addCents === 0)?.id ?? product.options.ssd[0]!.id,
  os: product.options.os[0]!.id,
});

/* ------------------------------------------------------------------ servers */

export interface ServerBuild {
  id: string;
  name: Localized;
  tag: Localized;
  units: string;
  fromCents: number;
  title: Localized;
  blurb: Localized;
  rows: SpecRow[];
}

export const serverBuilds: ServerBuild[] = [
  {
    id: 'virt',
    name: { it: 'Virtualizzazione', en: 'Virtualisation' },
    tag: { it: 'Proxmox, VMware, Hyper-V', en: 'Proxmox, VMware, Hyper-V' },
    units: '2U',
    fromCents: 450000,
    title: { it: 'Nodo di virtualizzazione', en: 'Virtualisation node' },
    blurb: {
      it: 'Pensato per far girare venti o trenta macchine virtuali con margine: molti core, tanta RAM ECC e storage NVMe ridondato.',
      en: 'Built to run twenty or thirty virtual machines with headroom: plenty of cores, ECC memory and redundant NVMe storage.',
    },
    rows: [
      { label: 'spec.cpu', value: 'AMD EPYC 9354 (32c)' },
      { label: 'spec.ram', value: '256 GB DDR5 ECC' },
      { label: 'spec.ssd', value: '8×3,84 TB NVMe U.2' },
      { label: 'spec.raid', value: 'ZFS mirror + spare' },
      { label: 'spec.net', value: '2×25 GbE + IPMI' },
      { label: 'spec.power', value: { it: '2×800 W ridondati', en: '2×800 W redundant' } },
    ],
  },
  {
    id: 'storage',
    name: { it: 'Storage', en: 'Storage' },
    tag: { it: 'NAS, archivi, video', en: 'NAS, archives, video' },
    units: '4U',
    fromCents: 720000,
    title: { it: 'Nodo di archiviazione', en: 'Storage node' },
    blurb: {
      it: 'Capacità prima di tutto: ventiquattro slot da 3,5 pollici, cache NVMe e controller HBA in IT mode per ZFS o TrueNAS.',
      en: 'Capacity first: twenty-four 3.5-inch bays, NVMe cache and an HBA in IT mode for ZFS or TrueNAS.',
    },
    rows: [
      { label: 'spec.cpu', value: 'AMD EPYC 9124 (16c)' },
      { label: 'spec.ram', value: '512 GB DDR5 ECC' },
      { label: 'spec.drives', value: '24×22 TB SAS' },
      { label: 'spec.cache', value: '2×1,6 TB NVMe' },
      { label: 'spec.hba', value: 'SAS3 IT mode' },
      { label: 'spec.net', value: '2×25 GbE + IPMI' },
    ],
  },
  {
    id: 'backup',
    name: { it: 'Backup', en: 'Backup' },
    tag: { it: 'Veeam, PBS, immutabile', en: 'Veeam, PBS, immutable' },
    units: '2U',
    fromCents: 540000,
    title: { it: 'Target di backup', en: 'Backup target' },
    blurb: {
      it: 'Destinazione di backup con snapshot immutabili e rete separata dalla produzione, per resistere anche a un ransomware in casa.',
      en: 'A backup destination with immutable snapshots on a network separated from production, so it survives ransomware on the main estate.',
    },
    rows: [
      { label: 'spec.cpu', value: 'AMD EPYC 8224P (24c)' },
      { label: 'spec.ram', value: '128 GB DDR5 ECC' },
      { label: 'spec.drives', value: '12×18 TB SAS' },
      { label: 'spec.immutability', value: 'ZFS snapshot lock' },
      { label: 'spec.net', value: '2×10 GbE + IPMI' },
      { label: 'spec.power', value: { it: '2×800 W ridondati', en: '2×800 W redundant' } },
    ],
  },
  {
    id: 'edge',
    name: { it: 'Edge e firewall', en: 'Edge and firewall' },
    tag: { it: 'pfSense, OPNsense, VPN', en: 'pfSense, OPNsense, VPN' },
    units: '1U',
    fromCents: 189000,
    title: { it: 'Nodo di frontiera', en: 'Edge node' },
    blurb: {
      it: 'Poco profondo, silenzioso e con tante porte: sta in un rack da ufficio e regge firewall, VPN e routing senza scaldare.',
      en: 'Shallow, quiet and port-dense: it fits an office rack and handles firewall, VPN and routing without running hot.',
    },
    rows: [
      { label: 'spec.cpu', value: 'Intel Xeon E-2478 (8c)' },
      { label: 'spec.ram', value: '64 GB DDR5 ECC' },
      { label: 'spec.ssd', value: '2×960 GB NVMe' },
      { label: 'spec.net', value: '4×10 GbE SFP+ · 2×2,5 GbE' },
      { label: 'spec.depth', value: '430 mm' },
      { label: 'spec.power', value: { it: '2×500 W ridondati', en: '2×500 W redundant' } },
    ],
  },
];
