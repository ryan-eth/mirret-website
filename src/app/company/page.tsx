import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MirretMark } from "@/components/MirretLogo";

export const metadata = {
  title: "Company",
  description:
    "Mirret is an AI-native cybersecurity agency building the systems that find what attackers hope you never notice.",
  openGraph: {
    title: "Company | Mirret",
    description:
      "The internet has an impersonation problem. We built the infrastructure to fight it.",
  },
};

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-7 text-[17px] leading-[1.85] text-white/[0.72]">
      {children}
    </p>
  );
}

export default function CompanyPage() {
  return (
    <main className="mirret-page-gradient min-h-screen">
      <Navbar />

      <article className="mx-auto max-w-[660px] px-6 pt-[160px] pb-24">
        <div className="mb-10 flex items-center gap-2">
          <MirretMark size={20} />
          <span className="text-sm font-medium tracking-wide text-cyan-400">
            Company
          </span>
        </div>

        <h1
          className="mb-14 text-[38px] font-light leading-[1.18] text-white md:text-[52px]"
          style={{ fontFamily: "var(--font-emilio)" }}
        >
          What we do and why
        </h1>

        <P>
          Most of the interesting problems in security right now aren&apos;t
          inside the network. They&apos;re outside it. I don&apos;t mean
          &ldquo;cloud security&rdquo; or &ldquo;zero trust&rdquo; or whatever
          the latest Gartner quadrant says you should worry about. I mean
          something more basic: someone is out there right now, pretending to be
          your company, and your customers can&apos;t tell the difference.
        </P>

        <P>
          That probably sounds dramatic. It isn&apos;t. If you run any brand
          with meaningful online revenue, there are almost certainly fake
          versions of your website live right now. Lookalike domains.
          Counterfeit storefronts on marketplaces. Ads in search results
          pointing to checkout pages you&apos;ve never seen. The attackers
          clone your visual identity, your copy, sometimes even your customer
          support flow. Then they wait.
        </P>

        <P>
          The weird thing is how little attention this gets. Companies spend
          millions on endpoint protection and SOC analysts and penetration
          testing, then completely ignore the fact that someone is running a
          pixel-perfect copy of their login page on a domain registered
          yesterday. It&apos;s like installing an expensive alarm system and
          leaving the front door wide open.
        </P>

        <P>
          We started Mirret because we kept seeing this and it bothered us.
        </P>

        <h2
          className="mb-8 mt-20 text-[28px] font-light leading-[1.25] text-white md:text-[36px]"
          style={{ fontFamily: "var(--font-emilio)" }}
        >
          The actual problem
        </h2>

        <P>
          Here&apos;s what usually happens. A customer emails support saying
          they got scammed by what they thought was your company. Someone on the
          security team Googles around and finds the phishing page. Legal sends a
          cease-and-desist to the domain registrar. Two to four weeks later, the
          page might come down. By then the attacker has moved to a new domain.
          Often several.
        </P>

        <P>
          This is a terrible way to solve the problem and everyone involved
          knows it. But it persists because the tooling is bad. The existing
          options are mostly dashboards that show you threats and then leave you
          to deal with them. Which, if you think about it, is a strange product
          to sell. &ldquo;Here&apos;s a list of people defrauding your
          customers. Good luck.&rdquo;
        </P>

        <P>
          What you actually want is for the threats to go away. That&apos;s a
          different product entirely. It means someone has to scan continuously,
          verify that what they found is actually malicious (not a legitimate
          reseller or partner), and then file takedowns through the right
          channels with the right evidence. And keep filing until it&apos;s
          resolved. And do this for hundreds of threats simultaneously across
          domains, marketplaces, social platforms, and ad networks.
        </P>

        <P>
          No human team can do that at the speed and scale required. But
          software can do most of it, if you build the software right.
        </P>

        <h2
          className="mb-8 mt-20 text-[28px] font-light leading-[1.25] text-white md:text-[36px]"
          style={{ fontFamily: "var(--font-emilio)" }}
        >
          Why AI-native matters
        </h2>

        <P>
          There&apos;s a thing that happens in every industry when a new
          technology arrives. The incumbents bolt it onto their existing product
          and call it innovation. The interesting companies are the ones that
          ask a different question: what would we build if we started from
          scratch, knowing this technology existed?
        </P>

        <P>
          For external attack surface management, the answer is surprisingly
          clear. Almost everything in the workflow &mdash; scanning certificate
          transparency logs, diffing DNS records, scoring visual similarity
          between a real page and a fake one, classifying whether a new domain
          registration is benign or hostile &mdash; is pattern recognition at
          scale. It&apos;s exactly what machine learning is good at. Not
          &ldquo;AI&rdquo; in the chatbot sense. AI in the boring, useful
          sense: systems that classify and prioritise faster than any human
          analyst could.
        </P>

        <P>
          The part that does need humans is judgement. Is this domain a threat
          or a legitimate franchise partner? Should we escalate to the registrar
          or the payment processor first? Is this worth waking someone up for at
          2am? You need experienced people making those calls. You just
          don&apos;t need them doing the scanning and classification that
          happens before those calls get made.
        </P>

        <P>
          So that&apos;s how we built Mirret. Machines do the searching.
          Humans do the deciding. It seems obvious when you say it that way, but
          most companies in this space have it backwards. They use humans for
          the grunt work and then wonder why they can&apos;t keep up.
        </P>

        <h2
          className="mb-8 mt-20 text-[28px] font-light leading-[1.25] text-white md:text-[36px]"
          style={{ fontFamily: "var(--font-emilio)" }}
        >
          How we actually work
        </h2>

        <P>
          We&apos;re a managed service. That means we don&apos;t hand you a
          dashboard and disappear. We run the scans, verify the threats, file
          the takedowns, and send you a report every week: here&apos;s what we
          found, here&apos;s what we did about it, here&apos;s the outcome.
        </P>

        <P>
          I should be honest about something: we can&apos;t guarantee every
          takedown succeeds. Platforms make the final call. What we can do is
          file through the right channels with the right evidence, follow up
          persistently, and escalate when the standard path isn&apos;t working.
          In practice this resolves the vast majority of cases. When it
          doesn&apos;t, we tell you straight and figure out the next move
          together.
        </P>

        <P>
          The reason we chose managed service over self-service is a belief
          about where this market is going. Most companies don&apos;t want
          another security tool to manage. They want the problem solved. If your
          house has a termite problem, you don&apos;t want a termite detection
          dashboard. You want someone to show up and deal with the termites.
        </P>

        <h2
          className="mb-8 mt-20 text-[28px] font-light leading-[1.25] text-white md:text-[36px]"
          style={{ fontFamily: "var(--font-emilio)" }}
        >
          On building for adversaries
        </h2>

        <P>
          There&apos;s something I find genuinely interesting about building
          security software, which is that you&apos;re building against an
          opponent who adapts. In most software, if your code works today it
          will probably work tomorrow. In security, if your detection works
          today, someone is already figuring out how to evade it tomorrow.
        </P>

        <P>
          This changes how you have to think about engineering. You can&apos;t
          ship something and move on. You&apos;re in a continuous loop of
          detecting new evasion techniques, updating your models, measuring
          whether the updates actually work, and doing it again. It&apos;s more
          like running a competitive game server than building a SaaS product.
        </P>

        <P>
          We measure everything because we have to. Detection rates, false
          positive rates, time from detection to takedown filing, time from
          filing to resolution. These numbers are how we know whether
          we&apos;re winning or losing. There&apos;s no way to fake it.
        </P>

        <h2
          className="mb-8 mt-20 text-[28px] font-light leading-[1.25] text-white md:text-[36px]"
          style={{ fontFamily: "var(--font-emilio)" }}
        >
          Why now
        </h2>

        <P>
          Two things happened recently that made this company possible.
        </P>

        <P>
          The first is that generative AI made impersonation absurdly easy. A
          few years ago, cloning a brand&apos;s website required some skill.
          Now you can do it in an afternoon with off-the-shelf tools. The
          volume of impersonation we see across our client base has grown
          significantly, and the quality of the fakes has gotten much better.
          This is going to get worse before it gets better.
        </P>

        <P>
          The second is that the same AI capabilities that make attacks easier
          also make automated defence possible at a scale that wasn&apos;t
          feasible before. Visual similarity scoring, natural language
          classification of page intent, continuous monitoring across millions
          of data points &mdash; the building blocks exist now. They just need
          to be assembled by people who understand both the security domain and
          the AI tooling.
        </P>

        <P>
          That&apos;s us. Or at least, we&apos;re trying to be.
        </P>

        <h2
          className="mb-8 mt-20 text-[28px] font-light leading-[1.25] text-white md:text-[36px]"
          style={{ fontFamily: "var(--font-emilio)" }}
        >
          The name
        </h2>

        <P>
          Mirret comes from &ldquo;mirror.&rdquo; The whole problem is about
          reflections &mdash; someone creating a copy of your brand to trick
          your customers. We find the copies. Then we take them down.
        </P>

        <div className="mt-20 border-t border-white/[0.08] pt-12">
          <p className="text-[15px] leading-[1.7] text-white/[0.5]">
            If you think your brand might be getting impersonated, we&apos;ll
            run a free scan and show you what we find. No sales call required.
          </p>
          <a
            href="https://report.mirret.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-white px-8 py-3.5 text-[15px] font-medium text-[#0f0e0d] transition-opacity duration-200 hover:opacity-90"
          >
            Generate Free Report
          </a>
        </div>
      </article>

      <Footer />
    </main>
  );
}
