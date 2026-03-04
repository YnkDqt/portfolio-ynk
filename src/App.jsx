import { useState, useEffect } from "react";

function useMeta() {
  useEffect(() => {
    document.title = "Yannick Dequant — Résilience organisationnelle";
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
    link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23b85c35'/><circle cx='50' cy='50' r='22' fill='%23fdf8f3'/></svg>";
  }, []);
}

const NAVS = ["expertise","projets","articles"];
const NAVLABELS = { expertise:"Expertise", projets:"Projets", articles:"Articles" };

// id = numéro d'ordre de publication (01 = premier publié)
// Ordre du tableau = ordre d'affichage (01 en haut → 03 en bas)
const ARTICLES = [
  {
    id: 1,
    cat: "Rétrospective",
    date: "6 janvier 2026",
    title: "Résilience organisationnelle – Les enseignements clés de 2025 pour préparer 2026",
    excerpt: "Panne électrique en Espagne, crashs Cloudflare, explosion des cyberattaques, durcissement réglementaire DORA, NIS2, CRA. Rétrospective sur les perturbations de 2025 et les apprentissages concrets à en tirer.",
    tags: ["Résilience","DORA","NIS2","Cybersécurité","IA"],
    intro: "Dans un contexte mondial marqué par des crises simultanées — pannes de réseau, ruptures logistiques, tensions géopolitiques et attaques numériques — la résilience organisationnelle s'impose comme une compétence stratégique essentielle. Les événements de 2025 ont révélé que la résilience ne peut plus être conçue comme un simple plan de secours : elle doit être intégrée dans l'ADN des organisations et présente dans chaque activité.\n\nVoici les enseignements concrets à retenir.",
    sections: [
      { heading: "Continuité des activités : préparer l'inattendu", content: "En avril 2025, une panne géante d'électricité a plongé l'Espagne et le Portugal dans le noir pendant plusieurs heures, paralysant les télécommunications, les transports et de nombreux services essentiels. Cette crise a mis en lumière la fragilité des infrastructures critiques face à des événements en cascade.\n\nFin 2025, Cloudflare a connu plusieurs interruptions majeures affectant jusqu'à 28 % du trafic mondial. Ces incidents rappellent que la dépendance à des services tiers, même robustes, nécessite une planification proactive de la redondance et des scénarios de basculement.\n\nLa crise climatique et les fortes chaleurs de l'été ont également montré leurs effets sur la continuité : les canicules remettent en question la capacité des systèmes industriels et services publics à fonctionner en dehors des plages de températures prévues.\n\nDans ce contexte, il est primordial de connaître ses activités critiques, d'avoir défini des délais maximums d'interruption acceptables (RTO/RPO), de lister les dépendances clés et de se préparer à leur défaillance." },
      { heading: "Gestion des tiers et fournisseurs : une stratégie de contournement plus qu'un contrat", content: "Les tensions géopolitiques et commerciales continuent de peser sur les chaînes d'approvisionnement mondiales. Les conflits, les hausses de droits de douane et la dépendance à des acteurs uniques — comme la Chine pour les terres rares — créent des vulnérabilités qui peuvent bloquer l'ensemble de la chaîne de distribution.\n\nEn France, début 2025, une pénurie de médicaments a illustré concrètement cette fragilité : la production de principes actifs dépendait jusqu'à 80 % de l'Inde et de la Chine.\n\nPour sécuriser ses activités, il devient essentiel de cartographier les dépendances critiques, de diversifier les sources d'approvisionnement et de développer des stratégies de proximité, de stockage stratégique, voire d'autonomie locale." },
      { heading: "Technologies : opportunités et menaces", content: "La cybersécurité est au cœur de la résilience technologique. Les volumes d'incidents cybercriminels continuent d'augmenter, ciblant notamment les secteurs critiques (santé, énergie, transports). Les attaques sont de plus en plus menées par des « hacktivistes » soutenant des États.\n\nL'intelligence artificielle, sans doute le sujet clé de 2025, joue un rôle ambivalent. Elle constitue à la fois un facteur d'amplification des risques (phishing ciblé, deepfakes, attaques automatisées) et un levier majeur de robustesse (veille informationnelle, détection d'anomalies, simulation de scénarios de crise).\n\nL'enjeu n'est pas l'IA en elle-même, mais sa gouvernance : intégrée dans une stratégie de résilience globale, elle peut transformer une menace potentielle en avantage stratégique." },
      { heading: "Ressources humaines : anticiper la guerre des talents", content: "L'un des défis les plus récents est la « guerre des talents », notamment dans les domaines technologiques avancés. La pénurie de profils spécialisés conduit à des stratégies d'attraction agressives — Meta a offert 1,5 milliard de dollars sur six ans pour recruter l'un des plus grands talents en IA.\n\nPour rester compétitives et résilientes, les organisations doivent investir dans la gestion prévisionnelle des emplois et des compétences (GPEC), la formation continue et la fidélisation des talents clés. Cela réduit les risques de rupture opérationnelle liés à un déficit de compétences." },
      { heading: "Légal et juridique : conformité et responsabilité accrues", content: "L'environnement réglementaire a évolué rapidement en 2025, avec trois textes majeurs qui structurent la résilience numérique en Europe :\n\nDORA (Digital Operational Resilience Act) renforce la résilience opérationnelle dans le secteur financier. La directive NIS2 élargit les obligations de gestion des risques cyber dans l'UE. Le Cyber Resilience Act (CRA) oblige les fabricants à intégrer des exigences de sécurité dans les produits numériques.\n\nEn France, la réforme 2025 de la protection des données introduit de nouvelles obligations pour les grandes organisations. Les décisions judiciaires récentes confirment par ailleurs la responsabilité personnelle des dirigeants en cas de négligence dans la gestion des risques.\n\nPour rester conformes, les organisations doivent adopter une culture de résilience globale, avec une gouvernance claire et une exigence de sécurité dès la conception." },
      { heading: "Conclusion : vers une résilience globale", content: "Les crises de 2025 confirment que la résilience ne se limite pas à un plan de reprise d'activité ou à la cybersécurité. Elle nécessite une approche globale, intégrant les dimensions humaines, technologiques, environnementales, juridiques et géopolitiques.\n\nPour 2026, les organisations les plus robustes seront celles qui adoptent une vision globale dépassant les silos, construisent leur résilience dès la conception, anticipent grâce à des exercices réguliers, collaborent avec des partenaires publics et privés, et restent agiles face aux chocs externes." },
    ]
  },
  {
    id: 2,
    cat: "Analyse",
    date: "2 février 2026",
    title: "Géopolitique et résilience – Intégrer l'instabilité dans les choix structurels",
    excerpt: "En 2026, les tensions géopolitiques grandissantes mettent sous pression les équilibres sur lesquels reposent de nombreuses organisations. La géopolitique s'impose désormais comme un facteur opérationnel de résilience à part entière.",
    tags: ["Géopolitique","Résilience","Souveraineté","Continuité"],
    intro: "En 2026, les tensions géopolitiques grandissantes continuent de mettre sous pression les équilibres sur lesquels reposent de nombreuses organisations, révélant la fragilité de modèles longtemps considérés comme stables. Conflits régionaux, sanctions internationales et politiques protectionnistes n'affectent plus uniquement les échanges internationaux : ils impactent désormais la capacité même des organisations à fonctionner normalement, dans un environnement devenu durablement instable.\n\nLongtemps cantonnée aux analyses macroéconomiques, la géopolitique s'impose aujourd'hui comme un facteur opérationnel de résilience organisationnelle. Selon le baromètre des dirigeants français 2026, l'instabilité internationale est l'une des principales préoccupations des organisations, qui cherchent à « tenir le cap dans un monde instable ».\n\nUn des exemples les plus parlants est la prise de conscience de l'Union Européenne de sa dépendance aux infrastructures technologiques américaines — 90 % du cloud européen — et la volonté de reprendre en main sa souveraineté technologique.",
    sections: [
      { heading: "Souveraineté : définir pour agir efficacement", content: "Face à ces évolutions, la notion de souveraineté revient régulièrement dans les discours. Souveraineté technologique, énergétique, alimentaire, industrielle ou juridique : le terme est omniprésent, mais souvent mal défini.\n\nEn résilience organisationnelle, l'idée de souveraineté ne signifie pas de relocaliser et contrôler l'ensemble de ses activités et dépendances. Elle interroge plutôt la maîtrise des dépendances critiques : Quelles sont mes dépendances critiques et où sont-elles localisées ? Lesquelles exposent l'organisation à un risque de rupture brutale ? Quelles alternatives existent en cas de contrainte géopolitique ?\n\nLa prise de conscience des enjeux de souveraineté conduit de plus en plus d'organisations à s'interroger sur le recours à des solutions locales pour leurs dépendances critiques." },
      { heading: "Ce qui change", content: "Ce qui change fondamentalement, ce n'est pas l'existence des tensions géopolitiques, mais leur traduction directe dans le fonctionnement quotidien des organisations.\n\nDes décisions politiques prises à l'étranger peuvent désormais restreindre l'accès à des technologies critiques, fragiliser des fournisseurs clés, perturber les flux financiers, imposer des contraintes juridiques extraterritoriales, créer des ruptures soudaines dans des chaînes de valeur mondialisées.\n\nL'actualité récente illustre cette réalité : qu'il s'agisse de sanctions internationales, de restrictions d'accès à certains services numériques ou de dépendances technologiques devenues visibles, les organisations découvrent que des éléments perçus comme acquis peuvent, du jour au lendemain, devenir indisponibles. Dans ce contexte, la résilience ne se limite plus à gérer des incidents techniques ou des crises ponctuelles : elle doit intégrer des scénarios de contraintes politiques, économiques et juridiques." },
      { heading: "Continuité d'activité", content: "Les plans de continuité d'activité ont souvent été conçus autour de scénarios techniques et temporaires — pannes électriques, cyberattaques, interruptions localisées. Les ruptures géopolitiques viennent élargir ces scénarios avec des sanctions contre des individus ou des organisations étrangères, des restrictions commerciales ou financières, des décisions politiques unilatérales affectant les services internationaux.\n\nCes ruptures ne sont ni techniques, ni temporaires. Elles peuvent rendre indisponibles un service ou un fournisseur sans possibilité de reprise rapide.\n\nUn exemple frappant est celui du juge français Nicolas Guillou, sanctionné par les États-Unis à la suite de décisions prises dans le cadre de la Cour pénale internationale. Ces mesures ont eu des conséquences concrètes sur sa capacité à utiliser des services financiers et technologiques présents en Europe, du fait du rôle dominant de certains systèmes de paiement et services cloud liés aux États-Unis. Ce cas illustre que des événements géopolitiques peuvent, sans lien direct avec une organisation elle-même, modifier l'accessibilité à des dépendances critiques." },
      { heading: "Gestion des tiers et fournisseurs", content: "Les sanctions internationales redessinent le paysage économique et peuvent rendre inopérants des contrats pourtant solides sur le papier. La dépendance à des fournisseurs étrangers, parfois concentrés sur une même zone géographique ou soumis à une même juridiction, devient un risque systémique.\n\nUne interruption imposée par décision politique peut affecter l'accès à des services essentiels (cloud, paiements), la capacité à recevoir des technologies ou matériels, des échanges financiers ou logistiques.\n\nLa résilience fournisseur ne consiste donc plus uniquement à évaluer la solidité d'un partenaire, mais à comprendre l'environnement géopolitique et juridique dans lequel il opère. Elle passe par la diversification et la capacité à activer des alternatives crédibles." },
      { heading: "Technologies", content: "Les infrastructures technologiques figurent parmi les domaines les plus exposés aux tensions géopolitiques. L'extraterritorialité de certaines législations, combinée à la capacité d'un État à restreindre l'accès à des services numériques, soulève une question centrale pour la résilience : que se passe-t-il lorsqu'un outil critique devient indisponible pour des raisons politiques ?\n\nCloud, éditeurs logiciels, solutions de paiement ou outils de communication reposent fréquemment sur des acteurs étrangers, soumis à des décisions étatiques unilatérales. Un choix technologique n'est jamais neutre du point de vue de la résilience — c'est aussi un choix géopolitique.\n\nDes leviers émergent : la diversification des solutions, le recours à des acteurs locaux ou l'intégration de briques open source permettent de réduire certaines dépendances critiques et d'améliorer la résilience globale du système." },
      { heading: "Ressources humaines", content: "Les tensions géopolitiques ont également des impacts humains directs, souvent sous-estimés. Dans un environnement instable, la mobilité internationale et l'accès aux talents deviennent des enjeux critiques. Restrictions migratoires, sanctions ou évolutions politiques rapides peuvent affecter la capacité à attirer, retenir ou mobiliser des compétences clés.\n\nCes tensions peuvent également peser sur la stabilité des équipes et la perception de l'avenir, avec des effets indirects mais durables sur l'engagement et la performance.\n\nLa résilience des ressources humaines doit intégrer la capacité des équipes à absorber ces chocs externes par la diffusion des connaissances, la formalisation des processus et la réduction de la dépendance à des acteurs clés à risque." },
      { heading: "Légal et juridique", content: "Sanctions internationales, évolutions réglementaires rapides et extraterritorialité du droit rendent le cadre juridique plus instable et parfois contradictoire. Des décisions politiques peuvent impacter directement les relations contractuelles, les obligations de conformité et la responsabilité des dirigeants.\n\nLes organisations évoluent désormais dans un environnement où plusieurs régimes juridiques se superposent, avec des risques accrus de conflits de normes ou de non-conformité subie.\n\nFace à cette complexité, la résilience passe par une approche juridique proactive, intégrée à l'analyse globale des dépendances. Les dirigeants voient leur responsabilité renforcée, tant dans le choix des partenaires que dans la capacité à démontrer une démarche de diligence raisonnable." },
      { heading: "Conclusion", content: "La géopolitique n'est plus un simple bruit de fond. Elle constitue désormais un facteur structurant de la résilience organisationnelle.\n\nIntégrer la géopolitique dans une démarche de résilience ne consiste pas à prédire l'avenir, mais à adopter une approche lucide et structurée. Les organisations les plus robustes seront celles qui auront su identifier leurs dépendances critiques, mesurer leur exposition à des décisions politiques, intégrer ces contraintes dans leurs choix structurels, préparer des options opérationnelles adaptées et tester des scénarios réalistes." },
    ]
  },
  {
    id: 3,
    cat: "Analyse",
    date: "10 mars 2026",
    title: "IA et exercices de crise : simuler l'imprévisible pour mieux y résister",
    excerpt: "La plupart des exercices de crise testent les plans dans des conditions connues, avec des équipes préparées et un calendrier fixé à l'avance. Ce n'est pas de la simulation — c'est de la répétition structurée. L'IA change cette équation.",
    tags: ["IA","Exercices de crise","Résilience","Continuité","Simulation"],
    intro: "En résilience opérationnelle, la qualité d'un plan de continuité d'activité ne se mesure pas à son épaisseur. Elle se mesure à sa capacité à tenir sous pression.\n\nDans la réalité, la plupart des exercices de crise souffrent d'un même défaut : ils testent le plan dans des conditions connues, avec des équipes préparées, selon un calendrier fixé à l'avance. Ce n'est pas de la simulation. C'est de la répétition structurée.\n\nEn 2026, l'intelligence artificielle change la donne : elle permet aux équipes de vivre les exercices de façon directe, avec des conséquences imprévues à leurs actions, se rapprochant des conditions de crise réelle.",
    sections: [
      { heading: "Les limites des exercices traditionnels", content: "Tester un PCA est une exigence reconnue. L'ISO 22301, référentiel de management de la continuité d'activité, recommande des exercices réguliers pour valider les plans et identifier les failles. DORA l'impose depuis 2025 pour les acteurs financiers. La bonne pratique est connue : tester au moins une fois par an.\n\nDans la réalité, ces exercices prennent le plus souvent la forme d'exercices sur table — des simulations en groupe où les participants discutent de leurs réponses à un scénario fictif, dans une salle de réunion, avec le plan sous les yeux.\n\nCes exercices ont de la valeur. Ils sensibilisent, créent une culture commune, révèlent certaines lacunes organisationnelles. Mais ils présentent des angles morts majeurs : les scénarios sont connus à l'avance ou facilement anticipables, les participants jouent le jeu dans des conditions optimales, les interactions en temps réel sont difficiles à reproduire fidèlement, et les plans sont consultés pendant l'exercice là où en situation réelle ils ne le sont souvent pas, faute de temps.\n\nPar définition, un plan de continuité ne peut être définitif. Il doit être mis à jour en fonction du contexte et des retours d'expérience — mais la mise à jour ne suffit pas si l'exercice lui-même ne permet pas de révéler les vraies failles." },
      { heading: "Ce que l'IA change dans la simulation de crise", content: "Les simulations assistées par l'IA permettent de reproduire fidèlement les comportements des acteurs, les interactions et la dynamique des événements, offrant une expérience immersive difficile à obtenir avec des exercices traditionnels.\n\nDes scénarios dynamiques et imprévisibles. Là où un exercice classique suit un script fixe, l'IA peut générer des scénarios évolutifs qui s'adaptent en temps réel aux décisions prises par les équipes. Une décision de communication mal calibrée peut ainsi déclencher une nouvelle séquence d'événements — comme dans une crise réelle.\n\nUne accélération du tempo. Les simulations accélérées permettent de tester en quelques heures des scénarios qui se déploieraient sur plusieurs semaines dans la réalité. Cette compression du temps est précieuse : elle permet de simuler des crises longues — rupture d'approvisionnement, crise réputationnelle, escalade géopolitique — sans mobiliser les équipes pendant des jours.\n\nUne analyse objective des performances. Les outils génèrent des tableaux de bord, mesurent les temps de réaction, identifient les goulots d'étranglement décisionnels — sans complaisance.\n\nDes simulations immersives multi-acteurs. Ces exercices sont particulièrement efficaces pour former les cellules de crise à gérer la pression médiatique et les décisions rapides, préparer les porte-parole à répondre en temps réel, et tester la coordination des équipes sur des incidents multisectoriels.\n\nDes propositions de stratégie de contournement. Une fois l'exercice terminé, l'IA peut — en se basant sur le comportement des acteurs et les meilleures pratiques du marché — proposer des stratégies adaptées, avec une vision transverse que les équipes n'ont pas toujours en interne." },
      { heading: "Un exemple concret : l'ANSSI et le Sommet pour l'Action sur l'IA", content: "La dimension institutionnelle de ces approches est déjà visible. Dans le contexte du Sommet pour l'Action sur l'IA de février 2025, l'ANSSI a organisé un exercice de gestion de crise en collaboration avec le Campus Cyber. L'objectif était notamment de renforcer les échanges entre les communautés de professionnels de l'IA et d'experts de la cybersécurité, afin d'identifier les mesures de gouvernance, de défense et de résilience nécessaires pour accroître la sécurité des systèmes d'IA.\n\nCe type d'exercice hybride — où l'IA est à la fois le sujet et l'outil — illustre une évolution de fond : les organisations les plus exposées intègrent déjà ces approches dans leur préparation opérationnelle." },
      { heading: "Les conditions de succès", content: "L'IA ne transforme pas un mauvais exercice en bon exercice. Elle amplifie la qualité de ce qui est déjà bien conçu — et révèle plus directement ce qui ne l'est pas.\n\nDes données fiables en entrée. La qualité des simulations dépend directement de la qualité des données disponibles : cartographie des activités critiques, inventaire des dépendances, historique des incidents. Un BIA solide reste le prérequis indispensable.\n\nUne gouvernance claire de l'outil. La supervision humaine reste essentielle. Déléguer la conception des scénarios à l'IA sans cadre de validation expose à des simulations déconnectées du contexte réel de l'organisation.\n\nUne intégration dans une démarche continue. Un exercice IA isolé n'a pas plus de valeur qu'un exercice tabletop isolé. C'est la capacité à itérer rapidement — intégrer les retours d'expérience, faire évoluer les scénarios — qui en fait un levier durable, pas un événement ponctuel.\n\nNe pas confondre simulation et résilience. Simuler mieux ne signifie pas être plus résilient. L'exercice, aussi sophistiqué soit-il, ne vaut que si ses enseignements sont traduits en décisions concrètes : mise à jour des plans, ajustement des seuils de déclenchement, renforcement des alternatives identifiées comme fragiles." },
      { heading: "Conclusion", content: "Les organisations qui testent leurs plans dans des conditions trop confortables créent une illusion de préparation. La crise réelle n'annonce pas son scénario, ne prévient pas de son timing, et ne laisse pas le temps de consulter le plan page par page.\n\nL'IA ne supprime pas l'imprévu. Mais elle permet de s'y confronter de manière plus réaliste, plus fréquente et plus instructive que les approches traditionnelles. Elle rend les exercices moins confortables — et c'est précisément là sa valeur.\n\nCe qui distingue les organisations véritablement résilientes, ce n'est pas la qualité de leur documentation. C'est leur capacité à apprendre vite, à ajuster en continu, et à transformer chaque simulation — même imparfaite — en décision opérationnelle concrète.\n\nUn plan qui n'a jamais été mis sous pression réelle n'est qu'une hypothèse. L'IA offre aujourd'hui les moyens de le tester autrement — plus souvent, plus profondément, plus honnêtement." },
    ]
  }
];

const PROJETS = [
  {
    id: "cdpq", featured: true,
    title: "Résilience organisationnelle — CDPQ",
    org: "Caisse de dépôt et placement du Québec",
    period: "2023 – Présent",
    tags: ["PCA/BCP","ServiceNow BCM","IA","ISO 22301","BIA","Gouvernance"],
    shortDesc: "Mission longue durée pour structurer une approche globale de la résilience au sein d'un investisseur institutionnel à portée mondiale.",
    context: "La Caisse de dépôt et placement du Québec (CDPQ) est l'un des plus grands investisseurs institutionnels en Amérique du Nord, gérant plus de 400 milliards de dollars d'actifs à l'échelle mondiale. Dans un environnement marqué par la multiplication des crises — cyber, géopolitiques, climatiques — la CDPQ a engagé une démarche structurée pour renforcer sa résilience opérationnelle à l'échelle de l'organisation.",
    missions: [
      { title: "Cadre de résilience global", desc: "Conception et déploiement d'un cadre de résilience organisationnelle couvrant l'ensemble des dimensions : continuité des activités, gestion des tiers, résilience technologique, ressources humaines et conformité réglementaire. Coordination avec les équipes de gouvernance, risk et compliance." },
      { title: "BIA et cartographie des processus critiques", desc: "Analyse d'impact sur les activités (BIA) pour identifier les processus critiques, les dépendances clés et les délais maximums d'interruption acceptables (RTO/RPO). Cartographie complète des interdépendances organisationnelles et technologiques." },
      { title: "Plans de continuité d'activité (PCA)", desc: "Rédaction et formalisation des plans de continuité pour les activités critiques identifiées lors du BIA. Définition des stratégies de continuité, des ressources nécessaires et des procédures de basculement. Tests et exercices de validation réguliers." },
      { title: "Déploiement ServiceNow BCM", desc: "Paramétrage et déploiement de ServiceNow Business Continuity Management pour automatiser et centraliser les processus de résilience. Configuration des workflows, intégration avec les outils ITSM existants, formation des équipes métiers et techniques." },
      { title: "IA de veille informationnelle", desc: "Mise en place d'une solution de veille basée sur l'IA pour anticiper les risques émergents — géopolitiques, réglementaires, sectoriels. Paramétrage des alertes, définition des sources, intégration dans le dispositif de gestion des risques." },
      { title: "KPIs de maturité résilience", desc: "Définition et suivi d'indicateurs de maturité pour mesurer la progression de la démarche. Tableaux de bord pour le COMEX et les équipes opérationnelles, reporting régulier et plans d'amélioration continue." },
    ]
  },
  {
    id: "fusion-assurances",
    title: "Harmonisation de processus — Fusion d'assurances",
    org: "CGI Montréal", period: "2022–2023",
    tags: ["Process management","Fusion","Change management","AS-IS/TO-BE"],
    shortDesc: "Analyse et harmonisation des processus métiers lors de la fusion de deux compagnies d'assurance.",
    context: "Dans le cadre de la fusion de deux entités d'assurance, la direction a mandaté une démarche d'harmonisation des processus métiers pour garantir la continuité des opérations et réduire les frictions liées à l'intégration des deux organisations.",
    missions: [
      { title: "Cartographie AS-IS", desc: "Analyse et documentation des processus existants des deux entités. Identification des divergences, redondances et points de friction. Ateliers avec les parties prenantes métiers pour valider la compréhension de l'existant." },
      { title: "Conception TO-BE", desc: "Co-construction du modèle cible avec les équipes métiers. Priorisation des harmonisations selon leur impact business et leur complexité de mise en œuvre. Validation par les sponsors du projet." },
      { title: "Gestion des interdépendances", desc: "Identification et gestion des dépendances entre les chantiers d'harmonisation. Coordination avec les équipes SI pour assurer l'alignement entre les processus et les systèmes d'information." },
      { title: "Accompagnement au changement", desc: "Définition et mise en œuvre du plan de conduite du changement. Communication auprès des équipes impactées, formations et accompagnement des managers dans la transition." },
    ]
  },
  {
    id: "lab-idees",
    title: "Laboratoire d'idées orienté client",
    org: "CGI Montréal", period: "2022–2024",
    tags: ["Innovation","Co-création","Animation","Design thinking"],
    shortDesc: "Création et animation d'un laboratoire d'idées pour favoriser l'innovation interne et la co-création avec les clients.",
    context: "Face à la nécessité d'innover et de renforcer les relations avec les clients, CGI Montréal a lancé un laboratoire d'idées visant à structurer une démarche d'innovation collaborative entre les équipes internes et les parties prenantes externes.",
    missions: [
      { title: "Création du laboratoire", desc: "Conception du cadre méthodologique du lab : processus d'idéation, critères de sélection des idées, mécanismes de prototypage et d'expérimentation. Mise en place des outils et de la gouvernance." },
      { title: "Animation des sessions", desc: "Organisation et animation de sessions d'idéation avec les équipes internes et les clients. Facilitation des ateliers de co-création, synthèse des idées et priorisation collective." },
      { title: "Suivi des initiatives", desc: "Accompagnement des idées sélectionnées jusqu'à leur développement. Suivi des indicateurs de performance et reporting auprès de la direction." },
    ]
  },
  {
    id: "erp",
    title: "Aide au choix d'un ERP",
    org: "CGI Paris", period: "2020–2021",
    tags: ["ERP","Analyse","Recommandation","Appel d'offres"],
    shortDesc: "Accompagnement dans la sélection d'un ERP : définition des besoins, consultation des éditeurs, recommandation et pilotage.",
    context: "Un client du secteur industriel souhaitait remplacer son système de gestion existant par un ERP moderne, adapté à ses enjeux de croissance et d'intégration des processus métiers et financiers.",
    missions: [
      { title: "Définition des besoins", desc: "Recueil et formalisation des besoins fonctionnels et techniques auprès des différentes directions métiers. Construction du cahier des charges et des critères de sélection." },
      { title: "Consultation des éditeurs", desc: "Identification des éditeurs pertinents, pilotage du processus d'appel d'offres, organisation des démonstrations et évaluation des solutions selon les critères définis." },
      { title: "Analyse comparative et recommandation", desc: "Analyse multicritères des solutions en compétition. Rédaction du rapport de recommandation avec argumentaire détaillé et plan de déploiement proposé." },
      { title: "Pilotage de l'implémentation", desc: "Accompagnement dans les premières phases d'implémentation : coordination entre le client et l'intégrateur, suivi des jalons, gestion des risques projet." },
    ]
  },
  {
    id: "sirh",
    title: "SIRH Formation",
    org: "CGI Paris", period: "2019–2021",
    tags: ["SIRH","Formation","Conduite du changement","Paramétrage"],
    shortDesc: "Intégration d'un module de gestion de la formation dans un SIRH existant.",
    context: "Un client grand compte souhaitait intégrer la gestion de la formation à son SIRH existant, pour centraliser le suivi des parcours de développement des collaborateurs et automatiser les processus administratifs associés.",
    missions: [
      { title: "Recueil des besoins", desc: "Analyse des processus existants de gestion de la formation. Ateliers avec les équipes RH et les managers pour formaliser les besoins et les cas d'usage prioritaires." },
      { title: "Paramétrage de la solution", desc: "Configuration du module formation : workflows d'approbation, catalogue de formations, gestion des sessions, intégration avec les référentiels RH existants." },
      { title: "Tests et recettes", desc: "Coordination des phases de tests utilisateurs, recueil des retours et corrections. Validation de la conformité fonctionnelle avec les spécifications." },
      { title: "Formation et conduite du changement", desc: "Conception et animation des formations utilisateurs (équipes RH, managers, collaborateurs). Rédaction des guides et supports. Accompagnement post-déploiement." },
    ]
  },
  {
    id: "web3",
    title: "Communauté Web3 / Blockchain",
    org: "CGI Montréal", period: "2022–2023",
    tags: ["Web3","Blockchain","Innovation","Communauté"],
    shortDesc: "Création et animation d'une communauté interne pour sensibiliser les équipes aux technologies émergentes.",
    context: "Face à l'essor des technologies Web3 et Blockchain, CGI Montréal a souhaité structurer une veille active et une montée en compétences collective sur ces sujets, afin d'anticiper les opportunités et risques associés pour ses clients.",
    missions: [
      { title: "Structuration de la communauté", desc: "Définition du cadre : objectifs, gouvernance, fréquence des échanges. Recrutement des membres fondateurs et lancement officiel." },
      { title: "Animation et veille", desc: "Organisation de sessions de partage régulières, curation de contenus pertinents, invitation de speakers experts. Maintien de l'engagement des membres dans la durée." },
      { title: "Sensibilisation interne", desc: "Production de synthèses et livrables de vulgarisation à destination des équipes non-spécialistes. Présentation des cas d'usage sectoriels pertinents pour CGI et ses clients." },
    ]
  },
  {
    id: "rpa",
    title: "Automatisation des process RH",
    org: "CGI Paris", period: "2020–2022",
    tags: ["RPA","Automatisation","RH","Process"],
    shortDesc: "Développement d'une offre RPA appliquée aux processus RH : identification des cas d'usage, conception et pilote.",
    context: "Pour répondre à la demande croissante des clients en matière d'automatisation, CGI Paris a développé une offre RPA (Robotic Process Automation) spécifiquement adaptée aux processus RH, depuis l'identification des cas d'usage jusqu'au déploiement.",
    missions: [
      { title: "Identification des cas d'usage", desc: "Analyse des processus RH candidats à l'automatisation (onboarding, gestion des absences, reporting RH). Évaluation de la valeur ajoutée et de la faisabilité technique de chaque cas." },
      { title: "Conception de la solution", desc: "Spécification des scénarios d'automatisation retenus. Collaboration avec les équipes techniques pour le développement des robots. Définition des indicateurs de performance." },
      { title: "Pilote et généralisation", desc: "Déploiement pilote chez un client test, recueil des retours, ajustements. Documentation de l'offre pour déploiement à l'ensemble du portefeuille clients CGI." },
    ]
  },
];

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { font-family:'DM Sans',sans-serif; background:#fdf8f3; color:#2a1810; -webkit-font-smoothing:antialiased; line-height:1.65; font-size:17px; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
  .au{animation:fadeUp .7s ease both}
  .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}.d4{animation-delay:.4s}
  .hl{transition:transform .22s,box-shadow .22s}
  .hl:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(80,40,20,.12)}
  .lc:hover{color:#b85c35!important}
  .art-body p{margin-bottom:1.5em;font-size:17px;line-height:1.9;color:#6b5040}
  @media(max-width:768px){
    .mh{display:none!important}
    .m1{grid-template-columns:1fr!important}
    .mp{padding:28px 20px!important}
  }
`;

function Ey({ children, light, style }) {
  return <div style={{ fontSize:12, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:500, color:light?"rgba(255,255,255,0.35)":"#b85c35", display:"flex", alignItems:"center", gap:8, ...style }}>{children}</div>;
}
function Btn({ children, onClick, href, outline, style, sm }) {
  const base = { display:"inline-flex", alignItems:"center", gap:6, padding:sm?"11px 22px":"13px 28px", borderRadius:24, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:sm?14:16, fontWeight:500, letterSpacing:"0.02em", textDecoration:"none", whiteSpace:"nowrap", transition:"all .2s", background:outline?"transparent":"#b85c35", color:outline?"#b85c35":"#fff", border:outline?"1.5px solid #b85c35":"none", ...style };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={base}>{children}</a>;
  return <button onClick={onClick} style={base}>{children}</button>;
}
function Tag({ children, dark }) {
  return <span style={{ padding:"5px 12px", borderRadius:3, fontSize:12, fontWeight:500, background:dark?"rgba(255,255,255,0.08)":"#fdf0ec", color:dark?"rgba(255,255,255,0.6)":"#b85c35" }}>{children}</span>;
}
function Card({ children, style, className, onClick }) {
  return <div className={className} onClick={onClick} style={{ background:"#fff", border:"1px solid #ecddd0", borderRadius:8, padding:32, ...style }}>{children}</div>;
}
function BackBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontSize:14, color:"rgba(255,255,255,.4)", fontFamily:"'DM Sans',sans-serif", padding:0, marginBottom:32, transition:"color .18s" }}
      onMouseEnter={e => e.currentTarget.style.color="#b85c35"}
      onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,.4)"}>
      ← {label}
    </button>
  );
}

function Nav({ view, setView }) {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const go = id => { setOp(false); setView(id); window.scrollTo({ top:0, behavior:"smooth" }); };
  const active = n => view === n || view.startsWith(n.replace(/s$/,"") + "-");
  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:sc?"rgba(253,248,243,.96)":"transparent", borderBottom:sc?"1px solid #ecddd0":"none", backdropFilter:sc?"blur(14px)":"none", transition:"all .3s" }}>
        <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 40px", height:72, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div onClick={() => go("accueil")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:9, height:9, borderRadius:"50%", background:"#b85c35" }} />
            <span style={{ fontFamily:"'Fraunces',serif", fontSize:21, fontWeight:400, color:"#2a1810" }}>Yannick Dequant</span>
          </div>
          <div className="mh" style={{ display:"flex", alignItems:"center", gap:32 }}>
            {NAVS.map(n => (
              <span key={n} onClick={() => go(n)} className="lc" style={{ fontSize:16, cursor:"pointer", transition:"color .18s", color:active(n)?"#b85c35":"#6b5040", fontWeight:active(n)?500:400 }}>{NAVLABELS[n]}</span>
            ))}
            <Btn onClick={() => go("contact")} sm>Me contacter</Btn>
          </div>
          <button onClick={() => setOp(!op)} className="mbg" style={{ background:"none", border:"none", cursor:"pointer", flexDirection:"column", gap:5, padding:4, display:"none" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width:24, height:2, background:"#2a1810", transition:"all .22s", transform:op?(i===0?"rotate(45deg) translate(4.5px,4.5px)":i===2?"rotate(-45deg) translate(4.5px,-4.5px)":"scaleX(0)"):"none", opacity:op&&i===1?0:1 }} />
            ))}
          </button>
        </div>
      </nav>
      <div style={{ position:"fixed", top:72, left:0, right:0, bottom:0, zIndex:199, background:"#faf5ee", padding:"40px", display:"flex", flexDirection:"column", transform:op?"translateX(0)":"translateX(100%)", transition:"transform .28s ease" }}>
        {["accueil",...NAVS].map(n => (
          <div key={n} onClick={() => go(n)} style={{ padding:"22px 0", borderBottom:"1px solid #ecddd0", fontFamily:"'Fraunces',serif", fontSize:34, fontWeight:300, color:active(n)?"#b85c35":"#2a1810", cursor:"pointer" }}>
            {n==="accueil"?"Accueil":NAVLABELS[n]}
          </div>
        ))}
        <div style={{ marginTop:32 }}><Btn onClick={() => go("contact")}>Me contacter</Btn></div>
      </div>
      <style>{`.mbg{display:none!important}@media(max-width:768px){.mbg{display:flex!important}}`}</style>
    </>
  );
}

function Hero({ setView }) {
  // Hero sidebar shows articles in reverse order (most recent first)
  const heroArticles = [...ARTICLES].reverse();
  return (
    <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", paddingTop:72, background:"#fdf8f3" }}>
      <div style={{ maxWidth:1180, margin:"0 auto", padding:"64px 40px 40px", width:"100%" }}>
        <div className="au" style={{ height:3, marginBottom:56, borderRadius:2, background:"linear-gradient(90deg,#b85c35 0%,#d4956a 55%,#f0e8dc 100%)" }} />
        <div style={{ display:"grid", gridTemplateColumns:"1.45fr 1fr", gap:60, alignItems:"start" }} className="m1">
          <div>
            <Ey style={{ marginBottom:20 }} className="au d1">Senior Business Analyst</Ey>
            <h1 className="au d2" style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(44px,5.5vw,74px)", fontWeight:300, lineHeight:1.05, color:"#2a1810", marginBottom:28, letterSpacing:"-0.01em" }}>
              Résilience<br/>organisationnelle<br/>& <em style={{ fontStyle:"italic", color:"#b85c35" }}>continuité</em><br/>d'activité.
            </h1>
            <p className="au d3" style={{ fontSize:19, color:"#6b5040", lineHeight:1.85, maxWidth:460, marginBottom:40 }}>
              Analyse des dépendances critiques, plans de continuité d'activité, déploiement ServiceNow BCM. Certifié CBCI. Mission longue durée à la CDPQ depuis 2023.
            </p>
            <div className="au d4" style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <Btn onClick={() => setView("expertise")}>Mon expertise →</Btn>
              <Btn outline onClick={() => setView("contact")}>Me contacter</Btn>
            </div>
            <div className="au d4" style={{ display:"flex", gap:44, marginTop:56, paddingTop:32, borderTop:"1px solid #ecddd0" }}>
              {[["7+","Ans d'expérience"],["CBCI","Certifié · The BCI"],["CDPQ","Mission en cours"],["22301","ISO maîtrisé"]].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:400, color:"#2a1810", lineHeight:1, marginBottom:7 }}>{v}</div>
                  <div style={{ fontSize:13, color:"#b0987e" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="au d3" style={{ display:"flex", flexDirection:"column", gap:12, paddingTop:6 }}>
            <div style={{ fontSize:12, color:"#b0987e", letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:4 }}>Dernières analyses</div>
            {heroArticles.map((a,i) => (
              <div key={a.id} onClick={() => setView(`article-${a.id}`)} className="hl"
                style={{ background:i===0?"#b85c35":"#fff", border:`1px solid ${i===0?"#b85c35":"#ecddd0"}`, borderRadius:7, padding:"16px 18px", cursor:"pointer", boxShadow:"0 1px 6px rgba(80,40,20,.06)" }}>
                <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:7, color:i===0?"rgba(255,255,255,.55)":"#b0987e" }}>{a.cat}</div>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:17, lineHeight:1.35, marginBottom:7, color:i===0?"#fff":"#2a1810" }}>{a.title}</div>
                <div style={{ fontSize:13, color:i===0?"rgba(255,255,255,.45)":"#c8b5a0" }}>{a.date}</div>
              </div>
            ))}
            <div onClick={() => setView("articles")} style={{ fontSize:14, color:"#b85c35", fontWeight:500, textAlign:"right", cursor:"pointer", marginTop:2 }}>
              Voir tous les articles →
            </div>
          </div>
        </div>
        <div style={{ textAlign:"center", marginTop:64, opacity:.35 }}>
          <div style={{ fontSize:11, color:"#b0987e", letterSpacing:"0.12em", marginBottom:8 }}>DÉCOUVRIR</div>
          <div style={{ fontSize:20, color:"#b0987e", animation:"pulse 1.8s ease infinite" }}>↓</div>
        </div>
      </div>
    </section>
  );
}

function SectionAbout({ setView }) {
  const parc = [
    { period:"2023 →", org:"Indépendant — Portage salarial", role:"Business Analyst Senior · Résilience", cur:true },
    { period:"2022–2025", org:"CGI Montréal", role:"Business Analyst Senior" },
    { period:"2019–2022", org:"CGI Paris", role:"Consultant SIRH" },
  ];
  return (
    <section style={{ background:"#faf5ee", padding:"110px 40px" }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:80, alignItems:"start" }} className="m1">
          <div style={{ position:"sticky", top:90 }}>
            <Ey style={{ marginBottom:18 }}>À propos</Ey>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(40px,4.5vw,58px)", fontWeight:300, color:"#2a1810", lineHeight:1.1, marginBottom:28 }}>Yannick<br/>Dequant</h2>
            <p style={{ fontSize:18, color:"#6b5040", lineHeight:1.9, marginBottom:32 }}>Consultant senior en résilience organisationnelle, passionné de systémique et de prospective. Je construis des organisations capables d'absorber les chocs et de se transformer face à l'incertitude.</p>
            <Btn outline onClick={() => setView("expertise")} sm>Voir mon expertise</Btn>
          </div>
          <div>
            <div style={{ marginBottom:52 }}>
              <div style={{ fontSize:12, color:"#b0987e", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:18, paddingBottom:14, borderBottom:"1px solid #ecddd0" }}>Vision</div>
              <p style={{ fontSize:18, color:"#2a1810", lineHeight:1.9, marginBottom:22 }}>Chaque démarche de résilience est unique. Elle nécessite une écoute attentive pour comprendre les enjeux, les objectifs et les contraintes — puis une construction rigoureuse qui ancre la résilience dans le fonctionnement quotidien de l'organisation, pas seulement dans des plans de secours.</p>
              <div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>
                {["Adaptabilité","Systémique","Prospective","Transparence","Rigueur"].map(q => (
                  <span key={q} style={{ padding:"5px 12px", borderRadius:3, fontSize:13, fontWeight:500, background:"#fdf0ec", color:"#b85c35" }}>{q}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:12, color:"#b0987e", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:22, paddingBottom:14, borderBottom:"1px solid #ecddd0" }}>Parcours</div>
              {parc.map((p,i) => (
                <div key={i} style={{ display:"grid", gridTemplateColumns:"110px 1fr", gap:24, padding:"22px 0", borderBottom:i<parc.length-1?"1px solid #f5ede4":"none", alignItems:"start" }}>
                  <div style={{ fontSize:14, color:"#b0987e", paddingTop:3 }}>{p.period}</div>
                  <div>
                    <div style={{ fontSize:14, color:"#b0987e", marginBottom:5 }}>{p.org}</div>
                    <div style={{ fontFamily:"'Fraunces',serif", fontSize:20, fontWeight:400, color:"#2a1810", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                      {p.role}
                      {p.cur && <span style={{ padding:"3px 9px", background:"#e8eede", color:"#4a5a38", fontSize:10, fontWeight:600, borderRadius:2, textTransform:"uppercase", letterSpacing:"0.06em" }}>En cours</span>}
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:28 }}><Btn outline onClick={() => setView("projets")} sm>Voir mes projets →</Btn></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionExpertise({ setView }) {
  const d = [
    { icon:"◈", title:"Analyse des risques & dépendances", desc:"Cartographie des dépendances critiques, exposition géopolitique, risques systémiques et tiers." },
    { icon:"◉", title:"Continuité d'activité", desc:"BIA, plans PCA/BCP, tests et exercices de validation. Approche conforme ISO 22301." },
    { icon:"◇", title:"IA & Résilience", desc:"Veille informationnelle, détection d'anomalies, simulation de scénarios de crise assistée par IA." },
    { icon:"△", title:"Formation & gouvernance", desc:"Sensibilisation des équipes, KPIs de maturité, culture de résilience organisationnelle." },
    { icon:"◎", title:"Analyse métier & changement", desc:"Recueil des besoins, cartographie des processus AS-IS/TO-BE, conduite du changement." },
    { icon:"◆", title:"Intégration des systèmes", desc:"Déploiement ServiceNow BCM, SIRH, ERP, RPA. Paramétrage, intégration et formation." },
  ];
  return (
    <section style={{ background:"#fdf8f3", padding:"110px 40px" }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <div style={{ marginBottom:56, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:20 }}>
          <div>
            <Ey style={{ marginBottom:16 }}>Expertise</Ey>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(36px,4vw,52px)", fontWeight:300, color:"#2a1810", lineHeight:1.1 }}>Domaines<br/>d'intervention</h2>
          </div>
          <Btn outline onClick={() => setView("expertise")} sm>Voir en détail →</Btn>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
          {d.map((x,i) => (
            <Card key={i} className="hl" style={{ padding:"28px 30px" }}>
              <div style={{ fontSize:22, color:"#b85c35", marginBottom:16 }}>{x.icon}</div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:22, fontWeight:400, color:"#2a1810", marginBottom:12, lineHeight:1.2 }}>{x.title}</div>
              <p style={{ fontSize:16, color:"#6b5040", lineHeight:1.85 }}>{x.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionArticles({ setView }) {
  // Section homepage shows most recent first
  const displayed = [...ARTICLES].reverse();
  return (
    <section style={{ background:"#2a1810", padding:"110px 40px" }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:52, flexWrap:"wrap", gap:20 }}>
          <div>
            <Ey light style={{ marginBottom:16 }}>Analyses & Réflexions</Ey>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(36px,4vw,52px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.1 }}>Dernières<br/>publications</h2>
          </div>
          <Btn onClick={() => setView("articles")}>Tous les articles →</Btn>
        </div>
        {displayed.map((a) => (
          <div key={a.id} onClick={() => setView(`article-${a.id}`)} style={{ display:"grid", gridTemplateColumns:"90px 1fr 36px", gap:32, padding:"32px 0", borderBottom:"1px solid rgba(255,255,255,.07)", cursor:"pointer", alignItems:"center", transition:"padding-left .2s" }}
            onMouseEnter={e => e.currentTarget.style.paddingLeft="12px"}
            onMouseLeave={e => e.currentTarget.style.paddingLeft="0"}>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:48, fontWeight:300, color:"rgba(255,255,255,.08)", lineHeight:1 }}>{String(a.id).padStart(2,"0")}</div>
            <div>
              <div style={{ fontSize:12, color:"#b85c35", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:9 }}>{a.cat} · {a.date}</div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(20px,2.2vw,27px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.3, marginBottom:10 }}>{a.title}</div>
              <p style={{ fontSize:15, color:"rgba(255,255,255,.35)", lineHeight:1.75, maxWidth:600 }}>{a.excerpt}</p>
            </div>
            <div style={{ fontSize:22, color:"rgba(255,255,255,.18)" }}>→</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionCTA({ setView }) {
  return (
    <section style={{ background:"#faf5ee", padding:"110px 40px", textAlign:"center" }}>
      <div style={{ maxWidth:580, margin:"0 auto" }}>
        <Ey style={{ justifyContent:"center", marginBottom:20 }}>Contact</Ey>
        <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(34px,4vw,52px)", fontWeight:300, color:"#2a1810", lineHeight:1.15, marginBottom:24 }}>
          Parlons de votre<br/><em style={{ fontStyle:"italic", color:"#b85c35" }}>démarche de résilience.</em>
        </h2>
        <p style={{ fontSize:18, color:"#6b5040", lineHeight:1.85, marginBottom:40 }}>Continuité d'activité, dépendances critiques, déploiement ServiceNow BCM — échangeons sur vos enjeux.</p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <Btn onClick={() => setView("contact")}>Démarrer une conversation</Btn>
          <Btn outline href="https://www.linkedin.com/in/yannick-dequant/">LinkedIn →</Btn>
        </div>
      </div>
    </section>
  );
}

function PageExpertise() {
  const expertises = [
    { num:"01", title:"Analyse des risques & dépendances", desc:"Cartographie des dépendances critiques : activités, technologies, tiers, compétences. Évaluation de l'exposition géopolitique, réglementaire et opérationnelle. Identification des scénarios de rupture et quantification des impacts.", tags:["Cartographie","Géopolitique","Tiers","Risques systémiques"] },
    { num:"02", title:"Continuité d'activité (BIA, PCA, Exercices)", desc:"Analyse d'impact sur les activités (BIA), définition des processus critiques et délais maximums d'interruption (RTO/RPO). Rédaction et mise en place des plans de continuité. Organisation d'exercices de validation et post-mortems structurés.", tags:["BIA","RTO/RPO","PCA/BCP","Exercices"] },
    { num:"03", title:"IA & Résilience", desc:"Intégration de l'IA dans les démarches de résilience : veille informationnelle automatisée, détection d'anomalies, simulation de scénarios de crise. Gouvernance et implémentation éthique dans les processus opérationnels.", tags:["IA","Veille","Simulation","Gouvernance IA"] },
    { num:"04", title:"Formation & gouvernance", desc:"Structuration d'approches globales dépassant les silos organisationnels. Sensibilisation et formation des équipes, marketing interne de la résilience. Définition et suivi de KPIs de maturité, coordination inter-équipes.", tags:["Gouvernance","Formation","KPIs","Change management"] },
    { num:"05", title:"Analyse métier & accompagnement au changement", desc:"Recueil et formalisation des besoins métiers, modélisation des processus AS-IS/TO-BE. Identification des écarts et recommandations. Conduite du changement, communication et accompagnement des équipes dans les transformations.", tags:["Business Analysis","Processus","AS-IS/TO-BE","Change management"] },
    { num:"06", title:"Intégration des systèmes & outils métiers", desc:"Déploiement et paramétrage expert de ServiceNow BCM. Intégration de solutions SIRH, ERP et RPA. Recueil des besoins techniques, configuration, tests et formation des utilisateurs. Coordination entre équipes métiers et SI.", tags:["ServiceNow BCM","SIRH","ERP","RPA"] },
  ];
  return (
    <div style={{ paddingTop:72 }}>
      <section style={{ background:"#2a1810", padding:"90px 40px 80px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto" }}>
          <Ey light style={{ marginBottom:22 }}>Expertise</Ey>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(44px,6vw,80px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.05, marginBottom:24 }}>Domaines<br/><em style={{ fontStyle:"italic", color:"rgba(240,232,220,.4)" }}>d'intervention</em></h1>
          <p style={{ fontSize:19, color:"rgba(255,255,255,.38)", maxWidth:520, lineHeight:1.85 }}>Une approche globale de la résilience — de l'analyse des dépendances critiques à la gouvernance opérationnelle.</p>
        </div>
      </section>
      <section style={{ padding:"80px 40px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:22 }}>
            {expertises.map((e,i) => (
              <Card key={i} className="hl" style={{ display:"flex", flexDirection:"column", padding:"32px" }}>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:48, fontWeight:300, color:"#f0e8dc", lineHeight:1, marginBottom:24 }}>{e.num}</div>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:23, fontWeight:400, color:"#2a1810", marginBottom:14, lineHeight:1.2 }}>{e.title}</div>
                <p style={{ fontSize:16, color:"#6b5040", lineHeight:1.85, flex:1, marginBottom:22 }}>{e.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>{e.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PageProjets({ setView }) {
  const featured = PROJETS.find(p => p.featured);
  const autres = PROJETS.filter(p => !p.featured);
  return (
    <div style={{ paddingTop:72 }}>
      <section style={{ background:"#2a1810", padding:"90px 40px 80px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto" }}>
          <Ey light style={{ marginBottom:22 }}>Projets</Ey>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(44px,6vw,80px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.05 }}>Réalisations</h1>
        </div>
      </section>
      <section style={{ padding:"80px 40px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto" }}>
          <div style={{ marginBottom:72 }}>
            <div style={{ fontSize:12, color:"#b0987e", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:22 }}>Projet principal en cours</div>
            <div onClick={() => setView(`projet-${featured.id}`)} className="hl mp m1"
              style={{ background:"#2a1810", borderRadius:8, padding:"52px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:52, cursor:"pointer" }}>
              <div>
                <div style={{ fontSize:12, color:"#b85c35", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:18 }}>{featured.period} · {featured.org}</div>
                <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(26px,3vw,36px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.2, marginBottom:26 }}>{featured.title}</h2>
                <div style={{ display:"flex", flexWrap:"wrap", gap:9 }}>{featured.tags.map(t => <Tag key={t} dark>{t}</Tag>)}</div>
              </div>
              <div>
                <p style={{ fontSize:16, color:"rgba(255,255,255,.5)", lineHeight:1.9, marginBottom:26 }}>{featured.shortDesc}</p>
                {featured.missions.map((m,i) => (
                  <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:"#b85c35", marginTop:9, flexShrink:0 }} />
                    <span style={{ fontSize:15, color:"rgba(255,255,255,.5)", lineHeight:1.75 }}>{m.title}</span>
                  </div>
                ))}
                <div style={{ marginTop:28, fontSize:14, color:"#b85c35", fontWeight:500 }}>Voir le détail →</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize:12, color:"#b0987e", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:26 }}>Autres projets</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
            {autres.map(p => (
              <Card key={p.id} className="hl" onClick={() => setView(`projet-${p.id}`)} style={{ display:"flex", flexDirection:"column", padding:"30px", cursor:"pointer" }}>
                <div style={{ fontSize:13, color:"#b0987e", marginBottom:10 }}>{p.period} · {p.org}</div>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:21, fontWeight:400, color:"#2a1810", marginBottom:14, lineHeight:1.3, flex:1 }}>{p.title}</div>
                <p style={{ fontSize:15, color:"#6b5040", lineHeight:1.85, marginBottom:20 }}>{p.shortDesc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:18 }}>{p.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
                <div style={{ fontSize:14, color:"#b85c35", fontWeight:500 }}>Voir le détail →</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PageProjetDetail({ id, setView }) {
  const projet = PROJETS.find(p => p.id === id);
  if (!projet) return null;
  return (
    <div style={{ paddingTop:72 }}>
      <section style={{ background:"#2a1810", padding:"90px 40px 80px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto" }}>
          <BackBtn onClick={() => setView("projets")} label="Tous les projets" />
          <div style={{ fontSize:12, color:"#b85c35", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:18 }}>{projet.period} · {projet.org}</div>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(32px,4.5vw,60px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.1, marginBottom:28 }}>{projet.title}</h1>
          <div style={{ display:"flex", flexWrap:"wrap", gap:9 }}>{projet.tags.map(t => <Tag key={t} dark>{t}</Tag>)}</div>
        </div>
      </section>
      <section style={{ padding:"72px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ marginBottom:56 }}>
            <div style={{ fontSize:12, color:"#b0987e", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:20, paddingBottom:14, borderBottom:"1px solid #ecddd0" }}>Contexte</div>
            <p style={{ fontSize:18, color:"#6b5040", lineHeight:1.9 }}>{projet.context}</p>
          </div>
          <div>
            <div style={{ fontSize:12, color:"#b0987e", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:24, paddingBottom:14, borderBottom:"1px solid #ecddd0" }}>
              {projet.featured ? "Périmètre de la mission" : "Réalisations"}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {projet.missions.map((m,i) => (
                <div key={i} style={{ display:"grid", gridTemplateColumns:"40px 1fr", gap:20, alignItems:"start" }}>
                  <div style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:300, color:"#f0e8dc", lineHeight:1, paddingTop:6 }}>{String(i+1).padStart(2,"0")}</div>
                  <div style={{ background:"#faf5ee", border:"1px solid #ecddd0", borderRadius:8, padding:"24px 28px" }}>
                    <div style={{ fontFamily:"'Fraunces',serif", fontSize:20, fontWeight:400, color:"#2a1810", marginBottom:10 }}>{m.title}</div>
                    <p style={{ fontSize:16, color:"#6b5040", lineHeight:1.85 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop:64, display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:32, borderTop:"1px solid #ecddd0", flexWrap:"wrap", gap:16 }}>
            <Btn outline onClick={() => setView("projets")} sm>← Tous les projets</Btn>
            <Btn onClick={() => setView("contact")} sm>Me contacter</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

function PageArticles({ setView }) {
  return (
    <div style={{ paddingTop:72 }}>
      <section style={{ background:"#2a1810", padding:"90px 40px 80px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto" }}>
          <Ey light style={{ marginBottom:22 }}>Articles</Ey>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(44px,6vw,80px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.05, marginBottom:18 }}>
            Analyses &<br/><em style={{ fontStyle:"italic", color:"rgba(240,232,220,.38)" }}>Réflexions</em>
          </h1>
          <p style={{ fontSize:19, color:"rgba(255,255,255,.35)", maxWidth:500, lineHeight:1.85 }}>Analyses concrètes sur la résilience organisationnelle et les enjeux opérationnels des grandes organisations.</p>
        </div>
      </section>
      <section style={{ padding:"80px 40px" }}>
        <div style={{ maxWidth:940, margin:"0 auto" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:26 }}>
            {[...ARTICLES].reverse().map((a) => (
              <div key={a.id} onClick={() => setView(`article-${a.id}`)} className="hl"
                style={{ display:"grid", gridTemplateColumns:"110px 1fr", gap:40, background:"#fff", border:"1px solid #ecddd0", borderRadius:8, padding:"42px", cursor:"pointer" }}>
                <div>
                  <div style={{ fontFamily:"'Fraunces',serif", fontSize:64, fontWeight:300, color:"#f0e8dc", lineHeight:1, marginBottom:12 }}>{String(a.id).padStart(2,"0")}</div>
                  <div style={{ fontSize:14, color:"#b0987e" }}>{a.date}</div>
                </div>
                <div>
                  <div style={{ fontSize:12, color:"#b85c35", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:12 }}>{a.cat}</div>
                  <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(22px,2.5vw,30px)", fontWeight:400, color:"#2a1810", lineHeight:1.25, marginBottom:16 }}>{a.title}</h2>
                  <p style={{ fontSize:17, color:"#6b5040", lineHeight:1.85, marginBottom:22 }}>{a.excerpt}</p>
                  <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:18 }}>{a.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
                  <div style={{ fontSize:14, color:"#b85c35", fontWeight:500 }}>Lire l'article →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PageArticleDetail({ id, setView }) {
  const article = ARTICLES.find(a => a.id === id);
  if (!article) return null;
  return (
    <div style={{ paddingTop:72 }}>
      <section style={{ background:"#2a1810", padding:"90px 40px 80px" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <BackBtn onClick={() => setView("articles")} label="Tous les articles" />
          <div style={{ fontSize:12, color:"#b85c35", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:18 }}>{article.cat} · {article.date}</div>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(28px,4vw,52px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.1, marginBottom:28 }}>{article.title}</h1>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>{article.tags.map(t => <Tag key={t} dark>{t}</Tag>)}</div>
        </div>
      </section>
      <section style={{ padding:"72px 40px" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <div style={{ marginBottom:52, paddingBottom:48, borderBottom:"1px solid #ecddd0" }}>
            {article.intro.split("\n\n").map((p,i) => (
              <p key={i} style={{ fontSize:19, color:"#2a1810", lineHeight:1.9, marginBottom:"1.4em", fontWeight:300 }}>{p}</p>
            ))}
          </div>
          {article.sections.map((s,i) => (
            <div key={i} style={{ marginBottom:48, paddingBottom:48, borderBottom:i<article.sections.length-1?"1px solid #ecddd0":"none" }}>
              <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(22px,2.5vw,32px)", fontWeight:400, color:"#2a1810", lineHeight:1.2, marginBottom:24 }}>{s.heading}</h2>
              <div className="art-body">{s.content.split("\n\n").map((p,j) => <p key={j}>{p}</p>)}</div>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:32, flexWrap:"wrap", gap:16 }}>
            <Btn outline onClick={() => setView("articles")} sm>← Tous les articles</Btn>
            <Btn outline href="https://www.linkedin.com/in/yannick-dequant/" sm>Me suivre sur LinkedIn →</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

function PageContact() {
  return (
    <div style={{ paddingTop:72 }}>
      <section style={{ background:"#2a1810", padding:"90px 40px 80px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto" }}>
          <Ey light style={{ marginBottom:22 }}>Contact</Ey>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(44px,6vw,80px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.05 }}>
            Parlons de votre<br/><em style={{ fontStyle:"italic", color:"rgba(240,232,220,.38)" }}>démarche de résilience.</em>
          </h1>
        </div>
      </section>
      <section style={{ padding:"80px 40px" }}>
        <div style={{ maxWidth:1060, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start" }} className="m1">
          <div>
            <p style={{ fontSize:18, color:"#6b5040", lineHeight:1.9, marginBottom:48 }}>Que vous souhaitiez structurer votre démarche de résilience, mettre en place un plan de continuité, évaluer vos dépendances critiques ou déployer ServiceNow BCM — je suis disponible pour en discuter.</p>
            {[
              { label:"Email", val:"yannick.dequant@gmail.com", href:"mailto:yannick.dequant@gmail.com" },
              { label:"LinkedIn", val:"linkedin.com/in/yannick-dequant", href:"https://www.linkedin.com/in/yannick-dequant/" },
              { label:"Localisation", val:"Aix-en-Provence, France", href:null },
              { label:"Mode", val:"Remote / Présentiel", href:null },
            ].map(c => (
              <div key={c.label} style={{ paddingBottom:22, marginBottom:22, borderBottom:"1px solid #ecddd0" }}>
                <div style={{ fontSize:12, letterSpacing:"0.14em", textTransform:"uppercase", color:"#b0987e", marginBottom:8 }}>{c.label}</div>
                {c.href
                  ? <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:18, color:"#b85c35", fontWeight:500, textDecoration:"underline", textUnderlineOffset:4 }}>{c.val}</a>
                  : <div style={{ fontSize:18, color:"#2a1810" }}>{c.val}</div>}
              </div>
            ))}
          </div>
          <Card style={{ background:"#faf5ee", borderColor:"#f0e8dc", padding:"38px" }}>
            <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:300, color:"#2a1810", marginBottom:32 }}>Disponibilités</h3>
            {[
              { label:"Statut", val:"Indépendant — Portage salarial" },
              { label:"Type de missions", val:"Longue durée privilégiée" },
              { label:"Secteurs cibles", val:"Finance, investissement institutionnel, grandes organisations" },
            ].map((d,i,arr) => (
              <div key={d.label} style={{ padding:"17px 0", borderBottom:i<arr.length-1?"1px solid #ecddd0":"none" }}>
                <div style={{ fontSize:12, color:"#b0987e", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:7 }}>{d.label}</div>
                <div style={{ fontSize:16, color:"#2a1810", fontWeight:500 }}>{d.val}</div>
              </div>
            ))}
            <div style={{ marginTop:36, display:"flex", flexDirection:"column", gap:12 }}>
              <Btn href="https://www.linkedin.com/in/yannick-dequant/">Me contacter sur LinkedIn</Btn>
              <Btn outline href="mailto:yannick.dequant@gmail.com">Envoyer un email</Btn>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Footer({ setView }) {
  const go = id => { setView(id); window.scrollTo({ top:0, behavior:"smooth" }); };
  return (
    <footer style={{ background:"#2a1810", padding:"40px", borderTop:"1px solid rgba(255,255,255,.05)" }}>
      <div style={{ maxWidth:1180, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:18 }}>
        <div style={{ fontFamily:"'Fraunces',serif", fontSize:17, fontWeight:300, color:"rgba(255,255,255,.3)" }}>Yannick Dequant</div>
        <div style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
          {NAVS.map(n => (
            <span key={n} onClick={() => go(n)} className="lc" style={{ fontSize:14, color:"rgba(255,255,255,.22)", cursor:"pointer", transition:"color .18s" }}
              onMouseEnter={e => e.target.style.color="rgba(255,255,255,.6)"}
              onMouseLeave={e => e.target.style.color="rgba(255,255,255,.22)"}>
              {NAVLABELS[n]}
            </span>
          ))}
        </div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,.15)" }}>© 2026</div>
      </div>
    </footer>
  );
}

export default function App() {
  const [view, setView] = useState("accueil");
  useMeta();
  const go = v => { setView(v); window.scrollTo({ top:0, behavior:"smooth" }); };
  return (
    <>
      <style>{G}</style>
      <Nav view={view} setView={go} />
      <main>
        {view === "accueil"   && <><Hero setView={go}/><SectionAbout setView={go}/><SectionExpertise setView={go}/><SectionArticles setView={go}/><SectionCTA setView={go}/></>}
        {view === "expertise" && <PageExpertise />}
        {view === "projets"   && <PageProjets setView={go} />}
        {view === "articles"  && <PageArticles setView={go} />}
        {view === "contact"   && <PageContact />}
        {view.startsWith("projet-")  && <PageProjetDetail id={view.replace("projet-","")} setView={go} />}
        {view.startsWith("article-") && <PageArticleDetail id={parseInt(view.replace("article-",""))} setView={go} />}
      </main>
      <Footer setView={go} />
    </>
  );
}
