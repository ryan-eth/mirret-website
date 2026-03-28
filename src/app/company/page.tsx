import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MirretMark } from "@/components/MirretLogo";

export const metadata = {
  title: "Company - Mirret",
  description:
    "Mirret is an AI-native cybersecurity agency building the systems that find what attackers hope you never notice.",
};

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-[680px] px-6 ${className ?? ""}`}>
      {children}
    </section>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 text-[17px] leading-[1.8] text-white/[0.72]">
      {children}
    </p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-8 mt-20 text-[32px] font-light leading-[1.2] text-white md:text-[40px]"
      style={{ fontFamily: "var(--font-emilio)" }}
    >
      {children}
    </h2>
  );
}

export default function CompanyPage() {
  return (
    <main className="mirret-page-gradient min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="pt-[160px] pb-16">
        <Section>
          <div className="mb-8 flex items-center gap-2">
            <MirretMark size={20} />
            <span className="text-sm font-medium tracking-wide text-cyan-400">
              Company
            </span>
          </div>

          <h1
            className="mb-10 text-[40px] font-light leading-[1.15] text-white md:text-[56px]"
            style={{ fontFamily: "var(--font-emilio)" }}
          >
            The internet has an impersonation problem. We built the infrastructure to fight it.
          </h1>

          <Paragraph>
            Here is something most security companies won&apos;t tell you: the
            perimeter isn&apos;t where you think it is. Your firewall, your SOC,
            your endpoint agents — they protect what&apos;s inside. But the
            attack surface that matters most is the one you don&apos;t control.
            It&apos;s every domain that looks like yours. Every fake storefront
            selling under your name. Every ad redirecting your customers to
            someone else&apos;s checkout page.
          </Paragraph>

          <Paragraph>
            That surface is enormous, it changes every day, and almost nobody is
            watching it properly.
          </Paragraph>

          <Paragraph>
            Mirret exists because we think that&apos;s broken.
          </Paragraph>
        </Section>
      </div>

      {/* The Problem */}
      <Section>
        <Heading>The shape of the problem</Heading>

        <Paragraph>
          The conventional approach to external threats goes like this: a
          customer reports a phishing site. Your legal team sends a
          cease-and-desist. Three weeks later, maybe the domain is down. By
          then, the attacker has spun up four more.
        </Paragraph>

        <Paragraph>
          This is not a legal problem. It&apos;s an engineering problem. And
          legal tools are catastrophically slow for engineering problems.
        </Paragraph>

        <Paragraph>
          The reason most companies lose at this game is not that they lack
          resources. It&apos;s that they&apos;re playing it manually, in a
          domain that rewards automation. Every hour a fraudulent page stays
          live, real people lose real money. The economics are simple and brutal:
          attackers who automate will always outrun defenders who don&apos;t.
        </Paragraph>

        <Paragraph>
          We decided to stop playing that game and build a different one.
        </Paragraph>
      </Section>

      {/* What We Are */}
      <Section>
        <Heading>AI-native, not AI-adjacent</Heading>

        <Paragraph>
          There&apos;s a meaningful distinction between companies that bolt AI
          onto existing products and companies that are built from the ground up
          around what AI makes newly possible. Mirret is the second kind.
        </Paragraph>

        <Paragraph>
          Every system we build starts with the same question: what can a machine
          do continuously that a human could only do in spot checks? The answer
          turns out to be almost everything in external attack surface
          management. Scanning certificate transparency logs. Diffing DNS
          records. Classifying visual similarity between a real brand page and a
          fake one. Determining whether a newly registered domain is a legitimate
          partner or a threat. Prioritising which takedown to file first based on
          active financial harm.
        </Paragraph>

        <Paragraph>
          None of this requires creativity. All of it requires precision at
          scale. That&apos;s exactly the shape of problem AI was built to solve.
        </Paragraph>

        <Paragraph>
          What does require human judgement is the last mile — understanding
          context, making enforcement decisions that account for business
          relationships, knowing when to escalate and when to wait. So
          that&apos;s where we put the humans. Not at the scanning stage. Not at
          the classification stage. At the decision stage, where they actually
          add value.
        </Paragraph>
      </Section>

      {/* How We Work */}
      <Section>
        <Heading>Software with opinions</Heading>

        <Paragraph>
          We are not a dashboard company. We don&apos;t give you a login and
          wish you luck. The reason is simple: dashboards transfer the problem
          back to you. You still have to check it, interpret it, and act on it.
          That&apos;s the same workflow you already had, just with a nicer UI.
        </Paragraph>

        <Paragraph>
          Mirret is a managed service built on proprietary software. We run the
          scans. We verify the threats. We file the takedowns. You get a weekly
          report: here&apos;s what we found, here&apos;s what we did, here&apos;s
          the result. If something is urgent, you hear from us immediately.
        </Paragraph>

        <Paragraph>
          This is an opinionated architecture. We chose it because we think the
          gap between &ldquo;detecting a threat&rdquo; and &ldquo;resolving a
          threat&rdquo; is where most security products fail. Detection without
          resolution is just expensive anxiety. We close the loop.
        </Paragraph>

        <Paragraph>
          A note on honesty: we file takedowns, but platforms make final
          decisions. We can&apos;t guarantee removal and we don&apos;t pretend
          to. What we can guarantee is speed, persistence, and the right
          escalation path for every type of threat. Most of the time, that&apos;s
          enough. When it isn&apos;t, we tell you directly and help you decide
          what&apos;s next.
        </Paragraph>
      </Section>

      {/* The Craft */}
      <Section>
        <Heading>The craft of building for adversaries</Heading>

        <Paragraph>
          Building security software is different from building other software in
          one fundamental way: your users are trying to break things, and your
          adversaries are actively trying to evade you. The ground shifts under
          your feet every day.
        </Paragraph>

        <Paragraph>
          This is why we obsess over engineering quality. Sloppy code in a CRUD
          app means a bad user experience. Sloppy code in a detection engine
          means a threat slips through and someone&apos;s customers get
          defrauded. The margin for error is thinner than in almost any other
          kind of software.
        </Paragraph>

        <Paragraph>
          We build in small, focused teams. We ship continuously. We instrument
          everything because in adversarial systems, the only way to know
          you&apos;re winning is to measure relentlessly. Our detection rates,
          our false positive rates, our time-to-takedown — these aren&apos;t
          vanity metrics. They&apos;re the scoreboard.
        </Paragraph>
      </Section>

      {/* Who We Serve */}
      <Section>
        <Heading>Who we work with</Heading>

        <Paragraph>
          Our clients range from mid-market e-commerce brands to enterprise
          financial services companies. What they share is a common realisation:
          their brand is being weaponised against their own customers, and
          the traditional tools aren&apos;t keeping up.
        </Paragraph>

        <Paragraph>
          We work across the full attack surface — lookalike domains, counterfeit
          marketplace listings, fake social media accounts, phishing pages,
          fraudulent ads, unauthorised use of brand assets in search results. If
          someone is pretending to be you on the internet, we find them, verify
          the threat, and get them taken down.
        </Paragraph>

        <Paragraph>
          The work is different for every client because the attack surface is
          different for every client. A fintech company faces different threats
          than a luxury retailer. We adapt the scanning, the rules, the
          prioritisation — not because we&apos;re a consultancy, but because the
          software is designed to be configured that way.
        </Paragraph>
      </Section>

      {/* Why Now */}
      <Section>
        <Heading>Why this matters now</Heading>

        <Paragraph>
          Two things changed recently that made Mirret possible and necessary.
        </Paragraph>

        <Paragraph>
          First, generative AI made impersonation trivially easy. You can now
          clone a brand&apos;s entire visual identity — website, email
          templates, customer support scripts — in hours. From what we see
          across our client base, the volume of impersonation attacks has
          grown dramatically in the past two years, and it&apos;s accelerating.
        </Paragraph>

        <Paragraph>
          Second, the same AI capabilities that enable attacks also enable
          defence at scale. Pattern recognition across millions of domains.
          Visual similarity scoring. Natural language classification of page
          intent. The tools to fight back finally exist — but only if you build
          for them natively, not as an afterthought.
        </Paragraph>

        <Paragraph>
          We are in a window where the companies that build AI-native defence
          systems will define the category. In five years, every serious brand
          will have continuous external threat monitoring. The question is
          whether that monitoring will be good enough to actually protect people.
          We intend it to be.
        </Paragraph>
      </Section>

      {/* The Name */}
      <Section className="pb-24">
        <Heading>On the name</Heading>

        <Paragraph>
          Mirret is derived from &ldquo;mirror.&rdquo; The entire problem we
          solve is about reflections — someone creating a mirror of your brand
          to deceive your customers. We find the mirrors. Then we break them.
        </Paragraph>

        <div className="mt-16 border-t border-white/[0.08] pt-12">
          <p className="text-sm text-white/[0.45]">
            If your brand is being impersonated, or you suspect it might be,
            we&apos;ll run a free scan and show you what we find.
          </p>
          <a
            href="https://report.mirret.co.uk"
            className="mt-4 inline-block rounded-full bg-white px-7 py-3 text-[15px] font-medium text-[#0f0e0d] transition-opacity duration-200 hover:opacity-90"
          >
            Generate Free Report
          </a>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
