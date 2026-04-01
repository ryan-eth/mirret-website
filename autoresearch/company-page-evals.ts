/**
 * Autoresearch Eval Runner — Mirret Company Page
 *
 * 100 evals across 10 categories measuring whether the company page
 * is optimised for converting UK ecommerce ICP (£5M-£50M revenue),
 * CISOs, and security leaders into pipeline.
 *
 * Run: npx tsx autoresearch/company-page-evals.ts
 */

import { readFileSync } from "fs";
import { join } from "path";

const PAGE_PATH = join(__dirname, "../src/app/company/page.tsx");

function getPageContent(): string {
  return readFileSync(PAGE_PATH, "utf-8");
}

function getTextContent(raw: string): string {
  // Extract only the visible prose content from the JSX
  // Find the article tag content which contains all the readable text
  const articleMatch = raw.match(/<article[^>]*>([\s\S]*?)<\/article>/);
  const content = articleMatch ? articleMatch[1] : raw;

  return content
    .replace(/<[^>]+>/g, " ")
    .replace(/&apos;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/\{\/\*.*?\*\/\}/gs, "")
    .replace(/\{" "\}/g, " ")
    .replace(/className="[^"]*"/g, "")
    .replace(/style=\{[^}]*\}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

interface Eval {
  id: number;
  category: string;
  name: string;
  test: (raw: string, text: string) => boolean;
}

const evals: Eval[] = [
  // ============================================================
  // CATEGORY 1: BP VOICE — Does it sound like PG + Ben Roy?
  // ============================================================
  {
    id: 1,
    category: "BP Voice",
    name: "No throat-clearing phrases",
    test: (_, t) =>
      !/(it's worth noting|it's important to|interestingly|in fact,|let's dive|here's the thing|at the end of the day)/i.test(t),
  },
  {
    id: 2,
    category: "BP Voice",
    name: "No adverb crutches (very/really/extremely/incredibly)",
    test: (_, t) => !/ (very|really|extremely|incredibly|absolutely) /i.test(t),
  },
  {
    id: 3,
    category: "BP Voice",
    name: "No corporate buzzwords (leverage/synergy/paradigm/ecosystem)",
    test: (_, t) => !/(leverage|synergy|paradigm shift|ecosystem|stakeholder|holistic|best-in-class)/i.test(t),
  },
  {
    id: 4,
    category: "BP Voice",
    name: "Uses first person (I/we)",
    test: (_, t) => /\bI\b/.test(t) && /\bwe\b/i.test(t),
  },
  {
    id: 5,
    category: "BP Voice",
    name: "Contains at least one admission of limitation or uncertainty",
    test: (_, t) =>
      /(I'm not sure|we can't guarantee|we don't know|not always|we're trying|honest about|anyone who tells you .* is lying)/i.test(t),
  },
  {
    id: 6,
    category: "BP Voice",
    name: "No passive voice crutches (was done by / has been achieved)",
    test: (_, t) => !/(was achieved|has been accomplished|was built by|were created by|was developed)/i.test(t),
  },
  {
    id: 7,
    category: "BP Voice",
    name: "Contains at least one analogy from everyday life",
    test: (_, t) => /(like a |it's like |as if |imagine |picture |think of it as )/i.test(t),
  },
  {
    id: 8,
    category: "BP Voice",
    name: "No ChatGPT-isms",
    test: (_, t) =>
      !/(let me explain|in today's rapidly|throughout history|in conclusion|furthermore|moreover|it is important to note)/i.test(t),
  },
  {
    id: 9,
    category: "BP Voice",
    name: "Discovers thesis (doesn't state it in first paragraph)",
    test: (_, t) => {
      const firstPara = t.slice(0, 400);
      return !/(our mission is|we believe that|mirret is a company that)/i.test(firstPara);
    },
  },
  {
    id: 10,
    category: "BP Voice",
    name: "Contains a named framework or coined term",
    test: (_, t) => /(diagnosis trap|the .* problem|the .* trap|the .* paradox|the .* gap)/i.test(t),
  },

  // ============================================================
  // CATEGORY 2: OPENING — Does the first 200 words hook the reader?
  // ============================================================
  {
    id: 11,
    category: "Opening",
    name: "Opens with observation or paradox, not definition",
    test: (_, t) => {
      const first = t.slice(0, 200).toLowerCase();
      return !first.startsWith("mirret is") && !first.startsWith("we are") && !/(defined as|according to|webster)/i.test(first);
    },
  },
  {
    id: 12,
    category: "Opening",
    name: "First sentence under 25 words",
    test: (_, t) => {
      const firstSentence = t.match(/[^.!?]+[.!?]/)?.[0] || "";
      return firstSentence.split(/\s+/).length <= 25;
    },
  },
  {
    id: 13,
    category: "Opening",
    name: "Creates tension or curiosity in first 2 paragraphs",
    test: (_, t) => {
      const first500 = t.slice(0, 500);
      return /(strange|surprising|counterintuitive|wrong|broken|nobody|ignore|blind|miss)/i.test(first500);
    },
  },
  {
    id: 14,
    category: "Opening",
    name: "First 300 chars contain no company name",
    test: (_, t) => !/mirret/i.test(t.slice(0, 300)),
  },
  {
    id: 15,
    category: "Opening",
    name: "Problem is stated before solution",
    test: (_, t) => {
      const problemIdx = t.search(/(problem|threat|attack|risk|danger|fraud)/i);
      const solutionIdx = t.search(/(mirret does|we built|we run|our service)/i);
      return problemIdx > 0 && solutionIdx > 0 && problemIdx < solutionIdx;
    },
  },
  {
    id: 16,
    category: "Opening",
    name: "No 'In today's world' or 'Throughout history' opener",
    test: (_, t) => !/(in today's|throughout history|since the dawn|in the modern)/i.test(t.slice(0, 200)),
  },
  {
    id: 17,
    category: "Opening",
    name: "First prose paragraph under 80 words",
    test: (r) => {
      // Find the first <P> component content
      const match = r.match(/<P>\s*([\s\S]*?)\s*<\/P>/);
      if (!match) return true;
      const text = match[1].replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();
      return text.split(/\s+/).length <= 80;
    },
  },
  {
    id: 18,
    category: "Opening",
    name: "Contains a specific, concrete detail in first 500 chars",
    test: (_, t) => /(\d+|domain|website|checkout|phishing|login|customer|registrar)/i.test(t.slice(0, 500)),
  },
  {
    id: 19,
    category: "Opening",
    name: "H1 headline is under 15 words",
    test: (r) => {
      const h1 = r.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]?.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, " ") || "";
      return h1.split(/\s+/).filter(Boolean).length <= 15;
    },
  },
  {
    id: 20,
    category: "Opening",
    name: "H1 contains a strong verb or tension word",
    test: (r) => {
      const h1 = r.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1] || "";
      return /(control|break|fight|find|protect|threat|danger|wrong|lock|mirror|blind|hidden|copy|steal)/i.test(h1);
    },
  },

  // ============================================================
  // CATEGORY 3: ATTACK SURFACE THESIS — Does it explain the problem?
  // ============================================================
  {
    id: 21,
    category: "Attack Surface",
    name: "Mentions 'external attack surface' explicitly",
    test: (_, t) => /external attack surface/i.test(t),
  },
  {
    id: 22,
    category: "Attack Surface",
    name: "Lists at least 4 types of external threats",
    test: (_, t) => {
      const threats = ["domain", "phishing", "marketplace", "social", "ad ", "checkout", "counterfeit", "impersonat"];
      return threats.filter(th => t.toLowerCase().includes(th)).length >= 4;
    },
  },
  {
    id: 23,
    category: "Attack Surface",
    name: "Contrasts internal vs external security spending",
    test: (_, t) => /(inside.*perimeter|endpoint.*protection|firewall|SOC|penetration test)/i.test(t) &&
      /(outside|external|don't control|can't see)/i.test(t),
  },
  {
    id: 24,
    category: "Attack Surface",
    name: "Mentions continuous/real-time scanning requirement",
    test: (_, t) => /(continuous|real.?time|24.?7|constantly|every day|every hour|2am|registered.*overnight)/i.test(t),
  },
  {
    id: 25,
    category: "Attack Surface",
    name: "Explains the verification/classification challenge",
    test: (_, t) => /(legitimate|partner|reseller|franchise|false positive|verify|classif)/i.test(t),
  },
  {
    id: 26,
    category: "Attack Surface",
    name: "Explains the takedown/enforcement challenge",
    test: (_, t) => /(takedown|enforcement|registrar|filing|escalat|platform.*decision|removal)/i.test(t),
  },
  {
    id: 27,
    category: "Attack Surface",
    name: "Quantifies the problem with specific numbers",
    test: (_, t) => /\b\d+\b.*domain/i.test(t) || /median|average|percent|third|quarter/i.test(t),
  },
  {
    id: 28,
    category: "Attack Surface",
    name: "Mentions customer harm (not just company risk)",
    test: (_, t) => /(customer.*defraud|customer.*scam|customer.*money|people.*lose|financial harm|credit card)/i.test(t),
  },
  {
    id: 29,
    category: "Attack Surface",
    name: "Frames the problem as engineering, not legal",
    test: (_, t) => /(engineering problem|not a legal|legal.*slow|cease.*desist.*weeks|automat)/i.test(t),
  },
  {
    id: 30,
    category: "Attack Surface",
    name: "Uses speed/urgency language (hours not weeks)",
    test: (_, t) => /(by lunchtime|overnight|hours|internet speed|2am|tuesday|afternoon)/i.test(t),
  },

  // ============================================================
  // CATEGORY 4: OBJECTION HANDLING — Does it address buyer concerns?
  // ============================================================
  {
    id: 31,
    category: "Objections",
    name: "Addresses 'we have a security team' objection",
    test: (_, t) => /(security team|SOC|already have|in-house team)/i.test(t),
  },
  {
    id: 32,
    category: "Objections",
    name: "Addresses 'we use threat intel' objection",
    test: (_, t) => /(threat intel|threat intelligence|indicators of compromise|IOC|C2 infrastructure|malware hash)/i.test(t),
  },
  {
    id: 33,
    category: "Objections",
    name: "Addresses 'not a priority' objection",
    test: (_, t) => /(not a priority|isn't a priority|triage|limited resource|don't have visibility)/i.test(t),
  },
  {
    id: 34,
    category: "Objections",
    name: "Addresses 'can you guarantee' objection",
    test: (_, t) => /(guarantee|can't guarantee|platform.*final|anyone who tells you.*lying)/i.test(t),
  },
  {
    id: 35,
    category: "Objections",
    name: "Objections use the buyer's own language (quoted)",
    test: (r) => (r.match(/ldquo;/g) || []).length >= 3,
  },
  {
    id: 36,
    category: "Objections",
    name: "Objection responses are empathetic, not dismissive",
    test: (_, t) => /(I understand|you do|you're right|reasonable|fair question|fair point|that's fair)/i.test(t),
  },
  {
    id: 37,
    category: "Objections",
    name: "Plumber/electrician analogy (or equivalent trade analogy)",
    test: (_, t) => /(plumber|electrician|different trade|doctor|surgeon|mechanic|carpenter)/i.test(t),
  },
  {
    id: 38,
    category: "Objections",
    name: "Includes a 'free scan' offer within objection handling",
    test: (_, t) => /free scan|run a scan|lost nothing/i.test(t),
  },
  {
    id: 39,
    category: "Objections",
    name: "Addresses dashboard fatigue explicitly",
    test: (_, t) => /(dashboard.*unused|another.*tool|dashboard.*cancel|don't want.*dashboard|dashboard.*disappear)/i.test(t),
  },
  {
    id: 40,
    category: "Objections",
    name: "Acknowledges what Mirret is NOT (self-awareness)",
    test: (_, t) => /(not for everyone|if you want.*in-house|not a dashboard|aren't|we don't|we can't)/i.test(t),
  },

  // ============================================================
  // CATEGORY 5: VALUE PROPOSITION — Is the offer clear?
  // ============================================================
  {
    id: 41,
    category: "Value Prop",
    name: "Managed service positioning is explicit",
    test: (_, t) => /managed service/i.test(t),
  },
  {
    id: 42,
    category: "Value Prop",
    name: "Describes the 3-step process (scan/verify/takedown)",
    test: (_, t) => /scan/i.test(t) && /verify|classif/i.test(t) && /takedown|enforce/i.test(t),
  },
  {
    id: 43,
    category: "Value Prop",
    name: "Mentions weekly reporting",
    test: (_, t) => /weekly report/i.test(t),
  },
  {
    id: 44,
    category: "Value Prop",
    name: "Contrasts with dashboard/self-service alternatives",
    test: (_, t) => /(dashboard|self.?service|log in|DIY|SaaS.*seat)/i.test(t),
  },
  {
    id: 45,
    category: "Value Prop",
    name: "Problem-gets-smaller framing (outcomes, not features)",
    test: (_, t) => /(problem.*smaller|threats.*go away|resolve|resolution|outcome)/i.test(t),
  },
  {
    id: 46,
    category: "Value Prop",
    name: "No feature-list format (not bullet points of capabilities)",
    test: (r) => (r.match(/<li>/g) || []).length < 3,
  },
  {
    id: 47,
    category: "Value Prop",
    name: "Explains why managed > self-service (not just asserts it)",
    test: (_, t) => /(operational burden|someone whose job|dashboard.*unused|transfer.*back|cancel)/i.test(t),
  },
  {
    id: 48,
    category: "Value Prop",
    name: "Uses the termite analogy (or equivalent visceral comparison)",
    test: (_, t) => /(termite|pest|infestation|exterminator|plumber.*termite|house.*problem)/i.test(t),
  },
  {
    id: 49,
    category: "Value Prop",
    name: "Mentions urgency handling (immediate contact for critical threats)",
    test: (_, t) => /(urgent|immediate|hear from us|critical|2am|wake.*up)/i.test(t),
  },
  {
    id: 50,
    category: "Value Prop",
    name: "Honest about platform dependency for takedowns",
    test: (_, t) => /(platform.*final|platform.*decision|registrar.*decide|can't force|can't guarantee.*removal)/i.test(t),
  },

  // ============================================================
  // CATEGORY 6: AI-NATIVE POSITIONING — Is the tech credible?
  // ============================================================
  {
    id: 51,
    category: "AI Positioning",
    name: "Distinguishes AI-native from AI-adjacent",
    test: (_, t) => /(AI.?native|built from.*ground up|designed.*around|bolt.*onto|feature.*vs)/i.test(t),
  },
  {
    id: 52,
    category: "AI Positioning",
    name: "Lists specific AI tasks (CT logs, DNS, visual similarity)",
    test: (_, t) => /(certificate transparency|DNS record|visual similarity|content classif)/i.test(t),
  },
  {
    id: 53,
    category: "AI Positioning",
    name: "Acknowledges what AI can't do (judgement calls)",
    test: (_, t) => /(human.*judgement|need.*human|experienced people|can't replicate|decision layer)/i.test(t),
  },
  {
    id: 54,
    category: "AI Positioning",
    name: "Machines search + humans decide framing",
    test: (_, t) => /(machines.*search.*human.*decid|automat.*mechanical.*human.*judgement|machine.*classification.*human.*decision)/i.test(t),
  },
  {
    id: 55,
    category: "AI Positioning",
    name: "Not the chatbot kind of AI (explicit distinction)",
    test: (_, t) => /(not.*chatbot|boring.*reliable|classification.*prioriti|pattern recognition)/i.test(t),
  },
  {
    id: 56,
    category: "AI Positioning",
    name: "No AI hype language (revolutionary/groundbreaking/cutting-edge)",
    test: (_, t) => !/(revolutionary|groundbreaking|cutting.?edge|state.?of.?the.?art|game.?chang)/i.test(t),
  },
  {
    id: 57,
    category: "AI Positioning",
    name: "Mentions gen AI enabling both attack AND defence",
    test: (_, t) => /(attack.*easier.*defen|same.*AI.*capabilities.*attack.*defen|gen.*AI.*impersonation.*easy)/i.test(t),
  },
  {
    id: 58,
    category: "AI Positioning",
    name: "Pattern recognition at scale framing",
    test: (_, t) => /pattern recognition.*scale/i.test(t),
  },
  {
    id: 59,
    category: "AI Positioning",
    name: "Describes specific data sources scanned",
    test: (_, t) => {
      const sources = ["domain", "DNS", "certificate", "marketplace", "social", "ad network"];
      return sources.filter(s => t.toLowerCase().includes(s.toLowerCase())).length >= 4;
    },
  },
  {
    id: 60,
    category: "AI Positioning",
    name: "No 'powered by AI' or 'AI-powered' generic phrasing",
    test: (_, t) => !/(powered by AI|AI-powered|AI.driven solution)/i.test(t),
  },

  // ============================================================
  // CATEGORY 7: STRUCTURE & FLOW — Is the page well-architected?
  // ============================================================
  {
    id: 61,
    category: "Structure",
    name: "Has 4-7 H2 sections (not too many, not too few)",
    test: (r) => {
      const h2s = (r.match(/<H2>|<h2/g) || []).length;
      return h2s >= 4 && h2s <= 7;
    },
  },
  {
    id: 62,
    category: "Structure",
    name: "H2 headings are short (under 8 words each)",
    test: (r) => {
      const h2s = r.match(/<H2>(.*?)<\/H2>/gs) || [];
      return h2s.every(h => h.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, " ").split(/\s+/).filter(Boolean).length <= 8);
    },
  },
  {
    id: 63,
    category: "Structure",
    name: "No section exceeds 500 words",
    test: (_, t) => {
      const sections = t.split(/Why this|The objections|What we are|Why AI|Why now|The name/i);
      return sections.every(s => s.split(/\s+/).length <= 500);
    },
  },
  {
    id: 64,
    category: "Structure",
    name: "Total word count 1500-3000 (long enough to convince, short enough to finish)",
    test: (_, t) => {
      const words = t.split(/\s+/).length;
      return words >= 1500 && words <= 3000;
    },
  },
  {
    id: 65,
    category: "Structure",
    name: "Closing returns to or transforms the opening idea",
    test: (_, t) => {
      const last300 = t.slice(-300).toLowerCase();
      const first300 = t.slice(0, 300).toLowerCase();
      // Check if closing references concepts from the opening
      const openingWords = ["mirror", "copy", "lock", "door", "surface", "perimeter", "reflection"];
      return openingWords.some(w => last300.includes(w) && first300.includes(w));
    },
  },
  {
    id: 66,
    category: "Structure",
    name: "No section is purely negative (each offers a path forward)",
    test: (_, t) => {
      // Every section that mentions a problem should also mention a solution
      return /but.*if|what you actually want|that's what|we chose|we built|we run/i.test(t);
    },
  },
  {
    id: 67,
    category: "Structure",
    name: "Spine metaphor appears at least twice",
    test: (_, t) => {
      const metaphors = ["lock", "door", "house", "mirror", "reflection", "copy", "termite", "plumber"];
      return metaphors.some(m => {
        const regex = new RegExp(m, "gi");
        return (t.match(regex) || []).length >= 2;
      });
    },
  },
  {
    id: 68,
    category: "Structure",
    name: "Contains at least one single-sentence standalone thought",
    test: (r) => {
      // A <P> component with very short content (under 50 chars)
      const shortPs = r.match(/<P>\s*[^<]{5,50}\s*<\/P>/g) || [];
      return shortPs.length >= 1;
    },
  },
  {
    id: 69,
    category: "Structure",
    name: "Problem section comes before solution section",
    test: (_, t) => {
      const prob = t.search(/hard problem|actual problem|shape of/i);
      const sol = t.search(/what we (are|built|do)|managed service/i);
      return prob > 0 && sol > 0 && prob < sol;
    },
  },
  {
    id: 70,
    category: "Structure",
    name: "Page has proper metadata (title + description + OG)",
    test: (r) => /title:.*Company/i.test(r) && /description:/i.test(r) && /openGraph/i.test(r),
  },

  // ============================================================
  // CATEGORY 8: CTA & CONVERSION — Will the reader take action?
  // ============================================================
  {
    id: 71,
    category: "CTA",
    name: "Primary CTA links to report.mirret.co.uk",
    test: (r) => /report\.mirret\.co\.uk/.test(r),
  },
  {
    id: 72,
    category: "CTA",
    name: "Secondary CTA links to Calendly",
    test: (r) => /calendly\.com/.test(r),
  },
  {
    id: 73,
    category: "CTA",
    name: "CTA text is action-oriented, not generic",
    test: (_, t) => /(generate free report|talk to us|run a.*scan|get your report)/i.test(t),
  },
  {
    id: 74,
    category: "CTA",
    name: "Free offer mentioned at least twice on page",
    test: (_, t) => (t.match(/free/gi) || []).length >= 2,
  },
  {
    id: 75,
    category: "CTA",
    name: "No-commitment language near CTA",
    test: (_, t) => /(no.*sales.*call|no.*commitment|no.*obligation|lost nothing|no strings)/i.test(t),
  },
  {
    id: 76,
    category: "CTA",
    name: "CTA section visually separated (border or spacing)",
    test: (r) => /border-t|border-white|mt-2[0-9]/.test(r),
  },
  {
    id: 77,
    category: "CTA",
    name: "Both CTAs open in new tab (target=_blank)",
    test: (r) => {
      const ctas = r.match(/href="https:\/\/(report\.mirret|calendly)[^"]*"[^>]*/g) || [];
      return ctas.length >= 2 && ctas.every(c => c.includes("target"));
    },
  },
  {
    id: 78,
    category: "CTA",
    name: "CTA buttons have hover states",
    test: (r) => /hover:.*opacity|hover:.*bg-white|hover:.*text-/i.test(r),
  },
  {
    id: 79,
    category: "CTA",
    name: "Free scan embedded in objection handling (not just footer)",
    test: (_, t) => {
      const objSection = t.slice(0, Math.floor(t.length * 0.75));
      return /free scan|run a scan/i.test(objSection);
    },
  },
  {
    id: 80,
    category: "CTA",
    name: "Specific outcome promise (you'll know in minutes)",
    test: (_, t) => /(in minutes|within.*hour|know.*minutes|results.*fast|you'll know|you'll have)/i.test(t),
  },

  // ============================================================
  // CATEGORY 9: ICP TARGETING — Does it resonate with UK ecommerce?
  // ============================================================
  {
    id: 81,
    category: "ICP",
    name: "Mentions ecommerce/online revenue explicitly",
    test: (_, t) => /(ecommerce|e.commerce|online.*revenue|online.*presence|checkout|storefront)/i.test(t),
  },
  {
    id: 82,
    category: "ICP",
    name: "References marketplace threats (Amazon/eBay style)",
    test: (_, t) => /(marketplace|counterfeit.*store|listing)/i.test(t),
  },
  {
    id: 83,
    category: "ICP",
    name: "Mentions paid ad/search hijacking",
    test: (_, t) => /(paid ad|search result|ad.*network|redirect.*customer|search ad)/i.test(t),
  },
  {
    id: 84,
    category: "ICP",
    name: "Speaks to founder/Head of Ops, not just CISO",
    test: (_, t) => /(company|brand|business|revenue|customer|money)/i.test(t),
  },
  {
    id: 85,
    category: "ICP",
    name: "Financial harm framing (lost revenue, chargebacks)",
    test: (_, t) => /(money|financial|revenue|payment|credit card|defraud|scam|chargeback)/i.test(t),
  },
  {
    id: 86,
    category: "ICP",
    name: "Uses British English spelling",
    test: (_, t) => /(prioritise|organise|defence|colour|recognise|behaviour|favour|optimise|categoris)/i.test(t),
  },
  {
    id: 87,
    category: "ICP",
    name: "Mentions social platform threats",
    test: (_, t) => /(social.*platform|fake.*account|social media|support account)/i.test(t),
  },
  {
    id: 88,
    category: "ICP",
    name: "Problem framed in business impact, not technical jargon",
    test: (_, t) => {
      const jargon = /(CVE|CVSS|zero-day|APT|TTPs|MITRE ATT&CK|kill chain)/i;
      return !jargon.test(t);
    },
  },
  {
    id: 89,
    category: "ICP",
    name: "No pricing mentioned (this is a company page, not pricing)",
    test: (_, t) => !/(£\d|pricing|per month|cost.*£|subscription.*fee)/i.test(t),
  },
  {
    id: 90,
    category: "ICP",
    name: "Acknowledges resource constraints of target buyers",
    test: (_, t) => /(limited resource|busy|triage|don't have someone|whose job)/i.test(t),
  },

  // ============================================================
  // CATEGORY 10: TECHNICAL QUALITY — Is the page well-built?
  // ============================================================
  {
    id: 91,
    category: "Technical",
    name: "Uses semantic H1 tag",
    test: (r) => /<h1/.test(r),
  },
  {
    id: 92,
    category: "Technical",
    name: "Uses semantic article tag",
    test: (r) => /<article/.test(r),
  },
  {
    id: 93,
    category: "Technical",
    name: "Uses semantic main tag",
    test: (r) => /<main/.test(r),
  },
  {
    id: 94,
    category: "Technical",
    name: "Includes Navbar component",
    test: (r) => /<Navbar/.test(r),
  },
  {
    id: 95,
    category: "Technical",
    name: "Includes Footer component",
    test: (r) => /<Footer/.test(r),
  },
  {
    id: 96,
    category: "Technical",
    name: "No inline style attributes (uses font-heading class instead)",
    test: (r) => {
      // Allow style only if it's the fontFamily for Emilio (acceptable for now)
      const styles = r.match(/style=\{\{/g) || [];
      return styles.length === 0;
    },
  },
  {
    id: 97,
    category: "Technical",
    name: "External links have target=_blank and rel=noopener",
    test: (r) => {
      const extLinks = r.match(/href="https?:\/\/[^"]+"/g) || [];
      if (extLinks.length === 0) return true;
      // Check that target="_blank" and rel="noopener" both appear in the file
      // (they're on separate JSX lines from href)
      return r.includes('target="_blank"') && r.includes('rel="noopener noreferrer"');
    },
  },
  {
    id: 98,
    category: "Technical",
    name: "Page is a server component (no 'use client')",
    test: (r) => !/use client/.test(r),
  },
  {
    id: 99,
    category: "Technical",
    name: "Responsive text sizes (md: breakpoints on headings)",
    test: (r) => /md:text-\[/.test(r),
  },
  {
    id: 100,
    category: "Technical",
    name: "MirretMark used for brand icon on page",
    test: (r) => /MirretMark/.test(r),
  },
];

// ============================================================
// Runner
// ============================================================

function run() {
  const raw = getPageContent();
  const text = getTextContent(raw);

  console.log("═══════════════════════════════════════════════════");
  console.log("  MIRRET COMPANY PAGE — AUTORESEARCH EVALS");
  console.log("═══════════════════════════════════════════════════\n");

  let passed = 0;
  let failed = 0;
  const failures: { id: number; category: string; name: string }[] = [];

  const categories = new Map<string, { passed: number; total: number }>();

  for (const ev of evals) {
    const result = ev.test(raw, text);
    if (!categories.has(ev.category)) {
      categories.set(ev.category, { passed: 0, total: 0 });
    }
    const cat = categories.get(ev.category)!;
    cat.total++;

    if (result) {
      passed++;
      cat.passed++;
      console.log(`  ✓  [${ev.id.toString().padStart(3)}] ${ev.name}`);
    } else {
      failed++;
      failures.push({ id: ev.id, category: ev.category, name: ev.name });
      console.log(`  ✗  [${ev.id.toString().padStart(3)}] ${ev.name}`);
    }
  }

  console.log("\n═══════════════════════════════════════════════════");
  console.log("  RESULTS BY CATEGORY");
  console.log("═══════════════════════════════════════════════════\n");

  for (const [cat, data] of categories) {
    const pct = Math.round((data.passed / data.total) * 100);
    const bar = "█".repeat(Math.round(pct / 5)) + "░".repeat(20 - Math.round(pct / 5));
    console.log(`  ${cat.padEnd(18)} ${bar} ${pct}% (${data.passed}/${data.total})`);
  }

  console.log("\n═══════════════════════════════════════════════════");
  const pct = Math.round((passed / evals.length) * 100);
  console.log(`  TOTAL: ${passed}/${evals.length} passed (${pct}%)`);
  console.log("═══════════════════════════════════════════════════\n");

  if (failures.length > 0) {
    console.log("  FAILURES:");
    for (const f of failures) {
      console.log(`    [${f.id.toString().padStart(3)}] ${f.category}: ${f.name}`);
    }
    console.log("");
  }

  process.exit(failed > 0 ? 1 : 0);
}

run();
