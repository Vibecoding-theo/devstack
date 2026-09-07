import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

type LegalSection = {
  heading: string;
  body: string[];
};

type LegalPageContent = {
  title: string;
  description: string;
  sections: LegalSection[];
};

const LAST_UPDATED = 'septembre 2026';

const legalPages: Record<string, LegalPageContent> = {
  'mentions-legales': {
    title: 'Mentions légales',
    description: 'Mentions légales du site DevStack.',
    sections: [
      {
        heading: 'Éditeur du site',
        body: [
          'Le site DevStack est édité par son créateur, à titre personnel.',
          'Contact : à travers le formulaire de la page de connexion ou par email à l’adresse indiquée lors de la prise de contact.',
        ],
      },
      {
        heading: 'Hébergement',
        body: [
          'Le site est hébergé par l’infrastructure d’hébergement choisie par l’éditeur. Les coordonnées complètes de l’hébergeur sont disponibles sur simple demande.',
        ],
      },
      {
        heading: 'Propriété intellectuelle',
        body: [
          'L’ensemble des éléments du site (structure, textes, visuels, design) est protégé par le droit de la propriété intellectuelle. Toute reproduction sans autorisation préalable est interdite.',
          'Les composants que vous ajoutez à votre bibliothèque restent votre propriété exclusive : vous conservez tous vos droits sur votre code.',
        ],
      },
      {
        heading: 'Responsabilité',
        body: [
          'L’éditeur met tout en œuvre pour assurer le bon fonctionnement du site mais ne peut garantir l’absence totale d’erreurs ou d’interruptions de service.',
          'L’utilisation du site se fait sous la responsabilité de l’utilisateur.',
        ],
      },
    ],
  },
  confidentialite: {
    title: 'Politique de confidentialité',
    description: 'Comment DevStack traite vos données personnelles (RGPD).',
    sections: [
      {
        heading: 'Données collectées',
        body: [
          'Compte : lors de la création d’un compte, nous collectons votre adresse email et un mot de passe chiffré.',
          'Bibliothèque : les composants que vous enregistrez sont stockés pour vous permettre d’y accéder depuis l’application.',
          'Données locales : votre clé d’API pour les fonctionnalités IA est stockée uniquement dans votre navigateur (localStorage) et n’est jamais transmise à nos serveurs.',
        ],
      },
      {
        heading: 'Finalités et bases légales',
        body: [
          'Les données sont utilisées uniquement pour fournir le service : authentification, sauvegarde de votre bibliothèque et amélioration de votre expérience.',
          'La base légale est l’exécution du contrat (article 6.1.b du RGPD) pour les données liées au service, et votre consentement pour celles optionnelles.',
        ],
      },
      {
        heading: 'Conservation',
        body: [
          'Vos données sont conservées pendant toute la durée d’utilisation du service, puis supprimées à la demande ou lorsque le compte est résilié.',
        ],
      },
      {
        heading: 'Vos droits (RGPD)',
        body: [
          'Vous disposez des droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données.',
          'Pour exercer ces droits, contactez-nous depuis votre compte ou par email. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).',
        ],
      },
      {
        heading: 'Sous-traitants IA',
        body: [
          'Les fonctionnalités d’analyse IA font appel à un fournisseur tiers (Groq) uniquement avec votre propre clé d’API, configurée localement dans votre navigateur. Aucune donnée n’est envoyée sans votre action explicite.',
        ],
      },
    ],
  },
  conditions: {
    title: "Conditions générales d'utilisation",
    description: "Conditions d'utilisation du service DevStack.",
    sections: [
      {
        heading: 'Objet',
        body: [
          'DevStack est une bibliothèque personnelle de composants : elle permet de centraliser, rechercher et réutiliser vos composants de code, avec l’aide de l’IA pour les intégrer.',
        ],
      },
      {
        heading: 'Compte et accès',
        body: [
          'L’utilisation du service nécessite la création d’un compte avec une adresse email valide.',
          'Vous êtes responsable de la confidentialité de vos identifiants.',
        ],
      },
      {
        heading: 'Offres et tarifs',
        body: [
          'Plan Gratuit : 3 composants maximum, import manuel, export JSON. Gratuit et sans limite de durée.',
          'Plan Premium : composants illimités, import intelligent IA, export en tout format, génération de prompts. Paiement unique de 10 € TTC, accès à vie.',
          'Vous pouvez passer du plan Gratuit au Premium à tout moment ; vos composants sont conservés.',
        ],
      },
      {
        heading: 'Propriété du code',
        body: [
          'Vous restez l’unique propriétaire des composants que vous stockez. DevStack n’acquiert aucun droit sur votre code et ne le partage pas avec des tiers.',
        ],
      },
      {
        heading: 'Responsabilité',
        body: [
          'Le service est fourni « en l’état ». L’éditeur ne saurait être tenu responsable des pertes de données résultant d’une utilisation impropre ou d’un cas de force majeure.',
          'Il est recommandé d’exporter régulièrement votre bibliothèque (export JSON).',
        ],
      },
      {
        heading: 'Modification des conditions',
        body: [
          'Les présentes conditions peuvent évoluer. En cas de changement important, vous serez informé lors de votre prochaine connexion.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Politique de cookies',
    description: 'Utilisation des cookies et du stockage local par DevStack.',
    sections: [
      {
        heading: 'Cookies',
        body: [
          'DevStack n’utilise pas de cookies publicitaires ni de traceurs tiers.',
          'Un cookie de session peut être déposé lors de la connexion afin de maintenir votre session ouverte.',
        ],
      },
      {
        heading: 'Stockage local (localStorage)',
        body: [
          'Le stockage local de votre navigateur est utilisé pour :',
          '— votre bibliothèque de composants (clé devstack_components) ;',
          '— votre clé d’API IA, qui ne quitte jamais votre navigateur ;',
          '— vos préférences d’affichage (thème, etc.).',
          'Ces données restent sur votre appareil et ne sont accessibles que par le site.',
        ],
      },
      {
        heading: 'Gérer le stockage local',
        body: [
          'Vous pouvez à tout moment effacer ces données via les réglages de votre navigateur (section « Confidentialité et sécurité » → « Effacer les données de navigation » → « Cookies et données de sites »).',
          'Attention : effacer le stockage local supprime définitivement votre bibliothèque locale.',
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages[slug];
  return {
    title: page ? `${page.title} — DevStack` : 'Légal — DevStack',
    description: page?.description,
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = legalPages[slug];

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-20 md:px-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#a78bfa] transition-colors hover:text-[#e83e8c]"
        >
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          {page.title}
        </h1>
        <p className="mt-3 text-sm text-white/40">
          Dernière mise à jour : {LAST_UPDATED}
        </p>

        <div className="mt-12 space-y-10">
          {page.sections.map((section, index) => (
            <section
              key={section.heading}
              className="rounded-xl border border-[#9333ea]/15 bg-[#0f0f19]/80 p-6 md:p-8"
            >
              <h2 className="text-lg font-bold text-white">
                <span className="mr-3 bg-gradient-to-br from-[#e83e8c] to-[#9333ea] bg-clip-text text-transparent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {section.heading}
              </h2>
              <div className="mt-4 space-y-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-sm leading-7 text-white/60">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#9333ea]/10 pt-6 text-sm text-white/40">
          {Object.entries(legalPages).map(([s, p]) =>
            s === slug ? null : (
              <Link
                key={s}
                href={`/legal/${s}`}
                className="transition-colors hover:text-[#a78bfa]"
              >
                {p.title}
              </Link>
            )
          )}
        </div>
      </div>
    </main>
  );
}
