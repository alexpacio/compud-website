export const omarchyCopy = {
  it: {
    eyebrow: 'Il Linux che installiamo',
    title: 'Omarchy. Un ambiente pensato per sviluppare.',
    intro:
      'Omarchy unisce Arch Linux e il desktop Hyprland in una configurazione coerente per chi lavora con codice e terminale. Compud lo preinstalla sui sistemi non server e prepara gli strumenti concordati per il tuo lavoro.',
    scope:
      'Mini PC, laptop e NAS con Omarchy. I server rack usano Proxmox VE; le GPU sono componenti testati.',
    benefits: [
      {
        title: 'Più spazio al codice',
        body: 'Hyprland affianca le finestre e organizza il lavoro in spazi dedicati. Con le scorciatoie passi tra editor, terminale e documentazione senza cercare ogni finestra.',
        link: 'https://omarchy.org/manual/navigation/',
      },
      {
        title: 'Strumenti di sviluppo già insieme',
        body: 'Neovim, Docker e Docker Compose fanno parte dell’ambiente. mise gestisce versioni diverse dei linguaggi; dal menu puoi scegliere anche altri editor e runtime.',
        link: 'https://omarchy.org/manual/development-tools/',
      },
      {
        title: 'Agenti AI nel tuo flusso di lavoro',
        body: 'Menu e scorciatoie aiutano ad avviare gli agenti da terminale sul progetto. Per i modelli in locale, Compud prepara il runtime compatibile con la GPU e la memoria scelte.',
        link: 'https://omarchy.org/manual/ai/',
      },
      {
        title: 'Aggiornamenti con possibilità di recupero',
        body: 'Il profilo standard Omarchy crea snapshot di sistema prima degli aggiornamenti. Il canale stabile coordina sistema e configurazione; cifratura LUKS e firewall fanno parte dell’installazione standard.',
        link: 'https://omarchy.org/manual/updates/',
      },
    ],
    source: 'Approfondisci nel manuale',
    website: 'Scopri Omarchy',
    manual: 'Manuale ufficiale',
    note: 'La compatibilità hardware viene verificata per modello. Editor e strumenti aggiuntivi si concordano con Compud; gli eventuali account per servizi AI sono personali. Gli snapshot di sistema non sostituiscono il backup dei dati.',
  },
  en: {
    eyebrow: 'The Linux we install',
    title: 'Omarchy. An environment built for developers.',
    intro:
      'Omarchy combines Arch Linux and the Hyprland desktop in a coherent setup for people working with code and the terminal. Compud preinstalls it on non-server systems and prepares the tools agreed for your work.',
    scope:
      'Mini PCs, laptops and NAS with Omarchy. Rack servers use Proxmox VE; GPUs are tested components.',
    benefits: [
      {
        title: 'More room for your code',
        body: 'Hyprland tiles windows and organises work into dedicated workspaces. Keyboard shortcuts move you between editors, terminals and documentation without hunting for each window.',
        link: 'https://omarchy.org/manual/navigation/',
      },
      {
        title: 'Development tools already together',
        body: 'Neovim, Docker and Docker Compose are part of the environment. mise manages multiple language versions; the menu also lets you choose other editors and runtimes.',
        link: 'https://omarchy.org/manual/development-tools/',
      },
      {
        title: 'AI agents in your workflow',
        body: 'Menus and shortcuts help launch terminal agents in your project. For local models, Compud prepares a runtime compatible with your selected GPU and memory.',
        link: 'https://omarchy.org/manual/ai/',
      },
      {
        title: 'Updates with a recovery path',
        body: 'The standard Omarchy setup takes system snapshots before updates. The stable channel coordinates the system and configuration; LUKS encryption and a firewall are part of the standard installation.',
        link: 'https://omarchy.org/manual/updates/',
      },
    ],
    source: 'Read more in the manual',
    website: 'Explore Omarchy',
    manual: 'Official manual',
    note: 'Hardware compatibility is checked per model. Additional editors and tools are agreed with Compud; any AI service accounts are your own. System snapshots do not replace data backups.',
  },
} as const;
