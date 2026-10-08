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

export interface ProductFeature {
  value: string | Localized;
  title: Localized;
  body: Localized;
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
  /** Editorial cards explaining the product's main features. */
  features?: ProductFeature[];
  /** One or two paragraphs of editorial detail under the specs. */
  details?: Localized;
  /** Where the base specs/photos come from (shown as attribution). */
  sourceUrl?: string;
  /** Product-specific Linux validation and delivery notes. */
  linuxNote?: Localized;
  fulfillmentNote?: Localized;
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
    slug: 'compud-mini-ryzen-7-255',
    name: 'Compud Mini PC Ryzen 7 H255',
    sku: 'CPD-MINI-255',
    category: 'Mini PC',
    tagline: {
      it: 'Una postazione Linux completa in appena 128×126×52 mm: Ryzen 7 H255 a 8 core/16 thread per IDE, build e container, fino a 96 GB di RAM e 4 monitor. Con Compud Linux e toolchain pronti, inizi dai tuoi progetti. OCuLink e doppio USB4 lasciano spazio a GPU esterne, dock e storage veloce.',
      en: 'A complete Linux workstation in just 128×126×52 mm: an 8-core/16-thread Ryzen 7 H255 for IDEs, builds and containers, up to 96 GB RAM and 4 displays. Compud Linux and the toolchain are ready so you can start with your projects. OCuLink and dual USB4 make room for external GPUs, docks and fast storage.',
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
        it: '8 core e 16 thread per affiancare editor, compilazioni e servizi locali. La Radeon 780M integrata gestisce la postazione grafica senza occupare spazio con una scheda dedicata.',
        en: '8 cores and 16 threads for editors, builds and local services running together. Integrated Radeon 780M graphics handles the desktop without taking up space with a dedicated card.',
      },
      {
        it: 'OCuLink PCIe 4.0 ×4 e 2× USB4 a 40 Gbps per aggiungere una GPU esterna, un dock o SSD esterni: la postazione cresce insieme ai tuoi progetti.',
        en: 'OCuLink PCIe 4.0 ×4 and 2× 40 Gbps USB4 let you add an external GPU, a dock or external SSDs, so the workstation can grow with your projects.',
      },
      {
        it: 'Fino a 4 monitor via HDMI, DisplayPort e USB4: codice, documentazione, anteprima e log restano visibili senza passare continuamente da una finestra all’altra.',
        en: 'Up to 4 displays over HDMI, DisplayPort and USB4 keep code, documentation, previews and logs visible without constantly switching windows.',
      },
      {
        it: 'Due slot RAM e due M.2 accessibili per aggiornare memoria e spazio nel tempo. Doppia ventola e heatpipe in rame gestiscono il calore in un formato da scrivania compatto.',
        en: 'Two RAM slots and two M.2 slots let you upgrade memory and capacity over time. Dual fans and copper heat pipes handle cooling in a compact desktop format.',
      },
    ],
    features: [
      {
        value: '8C / 16T',
        title: { it: 'Sviluppo e servizi sulla stessa macchina', en: 'Development and services on one machine' },
        body: {
          it: 'Il Ryzen 7 H255 permette di distribuire il lavoro tra compilazioni, test e container. Puoi tenere vicino al codice anche database e servizi di sviluppo, scegliendo la memoria in base a quanti processi usi insieme.',
          en: 'The Ryzen 7 H255 spreads work across builds, tests and containers. Keep development databases and services close to your code, and choose memory around the processes you run together.',
        },
      },
      {
        value: { it: 'Fino a 96 GB', en: 'Up to 96 GB' },
        title: { it: 'Più spazio per ambienti e progetti', en: 'More room for environments and projects' },
        body: {
          it: 'Due SODIMM DDR5 sostituibili ti permettono di partire dalla configurazione che serve oggi e aggiornarla. Più RAM aiuta a mantenere in memoria IDE, container e dataset; il kit 2×48 GB è collaudato da Compud.',
          en: 'Two replaceable DDR5 SODIMMs let you start with the configuration you need today and upgrade it later. More RAM helps keep IDEs, containers and datasets in memory; Compud has tested the 2×48 GB kit.',
        },
      },
      {
        value: { it: '4 monitor', en: '4 displays' },
        title: { it: 'Una scrivania con tutto sotto controllo', en: 'A desk with everything in view' },
        body: {
          it: 'HDMI 2.1, DisplayPort 2.0 e due USB4 consentono fino a quattro schermi. Dedichi un monitor all’editor, uno all’applicazione e gli altri a documentazione e log, con meno interruzioni nel lavoro.',
          en: 'HDMI 2.1, DisplayPort 2.0 and two USB4 ports support up to four screens. Give the editor, your application, documentation and logs their own space, with fewer interruptions to your work.',
        },
      },
      {
        value: 'OCuLink',
        title: { it: 'Aggiungi potenza quando serve', en: 'Add processing power when you need it' },
        body: {
          it: 'Il collegamento PCIe 4.0 ×4 permette di aggiungere una GPU esterna con un box compatibile. Per rendering o inferenza locale dimensioniamo scheda, alimentazione e software sul carico: puoi ampliare la postazione mantenendo il mini PC.',
          en: 'The PCIe 4.0 ×4 connection lets you add an external GPU in a compatible enclosure. For rendering or local inference, we size the card, power supply and software around the workload, so you can expand the workstation while keeping the mini PC.',
        },
      },
      {
        value: '2× NVMe',
        title: { it: 'Progetti e dati con spazio per crescere', en: 'Room for projects and growing datasets' },
        body: {
          it: 'I due M.2 PCIe 4.0 ospitano fino a 4 TB ciascuno. Puoi separare sistema e progetti, oppure scegliere una coppia in RAID 1 per mantenere una copia dei dati su entrambi i dischi e tollerare il guasto di uno.',
          en: 'The two PCIe 4.0 M.2 slots hold up to 4 TB each. Separate the system from your projects, or choose a RAID 1 pair to keep data on both drives and tolerate the failure of one.',
        },
      },
      {
        value: 'Compud Linux',
        title: { it: 'Il primo giorno è per i tuoi progetti', en: 'Spend day one on your projects' },
        body: {
          it: 'Sistema, driver e toolchain arrivano installati e verificati dopo 48 ore di collaudo. Gli aggiornamenti transazionali con rollback offrono una via di ritorno se un aggiornamento crea problemi; per l’assistenza parli con chi ha preparato la macchina.',
          en: 'The system, drivers and toolchain arrive installed and verified after a 48-hour burn-in. Transactional updates with rollback give you a way back if an update causes problems; support comes from the people who prepared the machine.',
        },
      },
    ],
    details: {
      it: 'Il Compud Mini PC è pensato per chi sviluppa software e vuole una postazione completa senza un grande tower sulla scrivania. Gli 8 core e 16 thread del Ryzen 7 H255 affiancano IDE, build e servizi locali; la Radeon 780M gestisce la grafica integrata. Scegli RAM e SSD in base ai tuoi progetti: 16 GB per una postazione essenziale, più memoria se usi molti container, macchine virtuali o dataset contemporaneamente.\n\nIl formato compatto lascia spazio sulla scrivania, ma mantiene possibilità di espansione: due SODIMM DDR5-5600 fino a 96 GB, due SSD NVMe fino a 4 TB ciascuno e OCuLink per una GPU esterna. La rete 2,5 GbE collega la postazione a un NAS compatibile per condividere progetti e backup; Wi-Fi 7, USB4 e le uscite video completano le connessioni. L’alimentatore da 120 W è incluso.\n\nLo assembliamo dal barebone, installiamo Compud Linux e la toolchain concordata e lo collaudiamo per 48 ore. Ricevi un ambiente di lavoro già pronto, con log del collaudo e un referente tecnico che conosce la tua configurazione.',
      en: 'The Compud Mini PC is for software developers who want a complete workstation without a large tower on the desk. The Ryzen 7 H255’s 8 cores and 16 threads handle IDEs, builds and local services, while the Radeon 780M provides integrated graphics. Choose RAM and storage around your projects: 16 GB for an essential workstation, more memory when you run many containers, virtual machines or datasets together.\n\nThe compact format frees up desk space while keeping room for expansion: two DDR5-5600 SODIMMs up to 96 GB, two NVMe SSDs up to 4 TB each and OCuLink for an external GPU. A 2.5 GbE connection links the workstation to a compatible NAS for shared projects and backups; Wi-Fi 7, USB4 and video outputs complete the connections. The 120 W power supply is included.\n\nWe assemble it from the barebone, install Compud Linux and your agreed toolchain, then burn-in test it for 48 hours. You receive a working environment ready to use, with the test log and a technical contact who knows your configuration.',
    },
    summary: [
      { label: 'spec.cpu', value: 'Ryzen 7 H255 · 8C/16T' },
      { label: 'spec.ram', value: '16 GB DDR5-5600' },
      { label: 'spec.ssd', value: '512 GB NVMe Gen4' },
    ],
    specs: [
      { label: 'spec.cpu', value: 'AMD Ryzen 7 H255 · 8C/16T Zen 4 fino a 4,9 GHz · 16 MB L3 · 15–65 W' },
      { label: 'spec.gpu', value: 'AMD Radeon 780M (RDNA 3, 12 CU)' },
      { label: 'spec.ram', value: 'DDR5 SODIMM ×2 · 5600 MT/s · max 96 GB (2×48) dual-channel' },
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
      // Amazon.it reference prices, VAT included (reviewed 2026-10-08):
      // 16 GB = 2× CT8G56C46S5 at €165 = €330; 32 GB CT2K16G56C46S5 €539.99;
      // 64 GB CT2K32G56C46S5 €1,210.34. Daily feed: https://prezziram.it/
      // 96 GB CT2K48G56C46S5 €1,669.30: last indexed Amazon Marketplace
      // offer (September 2026), indicative until reconfirmed with the supplier.
      // https://www.trovaprezzi.it/prezzo_ram_sodimm_96gb.aspx
      // Direct Amazon access was blocked; references are from the trackers.
      // Net upgrade = round((kit gross cents − 33000) / 1.22).
      // The 16 GB base build remains €949 net; only RAM upgrades change.
      ram: [
        { id: '16', label: '16 GB', addCents: 0, spec: '16 GB DDR5-5600 (2×8)' },
        { id: '32', label: '32 GB', addCents: 17212, spec: '32 GB DDR5-5600 (2×16)' },
        { id: '64', label: '64 GB', addCents: 72159, spec: '64 GB DDR5-5600 (2×32)' },
        // 2×48 GB configuration validated by Compud (confirmed 2026-10-08).
        { id: '96', label: '96 GB (2×48)', addCents: 109779, spec: '96 GB DDR5-5600 (2×48)' },
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
    slug: 'compud-nas-5-ryzen-7-255',
    section: 'nas',
    name: 'Compud NAS 5 Ryzen 7 255',
    sku: 'CPD-NAS-5',
    category: { it: 'NAS desktop · 5 vani', en: 'Desktop NAS · 5 bays' },
    tagline: {
      it: 'Dataset, modelli e backup in un archivio condiviso sotto il tuo controllo. Cinque vani SATA, tre slot NVMe e rete 10 GbE + 5 GbE uniscono capacità e accesso veloce; Ryzen 7 255 e fino a 96 GB di RAM danno spazio anche a container e servizi. Dischi su richiesta, con RAID e snapshot preparati da noi.',
      en: 'Datasets, models and backups in shared storage under your control. Five SATA bays, three NVMe slots and 10 GbE + 5 GbE networking combine capacity with fast access; a Ryzen 7 255 and up to 96 GB RAM make room for containers and services too. Drives are fitted on request, with RAID and snapshots prepared by us.',
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
        it: '5 vani SATA fino a 150 TB lordi per archivi e backup, più 3 slot NVMe per cache o volumi veloci: scegli capacità e prestazioni in base ai dati che usi.',
        en: '5 SATA bays with up to 150 TB raw capacity for archives and backups, plus 3 NVMe slots for cache or fast volumes: choose capacity and performance around the data you use.',
      },
      {
        it: 'Due porte di rete, 10 GbE e 5 GbE, per collegare workstation veloci e separare il traffico di lavoro dai backup. Le prestazioni dipendono da rete, dischi e configurazione.',
        en: 'Two network ports, 10 GbE and 5 GbE, connect fast workstations and let you separate working traffic from backups. Performance depends on the network, drives and configuration.',
      },
      {
        it: 'Snapshot ZFS per recuperare versioni precedenti dei file; RAID configurato in base ai dischi per tollerare guasti. Completiamo la protezione con una strategia di backup concordata.',
        en: 'ZFS snapshots recover earlier file versions; RAID is configured around your drives to tolerate failures. An agreed backup strategy completes your data protection.',
      },
      {
        it: 'Ryzen 7 255 a 8 core/16 thread e RAM espandibile fino a 96 GB per affiancare all’archivio container e VM, dimensionati sul carico del team.',
        en: 'An 8-core/16-thread Ryzen 7 255 and RAM expandable to 96 GB let you run containers and VMs alongside storage, sized around the team’s workload.',
      },
    ],
    features: [
      {
        value: { it: '5 vani SATA', en: '5 SATA bays' },
        title: { it: 'Un archivio comune per il team', en: 'Shared storage for the team' },
        body: {
          it: 'Centralizzi dataset, pesi dei modelli, progetti e copie di backup. I cinque vani ospitano HDD o SSD: dimensioniamo capacità e ridondanza sui dati reali, distinguendo lo spazio lordo da quello disponibile dopo il RAID.',
          en: 'Centralise datasets, model weights, projects and backup copies. The five bays hold HDDs or SSDs; we size capacity and redundancy around your actual data, distinguishing raw capacity from the space available after RAID.',
        },
      },
      {
        value: '10 GbE + 5 GbE',
        title: { it: 'Meno attese sui trasferimenti', en: 'Less time waiting for transfers' },
        body: {
          it: 'La porta 10 GbE offre più banda di una rete Gigabit per trasferire file grandi, con switch e client compatibili. La seconda porta a 5 GbE può servire una rete separata: lavoro e backup possono usare collegamenti distinti.',
          en: 'The 10 GbE port offers more bandwidth than Gigabit Ethernet for large file transfers with compatible switches and clients. The second, 5 GbE port can serve a separate network, giving work and backups distinct connections.',
        },
      },
      {
        value: '3× NVMe',
        title: { it: 'Velocità dove serve davvero', en: 'Speed where it matters' },
        body: {
          it: 'Puoi affiancare agli HDD una cache di lettura o volumi SSD per dati e servizi usati spesso. La cache aiuta soprattutto sugli accessi ripetuti: scegliamo il suo ruolo in base al carico, mentre l’SSD di sistema da 64 GB è incluso.',
          en: 'Add a read cache alongside the HDDs or SSD volumes for frequently used data and services. Cache is most useful for repeated reads, so we choose its role around your workload. The 64 GB system SSD is included.',
        },
      },
      {
        value: 'ZFS',
        title: { it: 'Recuperi una versione precedente', en: 'Recover an earlier version' },
        body: {
          it: 'Gli snapshot conservano lo stato dei file a un momento preciso e aiutano a recuperare modifiche o cancellazioni accidentali. Il RAID gestisce la ridondanza dei dischi; una copia su un altro dispositivo o fuori sede completa il piano di backup.',
          en: 'Snapshots retain files as they were at a point in time and help recover accidental changes or deletions. RAID provides drive redundancy; a copy on another device or off site completes the backup plan.',
        },
      },
      {
        value: { it: 'Fino a 96 GB', en: 'Up to 96 GB' },
        title: { it: 'I servizi vicino ai tuoi dati', en: 'Keep services close to your data' },
        body: {
          it: 'Gli 8 core e 16 thread del Ryzen 7 255 e la RAM espandibile danno spazio a Docker e macchine virtuali: indicizzazione, automazioni e servizi interni possono lavorare direttamente sull’archivio. Dimensioniamo le risorse lasciando spazio anche alla condivisione dei file.',
          en: 'The Ryzen 7 255’s 8 cores and 16 threads and expandable RAM make room for Docker and virtual machines. Indexing, automation and internal services can work directly on stored data; we size resources to leave room for file sharing too.',
        },
      },
      {
        value: { it: 'Pronto all’uso', en: 'Ready to use' },
        title: { it: 'Dalla configurazione al primo backup', en: 'From configuration to the first backup' },
        body: {
          it: 'Compud Linux arriva preinstallato. Con i dischi richiesti prepariamo filesystem, RAID e snapshot prima della consegna; concordiamo rete e servizi per ridurre il lavoro iniziale. Il telaio con scheda estraibile facilita gli aggiornamenti di RAM e SSD.',
          en: 'Compud Linux arrives preinstalled. With your requested drives, we prepare the filesystem, RAID and snapshots before delivery, and agree networking and services to reduce initial setup. The slide-out board makes RAM and SSD upgrades easier.',
        },
      },
    ],
    details: {
      it: 'Il Compud NAS 5 raccoglie in un unico punto i dati che il team usa ogni giorno: dataset, modelli, documenti e backup delle postazioni. Condividere un archivio sulla rete locale semplifica l’accesso ai file e mantiene la gestione sulla tua infrastruttura. Il telaio da 199×202×252 mm trova posto in ufficio senza richiedere un rack; i cinque vani SATA e i tre slot NVMe permettono di combinare capacità e velocità.\n\nLa rete 10 GbE + 5 GbE si adatta a workstation e reti separate. Per ottenere il beneficio sui trasferimenti dimensioniamo insieme dischi, switch e collegamenti. Il Ryzen 7 255 e fino a 96 GB di DDR5 consentono di aggiungere container o VM per servizi interni, scegliendo le risorse in modo che archivio e applicazioni possano convivere. OCuLink, lo slot PCIe e due USB4 offrono ulteriori possibilità di espansione.\n\nLa base include Compud Linux su SSD di sistema da 64 GB; i dischi dati si montano su richiesta. Prepariamo il filesystem, il livello di RAID e gli snapshot in base a capacità e recupero desiderati. La capacità utile dipende dai dischi e dalla ridondanza scelti: concordiamo anche una copia di backup separata per completare la protezione dei dati.',
      en: 'The Compud NAS 5 brings together the data your team uses every day: datasets, models, documents and workstation backups. Shared storage on the local network simplifies file access and keeps management on your own infrastructure. The 199×202×252 mm chassis fits in the office without needing a rack; five SATA bays and three NVMe slots let you combine capacity and speed.\n\nThe 10 GbE + 5 GbE connections support workstations and separate networks. We size drives, switches and connections together to make the most of file transfers. The Ryzen 7 255 and up to 96 GB DDR5 let you add containers or VMs for internal services, with resources chosen so storage and applications can coexist. OCuLink, the PCIe slot and two USB4 ports offer further expansion options.\n\nThe base includes Compud Linux on a 64 GB system SSD; data drives are fitted on request. We prepare the filesystem, RAID level and snapshots around your capacity and recovery needs. Usable capacity depends on the drives and redundancy you choose; we also agree a separate backup copy to complete data protection.',
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
      { label: 'spec.net', value: { it: '10 GbE + 5 GbE RJ45 · due interfacce configurabili separatamente', en: '10 GbE + 5 GbE RJ45 · two separately configurable interfaces' } },
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
    slug: 'xiaomi-book-pro-14-2026',
    section: 'laptop',
    name: 'Xiaomi Book Pro 14 (2026)',
    sku: 'CPD-XMI-14-X7',
    category: { it: 'Laptop 14,6" · sviluppo in mobilità', en: '14.6" laptop · mobile development' },
    tagline: {
      it: 'Potenza da workstation, appena 1,08 kg nello zaino. Core Ultra X7 358H a 16 core, Intel Arc B390, 32 GB LPDDR5X e SSD da 1 TB, con OLED touch 3.1K a 120 Hz e batteria da 72 Wh.',
      en: 'Workstation power at just 1.08 kg in your bag. A 16-core Core Ultra X7 358H, Intel Arc B390, 32 GB LPDDR5X and a 1 TB SSD, with a 120 Hz 3.1K OLED touchscreen and a 72 Wh battery.',
    },
    // Compud selling price confirmed by the owner: EUR 2,990 excluding VAT.
    basePriceCents: 299000,
    // No on-hand quantity confirmed: request availability with the order.
    stock: 0,
    glyph: 'laptop',
    images: [
      '/images/xiaomi-book-pro-14/01-rear-three-quarter-cutout.webp',
      '/images/xiaomi-book-pro-14/02-open-rear-cutout.webp',
      '/images/xiaomi-book-pro-14/03-ports-cutout.webp',
    ],
    highlights: [
      {
        it: 'Core Ultra X7 358H: 16 core / 16 thread, fino a 4,8 GHz e 18 MB di cache per compilazioni, multitasking e sviluppo.',
        en: 'Core Ultra X7 358H: 16 cores / 16 threads, up to 4.8 GHz and 18 MB cache for compiling, multitasking and development.',
      },
      {
        it: 'Intel Arc B390 con 12 core Xe e NPU Intel AI Boost fino a 50 TOPS: accelerazione grafica e AI con i runtime supportati.',
        en: 'Intel Arc B390 with 12 Xe cores and an Intel AI Boost NPU delivering up to 50 TOPS: graphics and AI acceleration with supported runtimes.',
      },
      {
        it: '32 GB LPDDR5X a 9600 MT/s e SSD PCIe 4.0 da 1 TB. Uno slot M.2 2280 libero permette di aggiungere fino a 4 TB di storage.',
        en: '32 GB LPDDR5X at 9600 MT/s and a 1 TB PCIe 4.0 SSD. A spare M.2 2280 slot lets you add up to 4 TB of storage.',
      },
      {
        it: 'Scocca in lega di magnesio e fondo in fibra di carbonio: circa 1,08 kg e 14,95 mm di spessore, con apertura a una mano fino a 160°.',
        en: 'Magnesium-alloy chassis and carbon-fibre base: around 1.08 kg and 14.95 mm thin, with one-handed opening up to 160°.',
      },
      {
        it: 'Tastiera retroilluminata su 4 livelli, touchpad a pressione da 129 cm², webcam 1080p e due microfoni per lavorare e fare videochiamate.',
        en: 'Four-level backlit keyboard, 129 cm² pressure-sensitive touchpad, 1080p webcam and dual microphones for work and video calls.',
      },
    ],
    features: [
      {
        value: '3.1K OLED',
        title: { it: 'Più spazio per codice e creatività', en: 'More room for code and creativity' },
        body: {
          it: 'Il touch da 14,6" in formato 3:2 offre spazio verticale per editor e documenti. Risoluzione 3120 × 2080, refresh fino a 120 Hz, copertura DCI-P3 del 100% e luminosità di 500 nit, con picchi HDR fino a 1600 nit.',
          en: 'The 14.6" 3:2 touchscreen gives editors and documents more vertical room. A 3120 × 2080 resolution, up to 120 Hz refresh rate, 100% DCI-P3 coverage and 500-nit brightness, with HDR peaks up to 1600 nits.',
        },
      },
      {
        value: '72 Wh',
        title: { it: 'Una batteria capiente, un caricatore compatto', en: 'A large battery, a compact charger' },
        body: {
          it: 'Batteria da 72 Wh e alimentatore USB-C GaN da 100 W incluso. Xiaomi dichiara fino a 19,8 ore nei propri test: l’autonomia effettiva dipende da luminosità, carico e sistema operativo, e viene verificata nel collaudo Linux.',
          en: 'A 72 Wh battery and an included 100 W USB-C GaN adapter. Xiaomi rates battery life at up to 19.8 hours in its tests; actual runtime depends on brightness, workload and operating system, and is checked during Linux validation.',
        },
      },
      {
        value: '40 Gbps',
        title: { it: 'Dallo zaino alla scrivania', en: 'From your bag to your desk' },
        body: {
          it: 'Thunderbolt 4 a 40 Gbps per dock e storage veloce, USB-C a 10 Gbps, USB-A a 5 Gbps, HDMI 2.1 TMDS e jack audio. Wi-Fi 6E e Bluetooth 5.3 completano le connessioni senza fili.',
          en: '40 Gbps Thunderbolt 4 for docks and fast storage, 10 Gbps USB-C, 5 Gbps USB-A, HDMI 2.1 TMDS and an audio jack. Wi-Fi 6E and Bluetooth 5.3 cover wireless connections.',
        },
      },
    ],
    details: {
      it: 'La configurazione Core Ultra X7 della generazione 2026 combina CPU Panther Lake, grafica Arc B390 e memoria veloce in un telaio compatto. È pensata per portare con te editor, container e progetti, e tornare a una postazione completa collegando monitor e periferiche. La grafica supporta la codifica e decodifica hardware AV1 e Intel Quick Sync per i flussi video.\n\nPer l’AI locale, GPU e NPU richiedono driver e runtime compatibili: la grafica usa memoria condivisa, quindi modelli e contesto vanno dimensionati sulle risorse disponibili. Compud verifica il profilo Linux sul singolo esemplare prima della conferma; per carichi più grandi puoi usare il laptop come accesso alla tua infrastruttura remota.',
      en: 'The 2026 Core Ultra X7 configuration brings a Panther Lake CPU, Arc B390 graphics and fast memory together in a compact chassis. Take your editors, containers and projects with you, then connect monitors and peripherals for a full desk setup. Graphics supports hardware AV1 encoding and decoding and Intel Quick Sync for video workflows.\n\nLocal AI on the GPU and NPU requires compatible drivers and runtimes. Graphics uses shared memory, so models and context sizes need to fit the available resources. Compud validates the Linux profile on the actual unit before confirmation; for larger workloads, the laptop can connect you to your remote infrastructure.',
    },
    linuxNote: {
      it: 'Configurazione Linux da validare sul singolo esemplare prima della conferma: tastiera, audio, grafica, sospensione e accelerazione AI. Non dichiariamo la piena compatibilità di GPU/NPU senza collaudo.',
      en: 'Linux configuration to be validated on the actual unit before confirmation: keyboard, audio, graphics, suspend and AI acceleration. Full GPU/NPU compatibility is subject to testing.',
    },
    fulfillmentNote: {
      it: 'SU ORDINAZIONE · DISPONIBILITÀ E TEMPI CONFERMATI PRIMA DEL PAGAMENTO',
      en: 'ON REQUEST · AVAILABILITY AND LEAD TIME CONFIRMED BEFORE PAYMENT',
    },
    summary: [
      { label: 'spec.cpu', value: 'Core Ultra X7 358H · 16C/16T' },
      { label: 'spec.ram', value: '32 GB LPDDR5X-9600' },
      { label: 'spec.ssd', value: '1 TB NVMe Gen4' },
    ],
    specs: [
      { label: 'spec.cpu', value: { it: 'Intel Core Ultra X7 358H · Panther Lake · 16C/16T (4P + 8E + 4 LP-E) · fino a 4,8 GHz · 18 MB cache', en: 'Intel Core Ultra X7 358H · Panther Lake · 16C/16T (4P + 8E + 4 LP-E) · up to 4.8 GHz · 18 MB cache' } },
      { label: 'spec.gpu', value: { it: 'Intel Arc B390 · 12 core Xe · fino a 2,5 GHz · memoria condivisa · AV1 encode/decode', en: 'Intel Arc B390 · 12 Xe cores · up to 2.5 GHz · shared memory · AV1 encode/decode' } },
      { label: 'spec.npu', value: { it: 'Intel AI Boost · fino a 50 TOPS INT8 · utilizzo subordinato a driver/runtime', en: 'Intel AI Boost · up to 50 TOPS INT8 · requires compatible drivers/runtimes' } },
      { label: 'spec.ram', value: '32 GB LPDDR5X · 9600 MT/s' },
      { label: 'spec.ssd', value: '1 TB NVMe PCIe 4.0' },
      { label: 'spec.expand', value: { it: 'Slot M.2 2280 aggiuntivo · SSD fino a 4 TB', en: 'Additional M.2 2280 slot · SSD up to 4 TB' } },
      { label: 'spec.display', value: { it: '14,6" OLED touch · 3:2 · 3120 × 2080 · fino a 120 Hz · 258 ppi', en: '14.6" OLED touch · 3:2 · 3120 × 2080 · up to 120 Hz · 258 ppi' } },
      { label: 'spec.color', value: { it: '100% DCI-P3 · ΔE medio ≈ 0,3 · 500 nit tipici / 1600 nit picco HDR · PWM 2160 Hz', en: '100% DCI-P3 · average ΔE ≈ 0.3 · 500 nits typical / 1600 nits HDR peak · 2160 Hz PWM' } },
      { label: 'spec.size', value: { it: '316,77 × 225 × 14,95 mm · lega di magnesio + fibra di carbonio · apertura 160°', en: '316.77 × 225 × 14.95 mm · magnesium alloy + carbon fibre · 160° opening' } },
      { label: 'spec.weight', value: { it: 'Circa 1,08 kg', en: 'Approx. 1.08 kg' } },
      { label: 'spec.battery', value: { it: '72 Wh · USB-C · alimentatore GaN 100 W incluso', en: '72 Wh · USB-C · included 100 W GaN adapter' } },
      { label: 'spec.ports', value: { it: '1× Thunderbolt 4 (40 Gbps) · 1× USB-C 3.2 Gen2 (10 Gbps) · 1× USB-A 3.2 Gen1 (5 Gbps) · HDMI 2.1 TMDS · jack combo 3,5 mm', en: '1× Thunderbolt 4 (40 Gbps) · 1× USB-C 3.2 Gen2 (10 Gbps) · 1× USB-A 3.2 Gen1 (5 Gbps) · HDMI 2.1 TMDS · 3.5 mm combo jack' } },
      { label: 'spec.net', value: 'Wi-Fi 6E (802.11ax) · 2×2 MIMO · Bluetooth 5.3' },
      { label: 'spec.keyboard', value: { it: 'Retroilluminazione a 4 livelli · corsa 1,3 mm · lettore impronte nel pulsante di accensione · layout da confermare', en: 'Four-level backlight · 1.3 mm travel · fingerprint reader in power button · layout to be confirmed' } },
      { label: 'spec.touchpad', value: { it: 'Touchpad a pressione · 139,65 × 92,80 mm · circa 129 cm²', en: 'Pressure-sensitive touchpad · 139.65 × 92.80 mm · approx. 129 cm²' } },
      { label: 'spec.audio', value: { it: '2× speaker da 2 W · Dolby Atmos · 2 microfoni · webcam 1080p', en: '2× 2 W speakers · Dolby Atmos · dual microphones · 1080p webcam' } },
      { label: 'spec.system', value: { it: 'Profilo Compud Linux da validare prima della conferma', en: 'Compud Linux profile to be validated before confirmation' } },
    ],
    options: {
      ram: [{ id: '32', label: '32 GB LPDDR5X-9600', addCents: 0 }],
      ssd: [{ id: '1000', label: '1 TB NVMe PCIe 4.0', addCents: 0 }],
      os: [{ id: 'compud', label: { it: 'Compud Linux · su verifica', en: 'Compud Linux · subject to validation' }, addCents: 0 }],
    },
  },

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
    basePriceCents: 99919,
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

/** A single mini PC: section links go straight to its configurator. */
export const miniPcProduct = products.find((p) => (p.section ?? 'miniPc') === 'miniPc');

export const miniPcHref = (lang: Lang): string =>
  miniPcProduct ? href(lang, 'product', miniPcProduct.slug) : href(lang, 'miniPc');

/** A single NAS: section links go straight to its configurator. */
export const nasProduct = products.find((p) => p.section === 'nas');

export const nasHref = (lang: Lang): string =>
  nasProduct ? href(lang, 'nasProduct', nasProduct.slug) : href(lang, 'nas');

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
