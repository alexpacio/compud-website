import type { Lang } from '../i18n/ui';
import type { UiKey } from '../i18n/ui';
import { href } from '../i18n/utils';

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

export type Glyph = 'mini' | 'miniCompact' | 'miniNetwork' | 'nas' | 'gpu' | 'laptop' | 'rack';

export type Section = 'miniPc' | 'nas' | 'gpu' | 'laptop' | 'server';

export interface ProductChoice {
  ram: string;
  ssd: string;
  os: string;
  gpu?: string;
  psu?: string;
  /** Drive bays and SATA ports, priced separately from the M.2 pair. */
  bay?: string;
}

export interface Product {
  slug: string;
  /** Which storefront section lists this product. Defaults to miniPc. */
  section?: Section;
  /** Brand and model names are not translated. */
  name: string;
  sku: string;
  category: string | Localized;
  tagline: Localized;
  basePriceCents: number;
  /** Units on the shelf; 0 means built to order. */
  stock: number;
  glyph: Glyph;
  /** Local product photos under /public; shown instead of the vector glyph. */
  images?: string[];
  /** Self-hosted MP4 under /public, shown on the product page. */
  video?: string;
  /** Short selling points shown above the spec table. */
  highlights?: Localized[];
  /** One or two paragraphs of editorial detail under the specs. */
  details?: Localized;
  /** Where the base specs/photos come from (shown as attribution). */
  sourceUrl?: string;
  /** Highlighted on the product card, three rows. */
  summary: SpecRow[];
  specs: SpecRow[];
  options: {
    ram: Option[];
    ssd: Option[];
    os: Option[];
    gpu?: Option[];
    psu?: Option[];
    bay?: Option[];
  };
}

export const products: Product[] = [
  {
    slug: 'compud-mini-ryzen-ai-9-hx-370',
    name: 'Compud Mini PC Ryzen AI 9 HX 370',
    sku: 'CPD-MINI-370',
    category: 'Mini PC',
    tagline: {
      it: 'Telaio compatto con Ryzen AI 9 HX 370 (12 core) e Radeon 890M: workstation da 1,2 litri con OCuLink per eGPU, doppio USB4 e 4 monitor.',
      en: 'A compact chassis with Ryzen AI 9 HX 370 (12 cores) and Radeon 890M: a 1.2-litre workstation with OCuLink for eGPUs, dual USB4 and 4 displays.',
    },
    basePriceCents: 129900,
    stock: 6,
    glyph: 'mini',
    images: [
      '/images/compud-mini-pc/01-front-34.png',
      '/images/compud-mini-pc/02-front-ports.png',
      '/images/compud-mini-pc/03-rear-io.png',
    ],
    highlights: [
      {
        it: 'Ryzen AI 9 HX 370 (12C/24T, fino a 5,1 GHz) + Radeon 890M: il più veloce dei nostri mini PC.',
        en: 'Ryzen AI 9 HX 370 (12C/24T, up to 5.1 GHz) + Radeon 890M: the fastest mini PC we build.',
      },
      {
        it: 'OCuLink PCIe 4.0 x4: colleghi una GPU esterna e giochi o renderizzi in 4K.',
        en: 'OCuLink PCIe 4.0 x4: attach an external GPU for 4K gaming or rendering.',
      },
      {
        it: 'Fino a 4 monitor 4K/8K via HDMI 2.1, DisplayPort 2.0 e 2× USB4 a 40 Gbps.',
        en: 'Up to 4 4K/8K displays via HDMI 2.1, DisplayPort 2.0 and 2× 40 Gbps USB4.',
      },
    ],
    details: {
      it: 'Stesso telaio compatto da 128×126×52 mm della versione Ryzen 7 255, ma con processore HX 370, NPU fino a 80 TOPS per i carichi AI locali e grafica Radeon 890M. Due slot M.2 2280 PCIe 4.0 (fino a 8 TB totali, RAID 0/1), DDR5 SODIMM fino a 64 GB, 2,5 GbE + Wi-Fi 7 e alimentazione anche via USB-C PD.',
      en: 'Same compact 128×126×52 mm chassis as the Ryzen 7 255 version, but with the HX 370 chip, an NPU up to 80 TOPS for on-device AI and Radeon 890M graphics. Two M.2 2280 PCIe 4.0 slots (up to 8 TB total, RAID 0/1), DDR5 SODIMM up to 64 GB, 2.5 GbE + Wi-Fi 7 and USB-C PD power input.',
    },
    summary: [
      { label: 'spec.cpu', value: 'Ryzen AI 9 HX 370' },
      { label: 'spec.ram', value: '32 GB DDR5-5600' },
      { label: 'spec.ssd', value: '1 TB NVMe Gen4' },
    ],
    specs: [
      { label: 'spec.cpu', value: 'AMD Ryzen AI 9 HX 370 · 12C/24T fino a 5,1 GHz · 36 MB cache' },
      { label: 'spec.gpu', value: 'AMD Radeon 890M (RDNA 3.5)' },
      { label: 'spec.ram', value: 'DDR5 SODIMM ×2 · 5600 MT/s · max 64 GB dual-channel' },
      { label: 'spec.ssd', value: '2× M.2 2280 NVMe PCIe 4.0 ×4 · fino a 4 TB/slot (8 TB max) · RAID 0/1' },
      { label: 'spec.display', value: 'HDMI 2.1 + DP 2.0 + 2× USB4 · fino a 4 monitor 4K/8K' },
      { label: 'spec.expand', value: 'OCuLink SFF-8611 PCIe 4.0 ×4 per eGPU/dock' },
      { label: 'spec.net', value: '2,5 GbE RJ45 + Wi-Fi 7 + Bluetooth 5.4' },
      { label: 'spec.ports', value: '2× USB4 40 Gbps · 2× USB-A 3.2 Gen2 · 1× USB-A 2.0 · 3,5 mm combo' },
      { label: 'spec.audio', value: '2× speaker integrati · 2× DMIC' },
      { label: 'spec.cooling', value: 'Doppia ventola + 2 heatpipe in rame · <45 dB · TDP fino a 65 W' },
      { label: 'spec.psu', value: 'DC 19 V 120 W + USB-C PD-in 65–100 W' },
      { label: 'spec.size', value: '128 × 126 × 52 mm · ~0,6 kg' },
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
        { id: 'compud', label: 'Compud Linux', addCents: 0, spec: 'Compud Linux · Fedora Atomic · KDE Plasma' },
      ],
    },
  },
  {
    slug: 'compud-mini-ryzen-7-255',
    name: 'Compud Mini PC Ryzen 7 255',
    sku: 'CPD-MINI-255',
    category: 'Mini PC',
    tagline: {
      it: 'Ryzen 7 255 (8 core/16 thread, fino a 4,9 GHz) con Radeon 780M in 128×126×52 mm: OCuLink per eGPU, doppio USB4 a 40 Gbps, 4 monitor e Wi-Fi 7. Lo assembliamo, aggiorniamo e collaudiamo 48 ore.',
      en: 'Ryzen 7 255 (8 cores/16 threads, up to 4.9 GHz) with Radeon 780M in 128×126×52 mm: OCuLink for eGPUs, dual 40 Gbps USB4, 4 displays and Wi-Fi 7. We assemble, update and burn-in test it for 48 hours.',
    },
    basePriceCents: 94900,
    stock: 11,
    glyph: 'miniCompact',
    images: [
      '/images/compud-mini-pc/01-front-34.png',
      '/images/compud-mini-pc/02-front-ports.png',
      '/images/compud-mini-pc/03-rear-io.png',
      '/images/compud-mini-pc/04-side-vent.png',
      '/images/compud-mini-pc/05-bottom.png',
    ],
    highlights: [
      {
        it: 'Ryzen 7 255 Zen 4 (8C/16T, fino a 4,9 GHz, 16 MB L3) + Radeon 780M: ufficio intensivo, editing leggero e gaming leggero in 4K.',
        en: 'Zen 4 Ryzen 7 255 (8C/16T, up to 4.9 GHz, 16 MB L3) + Radeon 780M: heavy office work, light editing and casual 4K gaming.',
      },
      {
        it: 'OCuLink PCIe 4.0 ×4 + 2× USB4 a 40 Gbps: colleghi eGPU, dock e storage veloce; ricarica/ingresso PD 65–100 W.',
        en: 'OCuLink PCIe 4.0 ×4 + 2× 40 Gbps USB4: attach eGPUs, docks and fast storage; 65–100 W PD in.',
      },
      {
        it: 'Fino a 4 monitor: HDMI 2.1, DisplayPort 2.0 e 2× USB4 (8K@60 / 4K@120). Doppio slot M.2 con RAID 0/1.',
        en: 'Up to 4 monitors: HDMI 2.1, DisplayPort 2.0 and 2× USB4 (8K@60 / 4K@120). Dual M.2 slots with RAID 0/1.',
      },
      {
        it: 'Freddo e silenzioso: doppia ventola, heatpipe in rame e materiali a cambiamento di fase (<45 dB).',
        en: 'Cool and quiet: dual fans, copper heat pipes and phase-change material (<45 dB).',
      },
    ],
    details: {
      it: 'È la versione Ryzen 7 255 dello stesso telaio compatto (a listino come barebone senza RAM/SSD): la base ideale per postazioni ordinate e silenziose. Monta due SODIMM DDR5-5600 (fino a 64 GB in dual-channel) e due M.2 2280 PCIe 4.0 da 4 TB l’uno, con RAID 0 per la velocità o RAID 1 per la sicurezza. Sul retro trovi 2,5 GbE, DP, HDMI, USB4, OCuLink e USB-A; sul fronte due USB-A 3.2, una USB4, jack combo e doppio microfono. Dentro ci sono anche due speaker. Si alimenta con l’alimentatore da 120 W in dotazione oppure via USB-C PD.',
      en: 'This is the Ryzen 7 255 version of the same compact chassis (listed as a barebone without RAM/SSD): the sweet spot for tidy, quiet desks. Two DDR5-5600 SODIMMs (up to 64 GB dual-channel) and two 4 TB PCIe 4.0 M.2 2280 slots, with RAID 0 for speed or RAID 1 for safety. On the back: 2.5 GbE, DP, HDMI, USB4, OCuLink and USB-A; on the front: two USB-A 3.2, one USB4, combo jack and dual mics. Two speakers inside. Powered by the bundled 120 W brick or via USB-C PD.',
    },
    summary: [
      { label: 'spec.cpu', value: 'Ryzen 7 255 · 8C/16T' },
      { label: 'spec.ram', value: '16 GB DDR5-5600' },
      { label: 'spec.ssd', value: '512 GB NVMe Gen4' },
    ],
    specs: [
      { label: 'spec.cpu', value: 'AMD Ryzen 7 255 · 8C/16T Zen 4 fino a 4,9 GHz · 16 MB L3 · 15–65 W' },
      { label: 'spec.gpu', value: 'AMD Radeon 780M (RDNA 3, 12 CU)' },
      { label: 'spec.ram', value: 'DDR5 SODIMM ×2 · 5600 MT/s · max 64 GB dual-channel' },
      { label: 'spec.ssd', value: '2× M.2 2280 NVMe PCIe 4.0 ×4 · fino a 4 TB/slot (8 TB max) · RAID 0/1' },
      { label: 'spec.display', value: 'HDMI 2.1 + DP 2.0 + 2× USB4 · 4 monitor fino a 8K@60 / 4K@120' },
      { label: 'spec.expand', value: 'OCuLink SFF-8611 PCIe 4.0 ×4 per eGPU/dock ad alte prestazioni' },
      { label: 'spec.net', value: '2,5 GbE RJ45 + Wi-Fi 7 + Bluetooth 5.4 (M.2 2230 E-key)' },
      { label: 'spec.ports', value: 'Frontali: 2× USB-A 3.2 Gen2, USB4 40 Gbps (PD-out 15 W), jack 3,5 mm · Posteriori: USB4 40 Gbps (PD-in 65–100 W), USB-A 2.0, DP, HDMI, OCuLink, LAN, DC-in' },
      { label: 'spec.audio', value: '2× speaker integrati · 2× DMIC · jack combo 3,5 mm' },
      { label: 'spec.cooling', value: 'Doppia ventola + 2 heatpipe in rame + phase-change · <45 dB' },
      { label: 'spec.psu', value: 'DC 19 V / 6,32 A 120 W in dotazione · in alternativa USB-C PD 65–100 W' },
      { label: 'spec.size', value: '128 × 126 × 52 mm · ~0,6 kg · Kensington + foro reset + CLR CMOS' },
    ],
    options: {
      ram: [
        { id: '16', label: '16 GB', addCents: 0, spec: '16 GB DDR5-5600 (2×8)' },
        { id: '32', label: '32 GB', addCents: 15000, spec: '32 GB DDR5-5600 (2×16)' },
        { id: '64', label: '64 GB', addCents: 45000, spec: '64 GB DDR5-5600 (2×32)' },
      ],
      ssd: [
        { id: '512', label: '512 GB', addCents: 0, spec: '512 GB NVMe Gen4' },
        { id: '1000', label: '1 TB', addCents: 3000, spec: '1 TB NVMe Gen4' },
        { id: '2000', label: '2 TB', addCents: 10000, spec: '2 TB NVMe Gen4' },
        { id: '4000', label: '4 TB', addCents: 30000, spec: '4 TB NVMe Gen4' },
      ],
      os: [
        { id: 'compud', label: 'Compud Linux', addCents: 0, spec: 'Compud Linux · Fedora Atomic · KDE Plasma' },
      ],
    },
  },
  {
    slug: 'compud-mini-core-i9-13900h',
    name: 'Compud Mini PC Core i9-13900H',
    sku: 'CPD-MINI-I9',
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
        { id: 'compud', label: 'Compud Linux', addCents: 0, spec: 'Compud Linux · Fedora Atomic · KDE Plasma' },
      ],
    },
  },
  {
    slug: 'compud-nas-5-ryzen-7-255',
    section: 'nas',
    name: 'Compud NAS 5 Ryzen 7 255',
    sku: 'CPD-NAS-5',
    category: { it: 'NAS desktop · 5 vani', en: 'Desktop NAS · 5 bays' },
    tagline: {
      it: 'NAS da scrivania a 5 vani con Ryzen 7 255, 10 GbE + 5 GbE, OCuLink e slot PCIe: fino a 174 TB tra HDD e NVMe. Lo prepariamo con i tuoi dischi, RAID e snapshot già configurati.',
      en: 'A 5-bay desktop NAS with Ryzen 7 255, 10 GbE + 5 GbE, OCuLink and a PCIe slot: up to 174 TB across HDDs and NVMe. We ship it with your drives, RAID and snapshots already configured.',
    },
    basePriceCents: 74900,
    stock: 4,
    glyph: 'nas',
    images: [
      '/images/compud-nas-5/01-hero-34.png',
      '/images/compud-nas-5/02-open-bays.png',
      '/images/compud-nas-5/03-front.png',
      '/images/compud-nas-5/04-rear-34.png',
      '/images/compud-nas-5/05-rear-ports.png',
    ],
    highlights: [
      {
        it: '5 vani SATA (fino a 150 TB) + 3 slot M.2 NVMe/U.2 (fino a 24 TB): cache veloce e archivio capiente nello stesso box.',
        en: '5 SATA bays (up to 150 TB) + 3 M.2 NVMe/U.2 slots (up to 24 TB): fast cache and deep archive in one box.',
      },
      {
        it: 'Rete 10 GbE + 5 GbE con aggregation (fino a 15 Gbit/s): saturi il cavo anche con più client insieme.',
        en: '10 GbE + 5 GbE networking with aggregation (up to 15 Gbit/s): saturate the wire even with several clients.',
      },
      {
        it: 'OCuLink PCIe 4.0 ×4 + slot PCIe x16 + 2× USB4: eGPU, schede 10 GbE aggiuntive o array SSD cache.',
        en: 'OCuLink PCIe 4.0 ×4 + PCIe x16 slot + 2× USB4: eGPUs, extra 10 GbE cards or SSD cache arrays.',
      },
      {
        it: 'Ryzen 7 255 (8C/16T) con Radeon 780M e fino a 96 GB di DDR5: Docker, VM e transcodifica senza affanno.',
        en: 'Ryzen 7 255 (8C/16T) with Radeon 780M and up to 96 GB DDR5: Docker, VMs and transcoding without breaking a sweat.',
      },
    ],
    details: {
      it: 'È la versione compatta e leggera del NAS a 5 vani: stesso concetto del modello maggiore (telaio compatto da 199×202×252 mm con scheda estraibile per RAM e SSD) in una scocca più leggera da 4 kg. A bordo trovi SSD di sistema da 64 GB con Compud Linux preinstallato, due SODIMM DDR5-5600 (fino a 96 GB, non ECC) e supporto ZFS con snapshot, RAID 0/1/5/6 e RAIDZ. Dietro: 10 GbE, 5 GbE, OCuLink, HDMI 2.1, USB4, USB-A 3.2 e 2.0; davanti: USB4 e USB-A. I dischi HDD/SSD li montiamo noi su richiesta, con burn-in e filesystem già pronti.',
      en: 'This is the light, compact take on the 5-bay NAS: the same concept as its bigger sibling (a compact 199×202×252 mm chassis with a slide-out board for RAM and SSDs) in a lighter 4 kg shell. On board: a 64 GB system SSD with Compud Linux preinstalled, two DDR5-5600 SODIMMs (up to 96 GB, non-ECC) and ZFS with snapshots, RAID 0/1/5/6 and RAIDZ. On the back: 10 GbE, 5 GbE, OCuLink, HDMI 2.1, USB4, USB-A 3.2 and 2.0; on the front: USB4 and USB-A. We fit HDD/SSD drives on request, burned in with the filesystem ready to go.',
    },
    summary: [
      { label: 'spec.cpu', value: 'Ryzen 7 255 · 8C/16T' },
      { label: 'spec.bays', value: '5× SATA + 3× M.2' },
      { label: 'spec.net', value: '10 GbE + 5 GbE' },
    ],
    specs: [
      { label: 'spec.cpu', value: 'AMD Ryzen 7 255 · 8C/16T Zen 4 fino a 4,9 GHz · 45–55 W' },
      { label: 'spec.gpu', value: 'AMD Radeon 780M · HDMI 2.1 4K/8K' },
      { label: 'spec.ram', value: 'DDR5 SODIMM ×2 · 5600 MT/s · max 96 GB (non ECC)' },
      { label: 'spec.bays', value: '5× SATA 3,5″/2,5″ (fino a 5×30 TB = 150 TB) · RAID 0/1/5/6/RAIDZ' },
      { label: 'spec.ssd', value: '3× M.2 NVMe/U.2 (fino a 3×8 TB = 24 TB) · SSD sistema 64 GB incluso' },
      { label: 'spec.net', value: '10 GbE + 5 GbE RJ45 con aggregation (fino a 15 Gbit/s)' },
      { label: 'spec.expand', value: 'OCuLink PCIe 4.0 ×4 · slot PCIe x16 (×4 elettrici) · 2× USB4 40 Gbps' },
      { label: 'spec.ports', value: 'HDMI 2.1 · USB-A 3.2 Gen2 ×2 · USB-A 2.0 · USB4 ×2 · OCuLink' },
      { label: 'spec.system', value: 'Compud Linux preinstallato · snapshot ZFS · Docker · foto AI · accesso remoto' },
      { label: 'spec.cooling', value: 'Ventola posteriore + flusso frontale · scocca con scheda estraibile' },
      { label: 'spec.psu', value: 'Alimentatore esterno in dotazione' },
      { label: 'spec.size', value: '199 × 202 × 252 mm · 4 kg' },
    ],
    options: {
      ram: [
        { id: '16', label: '16 GB', addCents: 0, spec: '16 GB DDR5-5600 (2×8)' },
        { id: '32', label: '32 GB', addCents: 12000, spec: '32 GB DDR5-5600 (2×16)' },
        { id: '64', label: '64 GB', addCents: 30000, spec: '64 GB DDR5-5600 (2×32)' },
        { id: '96', label: '96 GB', addCents: 60000, spec: '96 GB DDR5-5600 (2×48)' },
      ],
      ssd: [
        { id: 'sys', label: { it: 'Solo SSD sistema 64 GB', en: '64 GB system SSD only' }, addCents: 0, spec: 'SSD sistema 64 GB (slot 1)' },
        { id: '1000', label: { it: '+1 TB NVMe cache', en: '+1 TB NVMe cache' }, addCents: 9000, spec: '64 GB sistema + 1 TB NVMe cache' },
        { id: '2000', label: { it: '+2 TB NVMe cache', en: '+2 TB NVMe cache' }, addCents: 19000, spec: '64 GB sistema + 2 TB NVMe cache' },
        { id: '4000', label: { it: '+4 TB NVMe cache', en: '+4 TB NVMe cache' }, addCents: 39000, spec: '64 GB sistema + 4 TB NVMe cache' },
      ],
      os: [
        { id: 'compud', label: 'Compud Linux', addCents: 0, spec: 'Compud Linux · Fedora Atomic · KDE Plasma' },
      ],
    },
  },
  /* ------------------------------------------------------------ GPU usate */
  {
    slug: 'zotac-rtx3070-blower-8gb',
    section: 'gpu',
    name: 'Zotac RTX 3070 Blower 8GB',
    sku: 'CPD-G3070B',
    category: { it: 'GPU usata · gaming / workstation', en: 'Used GPU · gaming / workstation' },
    tagline: {
      it: 'Ampere con raffreddamento blower: butta il calore fuori dal case. Perfetta per case compatti, rack e multi-GPU. Testata, pasta termica nuova, 1 ora di stress test con log.',
      en: 'Ampere with a blower cooler: exhausts heat straight out of the case. Ideal for compact cases, racks and multi-GPU builds. Tested, fresh thermal paste, 1-hour stress test with log.',
    },
    basePriceCents: 24000,
    stock: 1,
    glyph: 'gpu',
    highlights: [
      {
        it: 'GA104 (5888 CUDA, 8 GB GDDR6): gaming solido in 1440p e rendering con NVENC + DLSS.',
        en: 'GA104 (5888 CUDA cores, 8 GB GDDR6): solid 1440p gaming and rendering with NVENC + DLSS.',
      },
      {
        it: 'Blower a singolo slot di flusso: ideale dove le axial ricircolano aria calda (rack, case stretti, più schede vicine).',
        en: 'Single-fan blower: ideal where axial cards recirculate hot air (racks, tight cases, stacked cards).',
      },
    ],
    details: {
      it: 'Scheda usata in buone condizioni: smontata da workstation, pulita, pasta termica e pad nuovi, testata 1 ora sotto carico (FurMark + log temperature allegato). Garanzia Compud 12 mesi sul funzionamento.',
      en: 'Used card in good condition: pulled from a workstation, cleaned, new thermal paste and pads, 1-hour load tested (FurMark + temperature log included). 12-month Compud warranty on operation.',
    },
    summary: [
      { label: 'spec.gpu', value: 'RTX 3070 · 8 GB' },
      { label: 'spec.vram', value: '8 GB GDDR6' },
      { label: 'spec.condition', value: { it: 'Usata · 1 pz', en: 'Used · 1 unit' } },
    ],
    specs: [
      { label: 'spec.chip', value: 'NVIDIA GA104 · 5888 CUDA · boost ~1725 MHz' },
      { label: 'spec.vram', value: '8 GB GDDR6 · 256 bit · 14 Gbps' },
      { label: 'spec.outputs', value: '3× DisplayPort 1.4a + 1× HDMI 2.1' },
      {
        label: 'spec.cooling',
        value: { it: 'Blower radiale: scarico posteriore fuori dal case', en: 'Radial blower: rear exhaust out of the case' },
      },
      { label: 'spec.tdp', value: { it: '220 W · 2× 8-pin PCIe · PSU 650 W consigliato', en: '220 W · 2× 8-pin PCIe · 650 W PSU recommended' } },
      {
        label: 'spec.expand',
        value: { it: 'PCIe 4.0 ×16 · 2 slot · NVENC/NVDEC, DLSS, ray tracing', en: 'PCIe 4.0 ×16 · 2 slots · NVENC/NVDEC, DLSS, ray tracing' },
      },
      {
        label: 'spec.condition',
        value: {
          it: 'Usata · testata 1 h + stress · pasta termica nuova · garanzia 12 mesi',
          en: 'Used · 1 h stress test · new thermal paste · 12-month warranty',
        },
      },
    ],
    options: {
      ram: [{ id: 'unit', label: { it: 'Pezzo unico', en: 'Single unit' }, addCents: 0, spec: { it: 'Pezzo unico', en: 'Single unit' } }],
      ssd: [{ id: 'tested', label: { it: 'Testata + stress test', en: 'Tested + stress test' }, addCents: 0, spec: { it: 'Testata + stress test', en: 'Tested + stress test' } }],
      os: [
        { id: 'bare', label: { it: 'Solo scheda', en: 'Card only' }, addCents: 0, spec: { it: 'Solo scheda', en: 'Card only' } },
      ],
    },
  },
  {
    slug: 'rtx2080-8gb-usata',
    section: 'gpu',
    name: 'NVIDIA RTX 2080 8GB',
    sku: 'CPD-G2080',
    category: { it: 'GPU usata · gaming 1440p', en: 'Used GPU · 1440p gaming' },
    tagline: {
      it: 'Turing con 8 GB GDDR6: ancora oggi ottima in 1080p/1440p con DLSS. Usata, testata con stress test e pasta termica nuova.',
      en: 'Turing with 8 GB GDDR6: still great at 1080p/1440p with DLSS. Used, stress-tested with fresh thermal paste.',
    },
    basePriceCents: 17900,
    stock: 1,
    glyph: 'gpu',
    highlights: [
      {
        it: 'TU104 (2944 CUDA, 8 GB GDDR6): prestazioni tra RTX 3060 e 3070 nei titoli con DLSS.',
        en: 'TU104 (2944 CUDA cores, 8 GB GDDR6): between RTX 3060 and 3070 in DLSS titles.',
      },
      {
        it: 'NVENC Turing: streaming e registrazione con impatto minimo sui frame.',
        en: 'Turing NVENC: streaming and recording with minimal frame cost.',
      },
    ],
    details: {
      it: 'Scheda usata in buone condizioni: pulita, pasta termica nuova, 1 ora di stress test con log temperature. Garanzia Compud 12 mesi sul funzionamento.',
      en: 'Used card in good condition: cleaned, fresh thermal paste, 1-hour stress test with temperature log. 12-month Compud warranty on operation.',
    },
    summary: [
      { label: 'spec.gpu', value: 'RTX 2080 · 8 GB' },
      { label: 'spec.vram', value: '8 GB GDDR6' },
      { label: 'spec.condition', value: { it: 'Usata · 1 pz', en: 'Used · 1 unit' } },
    ],
    specs: [
      { label: 'spec.chip', value: 'NVIDIA TU104 · 2944 CUDA · boost ~1710 MHz' },
      { label: 'spec.vram', value: '8 GB GDDR6 · 256 bit · 14 Gbps' },
      { label: 'spec.outputs', value: { it: '3× DisplayPort 1.4 + 1× HDMI 2.0b (+ USB-C su FE)', en: '3× DisplayPort 1.4 + 1× HDMI 2.0b (+ USB-C on FE)' } },
      {
        label: 'spec.cooling',
        value: { it: 'Dissipatore ad aria (axial/blower secondo disponibilità)', en: 'Air cooler (axial/blower subject to availability)' },
      },
      {
        label: 'spec.tdp',
        value: { it: '~215 W · 2× 8-pin (o 6+8-pin) · PSU 650 W consigliato', en: '~215 W · 2× 8-pin (or 6+8-pin) · 650 W PSU recommended' },
      },
      { label: 'spec.expand', value: 'PCIe 3.0 ×16 · NVENC, DLSS, ray tracing' },
      {
        label: 'spec.condition',
        value: {
          it: 'Usata · testata 1 h + stress · pasta termica nuova · garanzia 12 mesi',
          en: 'Used · 1 h stress test · new thermal paste · 12-month warranty',
        },
      },
    ],
    options: {
      ram: [{ id: 'unit', label: { it: 'Pezzo unico', en: 'Single unit' }, addCents: 0, spec: { it: 'Pezzo unico', en: 'Single unit' } }],
      ssd: [{ id: 'tested', label: { it: 'Testata + stress test', en: 'Tested + stress test' }, addCents: 0, spec: { it: 'Testata + stress test', en: 'Tested + stress test' } }],
      os: [
        { id: 'bare', label: { it: 'Solo scheda', en: 'Card only' }, addCents: 0, spec: { it: 'Solo scheda', en: 'Card only' } },
      ],
    },
  },
  {
    slug: 'gtx1060-6gb-usata',
    section: 'gpu',
    name: 'NVIDIA GTX 1060 6GB',
    sku: 'CPD-G10606',
    category: { it: 'GPU usata · budget 1080p', en: 'Used GPU · budget 1080p' },
    tagline: {
      it: 'Il classico da 1080p: 6 GB GDDR5, 120 W, va con quasi ogni alimentatore. Usata e testata, ideale per rigenerare un PC da ufficio.',
      en: 'The 1080p classic: 6 GB GDDR5, 120 W, runs on almost any PSU. Used and tested, ideal for reviving an office PC.',
    },
    basePriceCents: 6900,
    stock: 1,
    glyph: 'gpu',
    highlights: [
      {
        it: 'GP106 (1280 CUDA, 6 GB GDDR5): e-sport e AAA leggeri a 1080p senza pretese.',
        en: 'GP106 (1280 CUDA cores, 6 GB GDDR5): esports and light AAA at 1080p, no fuss.',
      },
      {
        it: 'Solo 120 W e 1× 6-pin: si monta anche su preassemblati con PSU modesti.',
        en: 'Only 120 W on a single 6-pin: fits prebuilts with modest PSUs too.',
      },
    ],
    details: {
      it: 'Scheda usata funzionante: pulita, pasta termica nuova, testata sotto carico. La scelta più economica per dare una seconda vita a un desktop. Garanzia Compud 12 mesi sul funzionamento.',
      en: 'Working used card: cleaned, fresh thermal paste, load-tested. The cheapest way to give a desktop a second life. 12-month Compud warranty on operation.',
    },
    summary: [
      { label: 'spec.gpu', value: 'GTX 1060 · 6 GB' },
      { label: 'spec.vram', value: '6 GB GDDR5' },
      { label: 'spec.condition', value: { it: 'Usata · 1 pz', en: 'Used · 1 unit' } },
    ],
    specs: [
      { label: 'spec.chip', value: 'NVIDIA GP106 · 1280 CUDA · boost ~1708 MHz' },
      { label: 'spec.vram', value: '6 GB GDDR5 · 192 bit · 8 Gbps' },
      { label: 'spec.outputs', value: { it: 'DisplayPort + HDMI + DVI (secondo modello)', en: 'DisplayPort + HDMI + DVI (depending on model)' } },
      { label: 'spec.cooling', value: { it: 'Dissipatore ad aria singola/doppia ventola', en: 'Single/dual-fan air cooler' } },
      { label: 'spec.tdp', value: { it: '120 W · 1× 6-pin PCIe · PSU 400 W consigliato', en: '120 W · 1× 6-pin PCIe · 400 W PSU recommended' } },
      { label: 'spec.expand', value: 'PCIe 3.0 ×16' },
      {
        label: 'spec.condition',
        value: {
          it: 'Usata · testata sotto carico · pasta termica nuova · garanzia 12 mesi',
          en: 'Used · load-tested · new thermal paste · 12-month warranty',
        },
      },
    ],
    options: {
      ram: [{ id: 'unit', label: { it: 'Pezzo unico', en: 'Single unit' }, addCents: 0, spec: { it: 'Pezzo unico', en: 'Single unit' } }],
      ssd: [{ id: 'tested', label: { it: 'Testata + stress test', en: 'Tested + stress test' }, addCents: 0, spec: { it: 'Testata + stress test', en: 'Tested + stress test' } }],
      os: [
        { id: 'bare', label: { it: 'Solo scheda', en: 'Card only' }, addCents: 0, spec: { it: 'Solo scheda', en: 'Card only' } },
      ],
    },
  },
  {
    slug: 'rx480-4gb-usata',
    section: 'gpu',
    name: 'AMD Radeon RX 480 4GB',
    sku: 'CPD-G4804',
    category: { it: 'GPU usata · entry 1080p', en: 'Used GPU · entry 1080p' },
    tagline: {
      it: 'Polaris da 4 GB per budget minimi: e-sport e retrogaming a 1080p. Usata, testata, prezzo da usato vero.',
      en: '4 GB Polaris for minimal budgets: esports and retro gaming at 1080p. Used, tested, at a true used price.',
    },
    basePriceCents: 5500,
    stock: 1,
    glyph: 'gpu',
    highlights: [
      {
        it: 'Ellesmere (2304 stream processor, 4 GB GDDR5): perfetta per e-sport, HTPC e muletti.',
        en: 'Ellesmere (2304 stream processors, 4 GB GDDR5): great for esports, HTPCs and spare rigs.',
      },
      {
        it: 'Driver AMD maturi e FreeSync: il massimo per spendere pochissimo.',
        en: 'Mature AMD drivers plus FreeSync: maximum value for minimum spend.',
      },
    ],
    details: {
      it: 'Scheda usata funzionante: pulita, pasta termica nuova, testata sotto carico. Ideale come scheda di scorta o per un PC secondario. Garanzia Compud 12 mesi sul funzionamento.',
      en: 'Working used card: cleaned, fresh thermal paste, load-tested. Ideal as a spare card or for a secondary PC. 12-month Compud warranty on operation.',
    },
    summary: [
      { label: 'spec.gpu', value: 'RX 480 · 4 GB' },
      { label: 'spec.vram', value: '4 GB GDDR5' },
      { label: 'spec.condition', value: { it: 'Usata · 1 pz', en: 'Used · 1 unit' } },
    ],
    specs: [
      { label: 'spec.chip', value: 'AMD Ellesmere (Polaris) · 2304 SP · boost ~1266 MHz' },
      { label: 'spec.vram', value: '4 GB GDDR5 · 256 bit · 7 Gbps' },
      { label: 'spec.outputs', value: { it: 'DisplayPort + HDMI + DVI (secondo modello)', en: 'DisplayPort + HDMI + DVI (depending on model)' } },
      { label: 'spec.cooling', value: { it: 'Dissipatore ad aria singola/doppia ventola', en: 'Single/dual-fan air cooler' } },
      { label: 'spec.tdp', value: { it: '150 W · 1× 6-pin PCIe · PSU 500 W consigliato', en: '150 W · 1× 6-pin PCIe · 500 W PSU recommended' } },
      { label: 'spec.expand', value: 'PCIe 3.0 ×16 · FreeSync' },
      {
        label: 'spec.condition',
        value: {
          it: 'Usata · testata sotto carico · pasta termica nuova · garanzia 12 mesi',
          en: 'Used · load-tested · new thermal paste · 12-month warranty',
        },
      },
    ],
    options: {
      ram: [{ id: 'unit', label: { it: 'Pezzo unico', en: 'Single unit' }, addCents: 0, spec: { it: 'Pezzo unico', en: 'Single unit' } }],
      ssd: [{ id: 'tested', label: { it: 'Testata + stress test', en: 'Tested + stress test' }, addCents: 0, spec: { it: 'Testata + stress test', en: 'Tested + stress test' } }],
      os: [
        { id: 'bare', label: { it: 'Solo scheda', en: 'Card only' }, addCents: 0, spec: { it: 'Solo scheda', en: 'Card only' } },
      ],
    },
  },
  {
    slug: 'sapphire-rx6800-16gb',
    section: 'gpu',
    name: 'Sapphire RX 6800 16GB',
    sku: 'CPD-G6800',
    category: { it: 'GPU usata · 1440p/4K 16 GB', en: 'Used GPU · 1440p/4K 16 GB' },
    tagline: {
      it: 'RDNA 2 con 16 GB di VRAM: tiene il 1440p ultra e regge il 4K. Sapphire Pulse, usata e testata con stress test e log.',
      en: 'RDNA 2 with 16 GB VRAM: holds ultra 1440p and handles 4K. Sapphire Pulse, used and tested with stress test and log.',
    },
    basePriceCents: 27900,
    stock: 1,
    glyph: 'gpu',
    highlights: [
      {
        it: 'Navi 21 XL (3840 SP, 16 GB GDDR6): sopra la RTX 3070 in raster a 1440p, con il doppio della VRAM.',
        en: 'Navi 21 XL (3840 SPs, 16 GB GDDR6): above the RTX 3070 in 1440p raster, with twice the VRAM.',
      },
      {
        it: 'Dissipatore Sapphire Dual-X: fresco e silenzioso anche sotto carico prolungato.',
        en: 'Sapphire Dual-X cooler: cool and quiet even under sustained load.',
      },
    ],
    details: {
      it: 'Scheda usata in ottime condizioni: pulita, pasta termica nuova, 1 ora di stress test con log temperature. 16 GB di VRAM la rendono ancora attuale per texture pesanti e modding. Garanzia Compud 12 mesi sul funzionamento.',
      en: 'Used card in great condition: cleaned, fresh thermal paste, 1-hour stress test with temperature log. 16 GB VRAM keeps it current for heavy textures and modding. 12-month Compud warranty on operation.',
    },
    summary: [
      { label: 'spec.gpu', value: 'RX 6800 · 16 GB' },
      { label: 'spec.vram', value: '16 GB GDDR6' },
      { label: 'spec.condition', value: { it: 'Usata · 1 pz', en: 'Used · 1 unit' } },
    ],
    specs: [
      { label: 'spec.chip', value: 'AMD Navi 21 XL (RDNA 2) · 3840 SP · boost ~2105 MHz' },
      { label: 'spec.vram', value: '16 GB GDDR6 · 256 bit · 16 Gbps · Infinity Cache 128 MB' },
      { label: 'spec.outputs', value: '3× DisplayPort 1.4 + 1× HDMI 2.1' },
      { label: 'spec.cooling', value: { it: 'Sapphire Dual-X doppia ventola (axial)', en: 'Sapphire Dual-X dual axial fans' } },
      { label: 'spec.tdp', value: { it: '250 W · 2× 8-pin PCIe · PSU 650 W consigliato', en: '250 W · 2× 8-pin PCIe · 650 W PSU recommended' } },
      { label: 'spec.expand', value: 'PCIe 4.0 ×16 · FreeSync, SAM/ReBAR' },
      {
        label: 'spec.condition',
        value: {
          it: 'Usata · testata 1 h + stress · pasta termica nuova · garanzia 12 mesi',
          en: 'Used · 1 h stress test · new thermal paste · 12-month warranty',
        },
      },
    ],
    options: {
      ram: [{ id: 'unit', label: { it: 'Pezzo unico', en: 'Single unit' }, addCents: 0, spec: { it: 'Pezzo unico', en: 'Single unit' } }],
      ssd: [{ id: 'tested', label: { it: 'Testata + stress test', en: 'Tested + stress test' }, addCents: 0, spec: { it: 'Testata + stress test', en: 'Tested + stress test' } }],
      os: [
        { id: 'bare', label: { it: 'Solo scheda', en: 'Card only' }, addCents: 0, spec: { it: 'Solo scheda', en: 'Card only' } },
      ],
    },
  },
  {
    slug: 'asrock-rx6800xt-16gb',
    section: 'gpu',
    name: 'ASRock RX 6800 XT 16GB',
    sku: 'CPD-G6800XT',
    category: { it: 'GPU usata · 4K 16 GB', en: 'Used GPU · 4K 16 GB' },
    tagline: {
      it: 'Il massimo RDNA 2 sotto la 6900 XT: 4K fluido con 16 GB di VRAM. ASRock, usata e testata con stress test e log.',
      en: 'The best of RDNA 2 below the 6900 XT: smooth 4K with 16 GB VRAM. ASRock, used and tested with stress test and log.',
    },
    basePriceCents: 31900,
    stock: 1,
    glyph: 'gpu',
    highlights: [
      {
        it: 'Navi 21 XT (4608 SP, 16 GB GDDR6): livello RTX 3080 in raster, con 6 GB di VRAM in più.',
        en: 'Navi 21 XT (4608 SPs, 16 GB GDDR6): RTX 3080-class raster with 6 GB more VRAM.',
      },
      {
        it: 'Tripla ventola ASRock: temperature sotto controllo anche in 4K prolungato.',
        en: 'ASRock triple-fan cooler: temperatures under control even in sustained 4K.',
      },
    ],
    details: {
      it: 'Scheda usata in ottime condizioni: pulita, pasta termica nuova, 1 ora di stress test con log temperature. Il top per chi vuole il 4K senza spendere da scheda nuova. Garanzia Compud 12 mesi sul funzionamento.',
      en: 'Used card in great condition: cleaned, fresh thermal paste, 1-hour stress test with temperature log. The top pick for 4K without new-card money. 12-month Compud warranty on operation.',
    },
    summary: [
      { label: 'spec.gpu', value: 'RX 6800 XT · 16 GB' },
      { label: 'spec.vram', value: '16 GB GDDR6' },
      { label: 'spec.condition', value: { it: 'Usata · 1 pz', en: 'Used · 1 unit' } },
    ],
    specs: [
      { label: 'spec.chip', value: 'AMD Navi 21 XT (RDNA 2) · 4608 SP · boost ~2250 MHz' },
      { label: 'spec.vram', value: '16 GB GDDR6 · 256 bit · 16 Gbps · Infinity Cache 128 MB' },
      {
        label: 'spec.outputs',
        value: { it: '3× DisplayPort 1.4 + 1× HDMI 2.1 (+ USB-C su Taichi)', en: '3× DisplayPort 1.4 + 1× HDMI 2.1 (+ USB-C on Taichi)' },
      },
      { label: 'spec.cooling', value: { it: 'ASRock tripla ventola (axial)', en: 'ASRock triple axial fans' } },
      { label: 'spec.tdp', value: { it: '300 W · 2× 8-pin PCIe · PSU 750 W consigliato', en: '300 W · 2× 8-pin PCIe · 750 W PSU recommended' } },
      { label: 'spec.expand', value: 'PCIe 4.0 ×16 · FreeSync, SAM/ReBAR' },
      {
        label: 'spec.condition',
        value: {
          it: 'Usata · testata 1 h + stress · pasta termica nuova · garanzia 12 mesi',
          en: 'Used · 1 h stress test · new thermal paste · 12-month warranty',
        },
      },
    ],
    options: {
      ram: [{ id: 'unit', label: { it: 'Pezzo unico', en: 'Single unit' }, addCents: 0, spec: { it: 'Pezzo unico', en: 'Single unit' } }],
      ssd: [{ id: 'tested', label: { it: 'Testata + stress test', en: 'Tested + stress test' }, addCents: 0, spec: { it: 'Testata + stress test', en: 'Tested + stress test' } }],
      os: [
        { id: 'bare', label: { it: 'Solo scheda', en: 'Card only' }, addCents: 0, spec: { it: 'Solo scheda', en: 'Card only' } },
      ],
    },
  },
  {
    slug: 'firepro-s7150-8gb',
    section: 'gpu',
    name: 'AMD FirePro S7150 8GB',
    sku: 'CPD-GS7150',
    category: { it: 'GPU server · virtualizzazione', en: 'Server GPU · virtualisation' },
    tagline: {
      it: 'GPU da server con MxGPU/SR-IOV: fino a 16 desktop virtuali per scheda. Passiva, single-slot, per homelab VDI e Proxmox.',
      en: 'Server GPU with MxGPU/SR-IOV: up to 16 virtual desktops per card. Passive, single-slot, for VDI homelabs and Proxmox.',
    },
    basePriceCents: 9900,
    stock: 1,
    glyph: 'gpu',
    highlights: [
      {
        it: 'Tonga (1792 SP, 8 GB GDDR5) con MxGPU hardware: virtualizzazione GPU vera, non solo passthrough.',
        en: 'Tonga (1792 SPs, 8 GB GDDR5) with hardware MxGPU: real GPU virtualisation, not just passthrough.',
      },
      {
        it: 'Passiva single-slot da 150 W: sta nei server 2P densi, con il flusso del rack a raffreddarla.',
        en: 'Passive 150 W single-slot: fits dense 2P servers, cooled by the rack airflow.',
      },
    ],
    details: {
      it: 'Scheda server usata, headless (nessuna uscita video: solo carichi di calcolo e desktop virtuali). Richiede case/rack con buon flusso d’aria perché il dissipatore è passivo. Testata sotto carico, garanzia Compud 12 mesi sul funzionamento.',
      en: 'Used server card, headless (no video outputs: compute and virtual desktops only). Needs a case/rack with good airflow as the heatsink is passive. Load-tested, 12-month Compud warranty on operation.',
    },
    summary: [
      { label: 'spec.gpu', value: 'FirePro S7150 · 8 GB' },
      { label: 'spec.vram', value: '8 GB GDDR5' },
      { label: 'spec.condition', value: { it: 'Usata · 1 pz', en: 'Used · 1 unit' } },
    ],
    specs: [
      {
        label: 'spec.chip',
        value: { it: 'AMD Tonga (GCN 3) · 1792 SP · MxGPU / SR-IOV fino a 16 vGPU', en: 'AMD Tonga (GCN 3) · 1792 SPs · MxGPU / SR-IOV up to 16 vGPUs' },
      },
      { label: 'spec.vram', value: '8 GB GDDR5 · 256 bit' },
      { label: 'spec.outputs', value: { it: 'Headless: nessuna uscita video (solo VDI/calcolo)', en: 'Headless: no video outputs (VDI/compute only)' } },
      {
        label: 'spec.cooling',
        value: { it: 'Passivo single-slot: richiede flusso d’aria da server/rack', en: 'Passive single-slot: needs server/rack airflow' },
      },
      { label: 'spec.tdp', value: { it: '150 W · 1× 8-pin PCIe · da slot + ausiliaria', en: '150 W · 1× 8-pin PCIe · slot + auxiliary power' } },
      { label: 'spec.expand', value: 'PCIe 3.0 ×16 · single-slot full-height' },
      {
        label: 'spec.condition',
        value: { it: 'Usata · testata sotto carico · garanzia 12 mesi', en: 'Used · load-tested · 12-month warranty' },
      },
    ],
    options: {
      ram: [{ id: 'unit', label: { it: 'Pezzo unico', en: 'Single unit' }, addCents: 0, spec: { it: 'Pezzo unico', en: 'Single unit' } }],
      ssd: [{ id: 'tested', label: { it: 'Testata + stress test', en: 'Tested + stress test' }, addCents: 0, spec: { it: 'Testata + stress test', en: 'Tested + stress test' } }],
      os: [
        { id: 'bare', label: { it: 'Solo scheda', en: 'Card only' }, addCents: 0, spec: { it: 'Solo scheda', en: 'Card only' } },
      ],
    },
  },
  /* ------------------------------------------------------------ Laptop */
  {
    slug: 'compud-laptop-16-h255',
    section: 'laptop',
    name: 'Compud Laptop 16 Ryzen 7 H255',
    sku: 'CPD-LAP-16',
    category: { it: 'Laptop 16" · ufficio/gaming', en: 'Laptop 16" · office/gaming' },
    tagline: {
      it: '16" IPS 16:10 con Ryzen 7 H255 (Zen 4, 8C/16T) e Radeon 780M: 24 GB LPDDR5, 512 GB NVMe, 1,8 kg. Lo assembliamo, aggiorniamo e collaudiamo 48 ore.',
      en: '16" IPS 16:10 with Ryzen 7 H255 (Zen 4, 8C/16T) and Radeon 780M: 24 GB LPDDR5, 512 GB NVMe, 1.8 kg. We assemble, update and burn-in test it for 48 hours.',
    },
    basePriceCents: 48279,
    stock: 6,
    glyph: 'laptop',
    images: [
      '/images/compud-laptop-16/laptop-01-frontale-cutout.webp',
      '/images/compud-laptop-16/laptop-03-frontale-tre-quarti-cutout.webp',
      '/images/compud-laptop-16/laptop-02-posteriore-alto-cutout.webp',
      '/images/compud-laptop-16/laptop-05-posteriore-cutout.webp',
      '/images/compud-laptop-16/laptop-04-laterale-cutout.webp',
      '/images/compud-laptop-16/laptop-06-tastiera-dall-alto-cutout.webp',
    ],
    highlights: [
      {
        it: 'Ryzen 7 H255 (8C/16T Zen 4, fino a 4,9 GHz) + Radeon 780M 12 CU: ufficio intenso, editing leggero e gaming 1080p.',
        en: 'Ryzen 7 H255 (8C/16T Zen 4, up to 4.9 GHz) + Radeon 780M 12 CU: heavy office, light editing and 1080p gaming.',
      },
      {
        it: 'Schermo 16" IPS 16:10 (1920×1200): il 18% di spazio verticale in più rispetto a un 15,6" 16:9.',
        en: '16" IPS 16:10 display (1920×1200): 18% more vertical space than a 15.6" 16:9.',
      },
      {
        it: '24 GB LPDDR5 non espandibile + slot M.2 2280 per SSD fino a 4 TB: spazio di archiviazione in più quando serve.',
        en: '24 GB LPDDR5 (not expandable) + M.2 2280 slot for up to 4 TB SSD: extra storage room when you need it.',
      },
    ],
    details: {
      it: 'Telaio in metallo da 356×244×17,4 mm per 1,8 kg: abbastanza sottile da viaggiare, abbastanza solido per l\'uso quotidiano. A bordo Wi-Fi 6, Bluetooth 5.2, doppia USB-C Gen 2 (PD-in + DP-out), 3× USB-A, HDMI 2.0, jack combo, TF e serratura. Batteria 54,7 Wh per 5–7 ore di autonomia; ricarica Type-C. Compud Linux preinstallato (Fedora Atomic con KDE Plasma), driver e firmware aggiornati alla release stabile, profilo ventole tarato. Tastiera QWERTY con layout italiano protetto; la cover italiana è inclusa nella confezione.',
      en: 'Metal chassis 356×244×17.4 mm at 1.8 kg: thin enough to travel, solid enough for daily use. Wi-Fi 6, Bluetooth 5.2, dual USB-C Gen 2 (PD-in + DP-out), 3× USB-A, HDMI 2.0, combo jack, TF and lock slot. 54.7 Wh battery for 5–7 hours; Type-C charging. Compud Linux preinstalled (Fedora Atomic with KDE Plasma), drivers and firmware on the stable release, fan profile tuned. QWERTY keyboard with an Italian cover included.',
    },
    summary: [
      { label: 'spec.cpu', value: 'Ryzen 7 H255 · 8C/16T' },
      { label: 'spec.ram', value: '24 GB LPDDR5' },
      { label: 'spec.ssd', value: '512 GB NVMe Gen3' },
    ],
    specs: [
      {
        label: 'spec.cpu',
        value: {
          it: 'AMD Ryzen 7 H255 · 8C/16T Zen 4 · 3,8–4,9 GHz · 16 MB L3 · TDP 45 W · TSMC 4 nm',
          en: 'AMD Ryzen 7 H255 · 8C/16T Zen 4 · 3.8–4.9 GHz · 16 MB L3 · 45 W TDP · TSMC 4 nm',
        },
      },
      { label: 'spec.gpu', value: 'AMD Radeon 780M (RDNA 3, 12 CU, 2600 MHz)' },
      { label: 'spec.ram', value: { it: '24 GB LPDDR5-6400 (12 GB×2) · non espandibile', en: '24 GB LPDDR5-6400 (12 GB×2) · not expandable' } },
      {
        label: 'spec.ssd',
        value: {
          it: '512 GB M.2 2280 NVMe PCIe 3.0 · slot M.2 2280 ×2 (fino a 4 TB)',
          en: '512 GB M.2 2280 NVMe PCIe 3.0 · 2× M.2 2280 slot (up to 4 TB)',
        },
      },
      { label: 'spec.display', value: '16" IPS 16:10 · 1920×1200 · 60 Hz · 250 nit · 45% sRGB' },
      { label: 'spec.weight', value: { it: '1,8 kg · 356,3 × 243,6 × 17,4 mm · metallo', en: '1.8 kg · 356.3 × 243.6 × 17.4 mm · metal' } },
      {
        label: 'spec.battery',
        value: {
          it: '54,7 Wh (11,4 V / 4800 mAh) · 5–7 h · ricarica Type-C 20 V/5 A',
          en: '54.7 Wh (11.4 V / 4800 mAh) · 5–7 h · Type-C charging 20 V/5 A',
        },
      },
      {
        label: 'spec.ports',
        value: {
          it: '2× USB-C Gen 2 (PD-in + DP 1.4) · 3× USB-A (2× 3.2, 1× 2.0) · HDMI 2.0 · jack 3,5 mm · TF · serratura',
          en: '2× USB-C Gen 2 (PD-in + DP 1.4) · 3× USB-A (2× 3.2, 1× 2.0) · HDMI 2.0 · 3.5 mm jack · TF · lock slot',
        },
      },
      {
        label: 'spec.net',
        value: {
          it: 'Wi-Fi 6 + Bluetooth 5.2 · webcam 1 MP (720p) con slider privacy',
          en: 'Wi-Fi 6 + Bluetooth 5.2 · 1 MP (720p) webcam with privacy slider',
        },
      },
      {
        label: 'spec.cooling',
        value: { it: 'Doppio raffreddamento · riduzione frequenza pari a zero sotto carico', en: 'Dual cooling · zero throttling under load' },
      },
      {
        label: 'spec.system',
        value: {
          it: 'Compud Linux · tastiera retroilluminata QWERTY · cover italiana inclusa',
          en: 'Compud Linux · backlit QWERTY keyboard · Italian cover included',
        },
      },
    ],
    options: {
      ram: [{ id: '24', label: '24 GB', addCents: 0, spec: '24 GB LPDDR5-6400 (12 GB×2)' }],
      ssd: [{ id: '512', label: '512 GB', addCents: 0, spec: '512 GB NVMe Gen3' }],
      os: [
        { id: 'compud', label: 'Compud Linux', addCents: 0, spec: 'Compud Linux · Fedora Atomic · KDE Plasma' },
      ],
    },
  },
  /* ------------------------------------------------------------ Server 3U */
  /*
   * Priced from Preventivo_RM32_EPYC4585PX_LambdaTek_Gemini1300C.xlsx (07/09/2026):
   * every figure below is the quoted net component cost times the 1.4 turnkey
   * multiplier. The base price is the leanest build that still boots — chassis,
   * board, CPU, cooling, rails, 32 GB ECC, an NVMe mirror and a single PSU —
   * so every drive bay, the GPU and PSU redundancy are priced as what they add.
   */
  {
    slug: 'compud-server-3u-epyc-4585px',
    section: 'server',
    name: 'Compud Server 3U EPYC 4585PX',
    sku: 'CPD-SRV-4585PX',
    category: { it: 'Server rack 3U · EPYC + GPU', en: '3U rack server · EPYC + GPU' },
    tagline: {
      it: 'Server 3U su SilverStone RM32 con EPYC 4585PX (16C/32T) e ASRock Rack B650D4U con IPMI. La base parte essenziale — 32 GB ECC e 2×1 TB NVMe in RAID1 — e da lì aggiungi RAM fino a 192 GB, dischi nei vani, GPU e alimentazione ridondante. Lo assembliamo, cabliamo e collaudiamo 48 ore.',
      en: 'A 3U server on the SilverStone RM32 with EPYC 4585PX (16C/32T) and an ASRock Rack B650D4U with IPMI. The base build is deliberately lean — 32 GB ECC and 2×1 TB NVMe in RAID1 — and from there you add memory up to 192 GB, drives in the bays, a GPU and redundant power. We assemble, cable and burn-in test it for 48 hours.',
    },
    basePriceCents: 546444,
    stock: 0,
    glyph: 'rack',
    video: '/assets/RM32.mp4',
    highlights: [
      {
        it: 'EPYC 4585PX (16C/32T Zen 5, fino a 5,7 GHz, 128 MB 3D V-Cache) su ASRock Rack B650D4U con IPMI dedicato e 2×2,5 GbE.',
        en: 'EPYC 4585PX (16C/32T Zen 5, up to 5.7 GHz, 128 MB 3D V-Cache) on the ASRock Rack B650D4U with dedicated IPMI and 2×2.5 GbE.',
      },
      {
        it: 'Base minima e onesta: telaio, scheda, CPU, raffreddamento, slitte, 32 GB ECC, 2×1 TB NVMe in RAID1 e un alimentatore. Niente che non usi.',
        en: 'An honest minimum: chassis, board, CPU, cooling, rails, 32 GB ECC, 2×1 TB NVMe in RAID1 and a single PSU. Nothing you are not going to use.',
      },
      {
        it: 'Configurabile fino a 192 GB ECC, 2×8 TB NVMe o coppie enterprise con PLP, 4 dischi SATA o 2×20 TB nei vani 3,5", GPU da 16 o 32 GB e alimentazione ridondante 1+1 hot-swap.',
        en: 'Configurable up to 192 GB ECC, 2×8 TB NVMe or enterprise pairs with PLP, 4 SATA drives or 2×20 TB in the 3.5" bays, a 16 or 32 GB GPU and 1+1 hot-swap redundant power.',
      },
    ],
    details: {
      it: 'Configurazione verificata componente per componente (disponibilità e compatibilità meccanica: dissipatore DeepCool AN600 da 67 mm sotto il limite RM32, riser PCIe 5.0 x16 incluso, slitte RMS09-20). Raffreddamento con 3×120 mm frontali e 2×60 mm posteriori ad alta portata. La scheda espone 2 slot M.2 2280 e 4 porte SATA: la coppia NVMe occupa gli M.2, i dischi nei vani usano le porte SATA, quindi le due scelte sono indipendenti. Prezzo chiavi in mano: assemblaggio, cablaggio ordinato, burn-in di 48 ore con log, garanzia 3 anni e fattura elettronica.',
      en: 'A configuration verified part by part (availability and mechanical fit: 67 mm DeepCool AN600 cooler under the RM32 limit, PCIe 5.0 x16 riser included, RMS09-20 rails). Cooling with 3×120 mm front intake and 2× high-airflow 60 mm rear fans. The board exposes 2 M.2 2280 slots and 4 SATA ports: the NVMe pair fills the M.2 slots and bay drives use the SATA ports, so the two choices are independent. Turnkey price: assembly, tidy cabling, 48-hour burn-in with log, 3-year warranty and e-invoicing.',
    },
    summary: [
      { label: 'spec.cpu', value: 'EPYC 4585PX · 16C/32T' },
      { label: 'spec.ram', value: '32 GB DDR5 ECC' },
      { label: 'spec.ssd', value: { it: '2×1 TB NVMe in RAID1', en: '2×1 TB NVMe in RAID1' } },
    ],
    specs: [
      {
        label: 'spec.cpu',
        value: {
          it: 'AMD EPYC 4585PX · 16C/32T Zen 5 · fino a 5,7 GHz · 128 MB 3D V-Cache · 170 W · AM5',
          en: 'AMD EPYC 4585PX · 16C/32T Zen 5 · up to 5.7 GHz · 128 MB 3D V-Cache · 170 W · AM5',
        },
      },
      { label: 'spec.system', value: 'ASRock Rack B650D4U · 4× ECC UDIMM · 2× M.2 · 4× SATA · PCIe 5.0 x16 · IPMI' },
      {
        label: 'spec.ram',
        value: {
          it: '32 GB DDR5 ECC UDIMM di base (2×16 GB) · fino a 192 GB su 4 slot',
          en: '32 GB DDR5 ECC UDIMM as standard (2×16 GB) · up to 192 GB across 4 slots',
        },
      },
      {
        label: 'spec.ssd',
        value: {
          it: '2× Samsung 990 PRO 1 TB M.2 2280 in RAID1 · ~1 TB utilizzabile · opzioni enterprise con PLP fino a 1,6 TB',
          en: '2× Samsung 990 PRO 1 TB M.2 2280 in RAID1 · ~1 TB usable · enterprise options with PLP up to 1.6 TB',
        },
      },
      {
        label: 'spec.drives',
        value: {
          it: 'Vani liberi di serie: 2× 3,5"/2,5" + 3× 2,5" · 4 porte SATA native · fino a 2×20 TB o 4 SSD SATA',
          en: 'Bays empty as standard: 2× 3.5"/2.5" + 3× 2.5" · 4 native SATA ports · up to 2×20 TB or 4 SATA SSDs',
        },
      },
      {
        label: 'spec.gpu',
        value: {
          it: 'Nessuna GPU discreta di serie (video dal BMC ASPEED) · opzioni RTX 5060 Ti 16 GB o Radeon AI PRO R9700 32 GB sul riser incluso',
          en: 'No discrete GPU as standard (video from the ASPEED BMC) · RTX 5060 Ti 16 GB or Radeon AI PRO R9700 32 GB options on the included riser',
        },
      },
      {
        label: 'spec.psu',
        value: {
          it: 'SilverStone Extreme 1200R Platinum SFX-L 1200 W · opzione Gemini 1300C ridondante 1300W+1300W CRPS hot-swap',
          en: 'SilverStone Extreme 1200R Platinum SFX-L 1200 W · optional redundant Gemini 1300C 1300W+1300W CRPS hot-swap',
        },
      },
      {
        label: 'spec.cooling',
        value: {
          it: 'DeepCool AN600 (67 mm, AM5, 180 W) · 3×120 mm frontali · 2×60 mm posteriori',
          en: 'DeepCool AN600 (67 mm, AM5, 180 W) · 3×120 mm front · 2×60 mm rear',
        },
      },
      {
        label: 'spec.ports',
        value: {
          it: 'IPMI dedicato · 2×2,5 GbE · USB · VGA · seriale (da B650D4U)',
          en: 'Dedicated IPMI · 2×2.5 GbE · USB · VGA · serial (from the B650D4U)',
        },
      },
      {
        label: 'spec.size',
        value: {
          it: 'SilverStone RM32 3U · slitte RMS09-20 incluse · full-height GPU ready',
          en: 'SilverStone RM32 3U · RMS09-20 rails included · full-height GPU ready',
        },
      },
    ],
    options: {
      ram: [
        {
          id: '32',
          label: '32 GB',
          addCents: 0,
          spec: {
            it: '32 GB DDR5-4800 ECC UDIMM (2×16 GB Origin Storage)',
            en: '32 GB DDR5-4800 ECC UDIMM (2×16 GB Origin Storage)',
          },
        },
        {
          id: '64',
          label: '64 GB',
          addCents: 6303,
          spec: '64 GB DDR5-5600 ECC UDIMM (2×32 GB Kingston KSM56E46BD8KM-32HA)',
        },
        {
          id: '96',
          label: '96 GB',
          addCents: 244672,
          spec: '96 GB DDR5-5600 ECC UDIMM (2×48 GB Kingston KSM56E46BD8KM-48HM)',
        },
        {
          id: '128',
          label: '128 GB',
          addCents: 246673,
          spec: '128 GB DDR5-5600 ECC UDIMM (4×32 GB Kingston, 4 slot occupati)',
        },
        {
          id: '192',
          label: '192 GB',
          addCents: 723410,
          spec: {
            it: '192 GB DDR5-5600 ECC UDIMM (4×48 GB Kingston) · massimo della piattaforma',
            en: '192 GB DDR5-5600 ECC UDIMM (4×48 GB Kingston) · platform maximum',
          },
        },
      ],
      /* The two M.2 2280 slots: always a mirrored pair. */
      ssd: [
        {
          id: '1000p',
          label: '2×1 TB NVMe',
          addCents: 0,
          spec: {
            it: '2× Samsung 990 PRO 1 TB in RAID1 · ~1 TB utilizzabile · 600 TBW/drive · senza PLP',
            en: '2× Samsung 990 PRO 1 TB in RAID1 · ~1 TB usable · 600 TBW/drive · no PLP',
          },
        },
        {
          id: '2000p',
          label: '2×2 TB NVMe',
          addCents: 32547,
          spec: {
            it: '2× Samsung 990 PRO 2 TB in RAID1 · ~2 TB utilizzabili · 1.200 TBW/drive · senza PLP',
            en: '2× Samsung 990 PRO 2 TB in RAID1 · ~2 TB usable · 1,200 TBW/drive · no PLP',
          },
        },
        {
          id: '4000p',
          label: '2×4 TB NVMe',
          addCents: 105280,
          spec: {
            it: '2× Samsung 990 PRO 4 TB in RAID1 · ~4 TB utilizzabili · 2.400 TBW/drive · senza PLP',
            en: '2× Samsung 990 PRO 4 TB in RAID1 · ~4 TB usable · 2,400 TBW/drive · no PLP',
          },
        },
        {
          id: '8000p',
          label: '2×8 TB NVMe',
          addCents: 433944,
          spec: {
            it: '2× Samsung 9100 PRO 8 TB PCIe 5.0 in RAID1 · ~8 TB utilizzabili · 4.800 TBW/drive · senza PLP',
            en: '2× Samsung 9100 PRO 8 TB PCIe 5.0 in RAID1 · ~8 TB usable · 4,800 TBW/drive · no PLP',
          },
        },
        {
          id: '400',
          label: { it: '2×400 GB Enterprise', en: '2×400 GB enterprise' },
          addCents: 87523,
          spec: {
            it: '2× Synology SNV5420 400 GB con PLP in RAID1 · ~400 GB utilizzabili · >700 TBW/drive',
            en: '2× Synology SNV5420 400 GB with PLP in RAID1 · ~400 GB usable · >700 TBW/drive',
          },
        },
        {
          id: '800',
          label: { it: '2×800 GB Enterprise', en: '2×800 GB enterprise' },
          addCents: 136835,
          spec: {
            it: '2× Synology SNV5420 800 GB con PLP in RAID1 · ~800 GB utilizzabili · >1.400 TBW/drive',
            en: '2× Synology SNV5420 800 GB with PLP in RAID1 · ~800 GB usable · >1,400 TBW/drive',
          },
        },
        {
          id: '960',
          label: { it: '2×960 GB Enterprise', en: '2×960 GB enterprise' },
          addCents: 101572,
          spec: {
            it: '2× Kingston DC2000B 960 GB con PLP e dissipatore integrato in RAID1 · ~960 GB utilizzabili · 700 TBW/drive',
            en: '2× Kingston DC2000B 960 GB with PLP and integrated heatsink in RAID1 · ~960 GB usable · 700 TBW/drive',
          },
        },
        {
          id: '1600',
          label: { it: '2×1,6 TB Enterprise', en: '2×1.6 TB enterprise' },
          addCents: 395067,
          spec: {
            it: '2× Synology SNV5420 1,6 TB con PLP in RAID1 · ~1,6 TB utilizzabili · >2.900 TBW/drive',
            en: '2× Synology SNV5420 1.6 TB with PLP in RAID1 · ~1.6 TB usable · >2,900 TBW/drive',
          },
        },
      ],
      /* The 3.5"/2.5" bays on the four native SATA ports: empty by default. */
      bay: [
        {
          id: 'none',
          label: { it: 'Vani vuoti', en: 'Empty bays' },
          addCents: 0,
          spec: {
            it: 'Nessun disco nei vani · 2× 3,5"/2,5" + 3× 2,5" liberi, 4 porte SATA disponibili',
            en: 'No drives in the bays · 2× 3.5"/2.5" + 3× 2.5" free, 4 SATA ports available',
          },
        },
        {
          id: 'sata4x1',
          label: '4×1 TB SATA',
          addCents: 66071,
          spec: {
            it: '4× SSD SATA 2-Power SSD2044B 1 TB · 4 TB raw sulle 4 porte native',
            en: '4× 2-Power SSD2044B 1 TB SATA SSDs · 4 TB raw across the 4 native ports',
          },
        },
        {
          id: 'sata2x2wd',
          label: '2×2 TB SATA',
          addCents: 105274,
          spec: {
            it: '2× WD Red SA500 2 TB in RAID1 · ~2 TB utilizzabili · 2 porte SATA libere',
            en: '2× WD Red SA500 2 TB in RAID1 · ~2 TB usable · 2 SATA ports left free',
          },
        },
        {
          id: 'sata4x2',
          label: '4×2 TB SATA',
          addCents: 137457,
          spec: {
            it: '4× SSD SATA 2-Power SSD2045A 2 TB · 8 TB raw sulle 4 porte native',
            en: '4× 2-Power SSD2045A 2 TB SATA SSDs · 8 TB raw across the 4 native ports',
          },
        },
        {
          id: 'hdd2x20',
          label: { it: '2×20 TB HDD 3,5"', en: '2×20 TB 3.5" HDD' },
          addCents: 168056,
          spec: {
            it: '2× Toshiba MG11 20 TB SATA 3,5" 7200 rpm in RAID1 · ~20 TB utilizzabili',
            en: '2× Toshiba MG11 20 TB SATA 3.5" 7200 rpm in RAID1 · ~20 TB usable',
          },
        },
        {
          id: 'sata4x4',
          label: '4×4 TB SATA',
          addCents: 488219,
          spec: {
            it: '4× SSD SATA WD Red SA500 4 TB · 16 TB raw sulle 4 porte native',
            en: '4× WD Red SA500 4 TB SATA SSDs · 16 TB raw across the 4 native ports',
          },
        },
      ],
      gpu: [
        {
          id: 'base',
          label: { it: 'Nessuna GPU', en: 'No GPU' },
          addCents: 0,
          spec: {
            it: 'Nessuna GPU discreta · uscita video di servizio dal BMC ASPEED (IPMI)',
            en: 'No discrete GPU · service video output from the ASPEED BMC (IPMI)',
          },
        },
        {
          id: '5060ti',
          label: 'RTX 5060 Ti 16 GB',
          addCents: 104281,
          spec: 'GIGABYTE RTX 5060 Ti WINDFORCE OC 16 GB · PCIe 5.0 · riser x16 incluso',
        },
        {
          id: 'r9700',
          label: 'Radeon AI PRO R9700 32 GB',
          addCents: 195419,
          spec: {
            it: 'PowerColor Radeon AI PRO R9700 32 GB · blower dual-slot · 300 W · ROCm',
            en: 'PowerColor Radeon AI PRO R9700 32 GB · dual-slot blower · 300 W · ROCm',
          },
        },
      ],
      psu: [
        {
          id: 'extreme',
          label: { it: 'Singolo 1200 W', en: 'Single 1200 W' },
          addCents: 0,
          spec: {
            it: 'SilverStone Extreme 1200R Platinum SFX-L · singolo, non ridondante',
            en: 'SilverStone Extreme 1200R Platinum SFX-L · single, not redundant',
          },
        },
        {
          id: 'gemini',
          label: { it: 'Ridondante 1300+1300 W', en: 'Redundant 1300+1300 W' },
          addCents: 93515,
          spec: {
            it: 'SilverStone Gemini 1300C Platinum · CRPS 1+1 hot-swap',
            en: 'SilverStone Gemini 1300C Platinum · 1+1 hot-swap CRPS',
          },
        },
      ],
      os: [
        { id: 'compud', label: 'Compud Linux', addCents: 0, spec: 'Compud Linux · Fedora Atomic · KDE Plasma' },
        { id: 'proxmox', label: 'Proxmox VE', addCents: 0, spec: 'Proxmox VE 8' },
      ],
    },
  },
];

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

/**
 * The rack server is a single build, so every "servers" entry point (menu,
 * footer, home) links straight to its product page instead of an index.
 */
export const serverProduct = products.find((p) => p.section === 'server');

export const serversHref = (lang: Lang): string =>
  serverProduct ? href(lang, 'serverProduct', serverProduct.slug) : href(lang, 'servers');

export const optionById = (list: Option[], id: string): Option =>
  list.find((o) => o.id === id) ?? list[0]!;

/** Net price of a product with the given option ids, in cents. */
export function configuredPriceCents(product: Product, choice: ProductChoice): number {
  const groups: (keyof Product['options'])[] = ['ram', 'ssd', 'os', 'gpu', 'psu', 'bay'];
  return groups.reduce((sum, group) => {
    const list = product.options[group];
    if (!list) return sum;
    const id = choice[group] ?? '';
    return sum + optionById(list, id).addCents;
  }, product.basePriceCents);
}

export function configuredSku(product: Product, choice: ProductChoice): string {
  const parts = [product.sku, choice.ram, choice.ssd, choice.os.toUpperCase()];
  if (product.options.gpu && choice.gpu) parts.push(choice.gpu.toUpperCase());
  if (product.options.psu && choice.psu) parts.push(choice.psu.toUpperCase());
  if (product.options.bay && choice.bay) parts.push(choice.bay.toUpperCase());
  return parts.join('-');
}

export const defaultChoice = (product: Product): ProductChoice => {
  const base = {
    ram: product.options.ram.find((o) => o.addCents === 0)?.id ?? product.options.ram[0]!.id,
    ssd: product.options.ssd.find((o) => o.addCents === 0)?.id ?? product.options.ssd[0]!.id,
    os: product.options.os[0]!.id,
  };
  const gpu = product.options.gpu
    ? { gpu: product.options.gpu.find((o) => o.id === 'base')?.id ?? product.options.gpu[0]!.id }
    : {};
  const psu = product.options.psu
    ? { psu: product.options.psu.find((o) => o.addCents === 0)?.id ?? product.options.psu[0]!.id }
    : {};
  const bay = product.options.bay
    ? { bay: product.options.bay.find((o) => o.addCents === 0)?.id ?? product.options.bay[0]!.id }
    : {};
  return { ...base, ...gpu, ...psu, ...bay };
};

