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

export type Glyph = 'mini' | 'miniCompact' | 'miniNetwork' | 'nas';

export type Section = 'miniPc' | 'nas';

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
  /** Short selling points shown above the spec table. */
  highlights?: Localized[];
  /** One or two paragraphs of editorial detail under the specs. */
  details?: Localized;
  /** Where the base specs/photos come from (shown as attribution). */
  sourceUrl?: string;
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
      it: 'Il telaio AI X1 con Ryzen AI 9 HX 370 (12 core) e Radeon 890M: workstation da 1,2 litri con OCuLink per eGPU, doppio USB4 e 4 monitor.',
      en: 'The AI X1 chassis with Ryzen AI 9 HX 370 (12 cores) and Radeon 890M: a 1.2-litre workstation with OCuLink for eGPUs, dual USB4 and 4 displays.',
    },
    basePriceCents: 129900,
    stock: 6,
    glyph: 'mini',
    images: [
      '/images/minisforum-ai-x1/01-front-34.png',
      '/images/minisforum-ai-x1/02-front-ports.png',
      '/images/minisforum-ai-x1/03-rear-io.png',
    ],
    highlights: [
      {
        it: 'Ryzen AI 9 HX 370 (12C/24T, fino a 5,1 GHz) + Radeon 890M: il più veloce della famiglia X1.',
        en: 'Ryzen AI 9 HX 370 (12C/24T, up to 5.1 GHz) + Radeon 890M: the fastest of the X1 family.',
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
      it: 'Stesso telaio compatto da 128×126×52 mm del X1 base, ma con processore HX 370, NPU fino a 80 TOPS per i carichi AI locali e grafica Radeon 890M. Due slot M.2 2280 PCIe 4.0 (fino a 8 TB totali, RAID 0/1), DDR5 SODIMM fino a 64 GB, 2,5 GbE + Wi-Fi 7 e alimentazione anche via USB-C PD.',
      en: 'Same compact 128×126×52 mm chassis as the base X1, but with the HX 370 chip, an NPU up to 80 TOPS for on-device AI and Radeon 890M graphics. Two M.2 2280 PCIe 4.0 slots (up to 8 TB total, RAID 0/1), DDR5 SODIMM up to 64 GB, 2.5 GbE + Wi-Fi 7 and USB-C PD power input.',
    },
    sourceUrl: 'https://www.minisforum.com/products/minisforum-ai-x1',
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
      it: 'Ryzen 7 255 (8 core/16 thread, fino a 4,9 GHz) con Radeon 780M in 128×126×52 mm: OCuLink per eGPU, doppio USB4 a 40 Gbps, 4 monitor e Wi-Fi 7. Lo assembliamo, aggiorniamo e collaudiamo 48 ore.',
      en: 'Ryzen 7 255 (8 cores/16 threads, up to 4.9 GHz) with Radeon 780M in 128×126×52 mm: OCuLink for eGPUs, dual 40 Gbps USB4, 4 displays and Wi-Fi 7. We assemble, update and burn-in test it for 48 hours.',
    },
    basePriceCents: 94900,
    stock: 11,
    glyph: 'miniCompact',
    images: [
      '/images/minisforum-ai-x1/01-front-34.png',
      '/images/minisforum-ai-x1/02-front-ports.png',
      '/images/minisforum-ai-x1/03-rear-io.png',
      '/images/minisforum-ai-x1/04-side-vent.png',
      '/images/minisforum-ai-x1/05-bottom.png',
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
      it: 'È la versione Ryzen 7 255 del telaio AI X1 (quella del listino con barebone senza RAM/SSD): la base ideale per postazioni ordinate e silenziose. Monta due SODIMM DDR5-5600 (fino a 64 GB in dual-channel) e due M.2 2280 PCIe 4.0 da 4 TB l’uno, con RAID 0 per la velocità o RAID 1 per la sicurezza. Sul retro trovi 2,5 GbE, DP, HDMI, USB4, OCuLink e USB-A; sul fronte due USB-A 3.2, una USB4, jack combo e doppio microfono. Dentro ci sono anche due speaker. Si alimenta con l’alimentatore da 120 W in dotazione oppure via USB-C PD.',
      en: 'This is the Ryzen 7 255 version of the AI X1 chassis (the barebone listing without RAM/SSD): the sweet spot for tidy, quiet desks. Two DDR5-5600 SODIMMs (up to 64 GB dual-channel) and two 4 TB PCIe 4.0 M.2 2280 slots, with RAID 0 for speed or RAID 1 for safety. On the back: 2.5 GbE, DP, HDMI, USB4, OCuLink and USB-A; on the front: two USB-A 3.2, one USB4, combo jack and dual mics. Two speakers inside. Powered by the bundled 120 W brick or via USB-C PD.',
    },
    sourceUrl: 'https://www.minisforum.com/products/minisforum-ai-x1',
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
        { id: '32', label: '32 GB', addCents: 11000, spec: '32 GB DDR5-5600 (2×16)' },
        { id: '64', label: '64 GB', addCents: 30000, spec: '64 GB DDR5-5600 (2×32)' },
      ],
      ssd: [
        { id: '512', label: '512 GB', addCents: 0, spec: '512 GB NVMe Gen4' },
        { id: '1000', label: '1 TB', addCents: 8000, spec: '1 TB NVMe Gen4' },
        { id: '2000', label: '2 TB', addCents: 20000, spec: '2 TB NVMe Gen4' },
        { id: '4000', label: '4 TB', addCents: 39000, spec: '4 TB NVMe Gen4' },
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
  {
    slug: 'minisforum-n5-air',
    section: 'nas',
    name: 'Minisforum N5 Air',
    sku: 'CPD-N5A',
    category: { it: 'NAS desktop · 5 vani', en: 'Desktop NAS · 5 bays' },
    tagline: {
      it: 'NAS da scrivania a 5 vani con Ryzen 7 255, 10 GbE + 5 GbE, OCuLink e slot PCIe: fino a 174 TB tra HDD e NVMe. Lo prepariamo con i tuoi dischi, RAID e snapshot già configurati.',
      en: 'A 5-bay desktop NAS with Ryzen 7 255, 10 GbE + 5 GbE, OCuLink and a PCIe slot: up to 174 TB across HDDs and NVMe. We ship it with your drives, RAID and snapshots already configured.',
    },
    basePriceCents: 74900,
    stock: 4,
    glyph: 'nas',
    images: [
      '/images/minisforum-n5-air/01-hero-34.png',
      '/images/minisforum-n5-air/02-open-bays.png',
      '/images/minisforum-n5-air/03-front.png',
      '/images/minisforum-n5-air/04-rear-34.png',
      '/images/minisforum-n5-air/05-rear-ports.png',
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
      it: 'È la versione Air della famiglia N5: stesso concetto del modello maggiore (telaio compatto da 199×202×252 mm con scheda estraibile per RAM e SSD) in una scocca più leggera da 4 kg. A bordo trovi SSD di sistema da 64 GB con MinisCloud preinstallato, due SODIMM DDR5-5600 (fino a 96 GB, non ECC) e supporto ZFS con snapshot, RAID 0/1/5/6 e RAIDZ. Dietro: 10 GbE, 5 GbE, OCuLink, HDMI 2.1, USB4, USB-A 3.2 e 2.0; davanti: USB4 e USB-A. I dischi HDD/SSD li montiamo noi su richiesta, con burn-in e filesystem già pronti.',
      en: 'This is the Air take on the N5 family: the same concept as its bigger sibling (a compact 199×202×252 mm chassis with a slide-out board for RAM and SSDs) in a lighter 4 kg shell. On board: a 64 GB system SSD with MinisCloud preinstalled, two DDR5-5600 SODIMMs (up to 96 GB, non-ECC) and ZFS with snapshots, RAID 0/1/5/6 and RAIDZ. On the back: 10 GbE, 5 GbE, OCuLink, HDMI 2.1, USB4, USB-A 3.2 and 2.0; on the front: USB4 and USB-A. We fit HDD/SSD drives on request, burned in with the filesystem ready to go.',
    },
    sourceUrl: 'https://www.minisforum.com/products/n5-air',
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
      { label: 'spec.system', value: 'MinisCloud preinstallato · snapshot ZFS · Docker · foto AI · accesso remoto' },
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
        { id: 'miniscloud', label: 'MinisCloud', addCents: 0, spec: 'MinisCloud OS preinstallato' },
        { id: 'truenas', label: 'TrueNAS SCALE', addCents: 0, spec: 'TrueNAS SCALE 24.10' },
        { id: 'ubuntu', label: 'Ubuntu LTS', addCents: 0, spec: 'Ubuntu 24.04 LTS' },
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
