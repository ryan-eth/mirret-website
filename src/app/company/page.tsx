import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MirretMark } from "@/components/MirretLogo";

export const metadata = {
  title: "Company",
  description:
    "Why brand impersonation is the most expensive problem in e-commerce that almost nobody is watching.",
  openGraph: {
    title: "Company | Mirret",
    description:
      "Someone built a store with your name on it. Your customers are shopping there right now.",
    images: [
      {
        url: "/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mirret — Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Company | Mirret",
    description:
      "Someone built a store with your name on it. Your customers are shopping there right now.",
    images: ["/seo/og-image.png"],
  },
};

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-7 text-base leading-[1.85] text-white/[0.72] md:text-[17px]">
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 mt-24 text-[24px] font-normal leading-[1.3] text-white font-heading md:text-[36px] md:font-light md:leading-[1.25]">
      {children}
    </h2>
  );
}

export default function CompanyPage() {
  return (
    <main id="main-content" className="mirret-page-gradient min-h-screen">
      <Navbar />

      <article className="mx-auto max-w-[660px] px-6 pt-[160px] pb-24">
        <div className="mb-10 flex items-center gap-2">
          <MirretMark size={20} />
          <span className="text-sm font-medium tracking-wide text-cyan-400">
            Company
          </span>
        </div>

        <h1 className="mb-14 text-[28px] font-normal leading-[1.25] text-white font-heading md:text-[52px] md:font-light md:leading-[1.18]">
          Someone built a store with your name on it
        </h1>

        <P>
          The most dangerous thing about building a great brand is that
          it makes you worth copying.
        </P>

        <P>
          Your customers trust your name. They recognize your checkout
          flow, your product pages, your logo in a search result. That
          recognition is the most valuable thing you own. It took years
          to build. It takes about an afternoon to steal.
        </P>

        <P>
          Someone has registered a domain that looks like yours.
          They&apos;ve cloned your storefront &mdash; product images,
          copy, layout, even the favicon. They&apos;re running paid ads
          against your brand name. Your customers click, see what looks
          like your store, enter their payment information, and either
          receive nothing or a cheap counterfeit. Then they blame you.
        </P>

        <P>
          When we scan a new client, the median finding is 11 domains
          impersonating their brand. About a third have active payment
          pages. Nobody on the brand team knew.
        </P>

        <H2>What this actually costs</H2>

        <P>
          Every sale on a fake version of your store is a sale that should
          have been yours. Across e-commerce, brand impersonation accounts
          for $48 billion a year in fraud losses. By 2029, that number
          will be $107 billion. 90% of online businesses have already
          experienced measurable revenue loss from counterfeiting.
        </P>

        <P>
          But the direct loss is the small part.
        </P>

        <P>
          The expensive part is what happens to your customers afterward.
          79% of consumers stop buying from a brand after being defrauded
          by a fake version of it. They don&apos;t distinguish between
          &ldquo;I was scammed by someone pretending to be this
          brand&rdquo; and &ldquo;this brand scammed me.&rdquo; To the
          customer, it&apos;s the same thing. 38% sever ties completely.
          33% actively tell friends and family not to buy from you.
        </P>

        <P>
          Acquiring a new customer costs five to seven times more than
          retaining an existing one. Every customer lost to a fake
          checkout is a lifetime value that vanishes &mdash; and a
          negative review, a social media post, or a warning to friends
          that follows your brand around long after the scam site is gone.
        </P>

        <P>
          This isn&apos;t a problem reserved for Nike and Louis Vuitton.
          Last year, over 6,000 fake sites impersonated Nike, Adidas, and
          a hundred other brands across 3,000 domains. During Black
          Friday, phishing attacks targeting shoppers spiked 620%.
          Researchers uncovered thousands of near-perfect clone sites
          mimicking everyone from Wayfair to Lululemon to Omaha Steaks.
          If you sell anything online, you almost certainly have a shadow
          storefront you don&apos;t know about.
        </P>

        <H2>The blind spot</H2>

        <P>
          Most brands have no idea how exposed they are.
        </P>

        <P>
          66% of companies learn about brand impersonation from customer
          complaints. Not from monitoring. Not from their security tools.
          From an angry email or a one-star review from someone who got
          burned. Only 6% of brands have effective protection against
          impersonation. 53% say their existing tools don&apos;t address
          the problem at all.
        </P>

        <P>
          This makes sense when you think about it. Your firewall protects
          your servers. Your fraud tools protect your checkout. Your
          endpoint security protects your devices. None of them can see a
          clone of your store running on someone else&apos;s
          infrastructure, on a domain you&apos;ve never heard of,
          targeting your customers through ads you never placed.
        </P>

        <P>
          It&apos;s like installing the best security system money can buy
          in your store while someone opens an identical store across the
          street &mdash; your name, your signage, your product photos.
          Your security system is excellent. It&apos;s also completely
          irrelevant to the problem.
        </P>

        <P>
          And the timing is brutal. 90% of the financial damage from a
          fake site happens in the first 18 hours. The average manual
          takedown takes over four business days. By the time someone on
          your team confirms the threat and figures out who to contact,
          most of the harm is already done.
        </P>

        <H2>What your customers actually experience</H2>

        <P>
          Now picture it from your customer&apos;s side. They search for
          your brand. They click a result &mdash; maybe an organic
          listing, maybe a paid ad. The page looks right. Your logo, your
          colours, your product photography. The URL is close enough that
          they don&apos;t look twice. They find the product they want,
          probably at a slight discount. They check out.
        </P>

        <P>
          The confirmation email looks real. Then nothing arrives. Or a
          cheap imitation arrives. Or their credit card starts showing
          charges they didn&apos;t authorize.
        </P>

        <P>
          Now they&apos;re angry. And they&apos;re not angry at the
          person who built the fake site. They&apos;re angry at you.
        </P>

        <P>
          They contact your support team, who has no record of the order.
          They leave a one-star review on your real store. They post about
          it on social media. 37% of companies discover impersonation
          through exactly this kind of public brand shaming. 92% of
          consumers believe companies are responsible for protecting their
          digital identity. Your customers don&apos;t see a cybercrime.
          They see your brand failing to protect them.
        </P>

        <P>
          Trust is a reservoir. It fills slowly and drains fast. 69% of
          adults now abandon online checkouts over trust concerns. The
          erosion spreads far beyond the individual victims. Every
          publicized scam, every social media post from a defrauded
          customer, makes the next legitimate buyer a little more hesitant
          to click &ldquo;buy.&rdquo;
        </P>

        <H2>The regulatory shift</H2>

        <P>
          If the revenue and trust arguments don&apos;t move you, the
          legal ones will.
        </P>

        <P>
          The FTC&apos;s Impersonation Rule &mdash; the first new trade
          regulation rule in over forty years &mdash; went into effect in
          April 2024. It makes brand impersonation explicitly illegal with
          penalties up to $53,088 per violation. In Europe, DORA requires
          financial entities to report impersonation incidents within four
          hours, with board-level criminal liability for non-compliance.
          NIS2 covers critical infrastructure sectors with fines up to
          EUR 10 million or 2% of global revenue.
        </P>

        <P>
          These regulations create obligations that run both ways.
          Platforms must do more to remove impersonation. But brands must
          also demonstrate they are actively monitoring for threats
          against their customers.
        </P>

        <P>
          The number that should focus your attention: 48% of brands are
          already aware of upcoming regulations that will legally require
          them to reimburse customers who lose money to impersonation
          attacks. Today, 81% of brands do not reimburse. That window is
          closing. The question is whether you get ahead of this now or
          scramble to respond after the first enforcement action.
        </P>

        <H2>The objections we hear</H2>

        <P>
          When we talk to brand and e-commerce leaders, we hear a few
          things repeatedly. The objections are reasonable. The
          conclusions usually aren&apos;t.
        </P>

        <P>
          <span className="text-white/[0.9]">
            &ldquo;Our legal team handles takedowns.&rdquo;
          </span>
          {" "}They do. And they&apos;re playing the most expensive game
          of whack-a-mole in your organization. Manual takedowns average
          over four business days. 90% of the damage happens in the first
          18 hours. Even when a takedown succeeds, it removes one listing
          or one page &mdash; the underlying infrastructure stays live.
          The fake domain, the cloned site, the ad account. The attacker
          creates new listings the next day. You need continuous automated
          detection and enforcement, not a paralegal with a spreadsheet.
        </P>

        <P>
          <span className="text-white/[0.9]">
            &ldquo;We register defensive domains.&rdquo;
          </span>
          {" "}Defensive registration was a reasonable strategy when there
          were a handful of top-level domains. There are now over 200,
          with infinite permutations through lookalike characters, keyword
          additions, and country-code variants. You cannot register your
          way out of this. And domain registration doesn&apos;t cover
          marketplace listings, paid ads on search engines, cloned
          storefronts on other platforms, or fake social media accounts.
          The surface area is much wider than the .com namespace.
        </P>

        <P>
          <span className="text-white/[0.9]">
            &ldquo;This isn&apos;t big enough to worry about.&rdquo;
          </span>
          {" "}Do you actually know? In our experience, the answer is
          always worse than people expect. The median finding when we scan
          a new client is 11 impersonating domains per brand. About a
          third of those have active payment pages. We&apos;ll run a free
          scan for you. If there&apos;s nothing there, you&apos;ve lost
          nothing. If there is, you&apos;ll have the data to make a real
          decision.
        </P>

        <P>
          <span className="text-white/[0.9]">
            &ldquo;Our marketplace handles this.&rdquo;
          </span>
          {" "}Platforms remove individual listings when reported.
          That&apos;s necessary but not sufficient. The underlying
          impersonation infrastructure &mdash; the domain, the cloned
          site template, the payment collection &mdash; stays live.
          Reporting a listing to Amazon treats one symptom. Meanwhile, the
          same fake storefront is listing on eBay, running Google ads, and
          operating its own standalone checkout. Platform reporting is one
          channel. You need all of them working simultaneously.
        </P>

        <H2>What we are and what we aren&apos;t</H2>

        <P>
          Mirret is a managed service, not a self-service platform. This
          is deliberate.
        </P>

        <P>
          The typical approach to this market is to build a dashboard,
          sell seats, and let customers manage their own scanning and
          takedowns. That&apos;s a good way to build a scalable software
          business. It&apos;s a terrible way to actually solve the
          problem.
        </P>

        <P>
          Dashboards transfer the operational burden back to you. Someone
          on your team still has to log in, review findings, investigate
          false positives, draft takedown requests, track progress, and
          follow up when things stall. Most e-commerce teams don&apos;t
          have someone whose job that is. So the dashboard goes unused,
          the subscription gets cancelled, and the fake stores keep
          running.
        </P>

        <P>
          We chose differently. We run the scans. We verify the threats.
          We file the takedowns. We track the resolutions. You get a
          weekly report: what we found, what we did about it, and what
          happened. If something is urgent, you hear from us immediately.
          The output is not a dashboard you have to manage. It&apos;s a
          problem that gets smaller every week.
        </P>

        <P>
          Can we guarantee every takedown succeeds? No. Anyone who tells
          you they can is lying &mdash; platforms and registrars make the
          final call. What we guarantee is speed, persistence, and the
          right escalation path for every type of threat. In practice,
          this resolves the vast majority of cases. When it doesn&apos;t,
          we tell you directly and work with you on the next step.
        </P>

        <P>
          This means we&apos;re not for everyone. If you want to run
          brand protection in-house and just need scanning data, there are
          good tools for that. We&apos;re for the brands that want the
          problem solved, not just made visible.
        </P>

        <H2>Why now</H2>

        <P>
          Two things happened recently that made this company both
          necessary and possible, in that order.
        </P>

        <P>
          The first is that AI made impersonation trivially cheap. Cloning
          a brand&apos;s visual identity used to require design skills and
          time. Now anyone can produce a convincing replica of any
          storefront in an afternoon. AI-powered tools can replicate
          entire product catalogs &mdash; images, descriptions, layouts
          &mdash; in hours. Phishing kits sell for as little as $50.
          AI-enabled fraud is projected to grow from $12.3 billion in 2023
          to $40 billion by 2027. The trend is steep and accelerating.
        </P>

        <P>
          The second is that the same AI capabilities that make attacks
          cheaper also make automated defence possible at a scale that
          wasn&apos;t feasible before. Visual similarity scoring, content
          classification, continuous monitoring across millions of domains
          and listings. The building blocks exist now. They need to be
          assembled by people who understand both brand protection and how
          to build reliable systems.
        </P>

        <P>
          We think there&apos;s a narrow window where the companies that
          build AI-native defence define the category. In a few years,
          every serious brand will have continuous monitoring for
          impersonation. The question is whether that monitoring will be
          good enough to actually protect customers.
        </P>

        <H2>The name</H2>

        <P>
          Mirret comes from &ldquo;mirror.&rdquo; The whole problem we
          work on is about reflections &mdash; someone creating a mirror
          of your brand to deceive your customers. We find the mirrors.
          Then we break them.
        </P>

        <div className="mt-24 border-t border-white/[0.08] pt-12">
          <p className="text-[15px] leading-[1.7] text-white/[0.5]">
            We&apos;ll scan your brand&apos;s exposure for free. No sales
            call, no commitment. If someone is impersonating your brand
            right now, you&apos;ll know in minutes.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="https://report.mirret.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-white px-8 py-3.5 text-center text-[15px] font-medium text-[#0f0e0d] transition-opacity duration-200 hover:opacity-90"
            >
              Generate Free Report
            </a>
            <a
              href="https://calendly.com/luke-mirret-zn4c/15"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-white/30 px-8 py-3.5 text-center text-[15px] font-medium text-white transition-colors duration-200 hover:bg-white hover:text-[#0f0e0d]"
            >
              Talk to us
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
