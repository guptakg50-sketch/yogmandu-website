/** Arjuna Rakhal Magar's public Yoga Alliance directory entry (ERYT 500, YACEP). */
export const YACEP_PROFILE_URL = "https://app.yogaalliance.org/teacherpublicprofile?id=0033g00000CmAtbAAF";

const YOGA_ALLIANCE = { "@type": "Organization", name: "Yoga Alliance", url: "https://www.yogaalliance.org" } as const;

/** Yoga Alliance credentials named in visible text, as schema.org objects. */
export function yogaAllianceCredentials(text: string) {
  const found: string[] = [];
  const add = (re: RegExp, name: (m: RegExpMatchArray) => string) => {
    const m = text.match(re);
    if (m) found.push(name(m));
  };
  add(/\bE-?RYT[\s-]*(200|500)\b/i, (m) => `E-RYT ${m[1]}`);
  add(/(?<!E-?)\bRYT[\s-]*(200|300|500)\b/i, (m) => `RYT ${m[1]}`);
  add(/\bYACEP\b/i, () => "YACEP (Yoga Alliance Continuing Education Provider)");
  return found.map((name) => ({
    "@type": "EducationalOccupationalCredential",
    name,
    credentialCategory: "Professional credential",
    recognizedBy: YOGA_ALLIANCE,
  }));
}

export const YACEP_PROVIDER = {
  "@type": "Organization",
  name: "Yogmandu",
  url: "https://yogmandu.com",
  // The YACEP designation is held by the founder, so it is attached to
  // the person and backed by the public Yoga Alliance directory entry.
  employee: {
    "@type": "Person",
    "@id": "https://yogmandu.com/teachers/arjuna-rakhal-magar#person",
    name: "Arjuna Rakhal Magar",
    url: "https://yogmandu.com/teachers/arjuna-rakhal-magar",
    sameAs: [YACEP_PROFILE_URL],
    hasCredential: yogaAllianceCredentials("YACEP"),
  },
};
