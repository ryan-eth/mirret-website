import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MirretMark } from "@/components/MirretLogo";

export const metadata = {
  title: "Company",
  description:
    "Why the external attack surface is the most important problem in security that almost nobody is working on properly.",
  openGraph: {
    title: "Company | Mirret",
    description:
      "The attack surface that matters most is the one you don't control.",
  },
};

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-7 text-[17px] leading-[1.85] text-white/[0.72]">
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 mt-24 text-[28px] font-light leading-[1.25] text-white font-heading md:text-[36px]">
      {children}
    </h2>
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

        <h1 className="mb-14 text-[36px] font-light leading-[1.18] text-white font-heading md:text-[52px]">
          The attack surface that matters most is the one you don&apos;t control
        </h1>

        <P>
          There&apos;s a strange asymmetry in how companies think about
          security. They spend enormous amounts of money protecting what&apos;s
          inside their perimeter &mdash; endpoints, networks, cloud
          infrastructure, employee credentials. All of that matters. But there
          is an entire category of threat that exists completely outside the
          perimeter, where none of those tools can see it, and most companies
          have no systematic way of dealing with it at all.
        </P>

        <P>
          I&apos;m talking about the external attack surface. Not your servers.
          Not your code. The sprawling, ungoverned landscape of everything on
          the internet that uses your name, resembles your brand, or touches
          your customers while pretending to be you.
        </P>

        <P>
          Lookalike domains registered overnight. Counterfeit storefronts on
          marketplaces. Phishing pages that clone your login flow down to the
          favicon. Paid ads in search results that redirect your customers to
          checkout pages you&apos;ve never seen. Fake customer support accounts
          on social platforms. Fraudulent mobile apps using your brand assets.
        </P>

        <P>
          This is not a niche problem. Every company with meaningful online
          presence has an external attack surface, and almost nobody is watching
          it properly. The question is whether you find out about it from your
          monitoring system or from an angry customer who just got defrauded.
        </P>

        <H2>Why this is a hard problem</H2>

        <P>
          The reason external attack surface management is genuinely difficult
          &mdash; and not just a feature you bolt onto an existing security
          product &mdash; is that it requires doing several things
          simultaneously that are each hard on their own.
        </P>

        <P>
          You have to scan continuously. Not weekly, not monthly. The internet
          changes constantly. A domain registered at 2am on a Tuesday can be
          serving a phishing page by 6am and defrauding customers by lunchtime.
          If your scanning cadence is measured in days, you&apos;ve already lost.
        </P>

        <P>
          You have to classify accurately. Not everything that looks suspicious
          is actually a threat. That domain with your company name in it might be
          a legitimate franchise partner, or a fan site, or a comparison blog.
          If you file takedowns against legitimate sites, you burn your
          credibility with registrars and platforms. Then when a real threat
          appears, your requests get deprioritised. Getting classification
          wrong is worse than not classifying at all.
        </P>

        <P>
          And you have to actually resolve the threats. This is where most
          approaches break down. Detection without resolution is just expensive
          anxiety. You know there are 47 domains impersonating your brand. Now
          what? Someone has to file the right kind of report to the right
          platform through the right channel with the right evidence, follow
          up when it stalls, escalate when the standard path doesn&apos;t work,
          and do this across registrars, hosting providers, ad networks,
          marketplaces, and social platforms simultaneously. Each with different
          processes, different response times, and different evidentiary
          requirements.
        </P>

        <P>
          No human team can do this well at scale. The operational complexity
          is too high and the attack surface moves too fast. But if you build
          the right software, you can automate the parts that are mechanical
          and keep humans focused on the parts that require judgement.
        </P>

        <P>
          That&apos;s what Mirret does.
        </P>

        <H2>The objections we hear</H2>

        <P>
          When we talk to security leaders, we hear a few things repeatedly.
          It&apos;s worth being honest about them because the objections are
          reasonable, even when the conclusions aren&apos;t.
        </P>

        <P>
          <span className="text-white/[0.9]">
            &ldquo;We already have a security team.&rdquo;
          </span>
          {" "}You do. And they&apos;re busy. They&apos;re managing your SIEM,
          triaging alerts, running penetration tests, reviewing access controls,
          responding to incidents. They are experts at protecting what&apos;s
          inside the perimeter. But external attack surface monitoring is a
          different discipline entirely. It requires different tools, different
          data sources, different enforcement relationships. Asking your SOC
          team to also monitor the entire internet for brand impersonation is
          like asking your plumber to also do the electrical work. They&apos;re
          both in your house, but they&apos;re different trades.
        </P>

        <P>
          <span className="text-white/[0.9]">
            &ldquo;We use a threat intelligence platform.&rdquo;
          </span>
          {" "}Threat intel platforms are designed to aggregate and correlate
          indicators of compromise &mdash; IP addresses, malware hashes, known
          C2 infrastructure. They&apos;re essential tools. But they&apos;re
          optimised for a different problem than external brand impersonation.
          A lookalike domain serving a pixel-perfect copy of your checkout page
          won&apos;t show up in a threat intel feed because it&apos;s not
          malware. It&apos;s a clean website on a clean IP that happens to be
          stealing your customers. It requires visual analysis, content
          comparison, and brand context that threat intel platforms weren&apos;t
          built to provide.
        </P>

        <P>
          <span className="text-white/[0.9]">
            &ldquo;This isn&apos;t a priority right now.&rdquo;
          </span>
          {" "}I understand that. Every security team is triaging against
          limited resources. But I&apos;d ask this: do you know what your
          external attack surface actually looks like right now? Because in
          our experience, the answer is almost always worse than people expect.
          When we run a scan for a new client, the median finding is 11
          impersonating domains per brand. About a third of those have active
          payment pages. The problem isn&apos;t that it&apos;s not a priority.
          It&apos;s that you don&apos;t have visibility into how bad it is, so
          it&apos;s hard to prioritise accurately. We&apos;ll run a free scan
          for you. If there&apos;s nothing there, you&apos;ve lost nothing.
          If there is, you&apos;ll have the data to make a real decision.
        </P>

        <P>
          <span className="text-white/[0.9]">
            &ldquo;Can you actually guarantee takedowns?&rdquo;
          </span>
          {" "}No. And anyone who tells you they can is lying. Platforms and
          registrars make the final decision on whether to take content down.
          What we can guarantee is speed, persistence, and the right escalation
          path for every type of threat. We file through the correct channels
          with properly documented evidence, we follow up until we get a
          resolution, and we escalate through alternative channels when the
          primary path stalls. In practice this resolves the vast majority of
          cases. When it doesn&apos;t, we tell you directly and work with you
          on the next step. But we won&apos;t pretend we have a magic button.
        </P>

        <H2>What we are and what we aren&apos;t</H2>

        <P>
          Mirret is a managed service, not a self-service platform. This is a
          deliberate choice and it&apos;s worth explaining why.
        </P>

        <P>
          The conventional VC-backed approach to this market would be to build a
          dashboard, sell seats, and let customers manage their own scanning
          and takedowns. That&apos;s a good way to build a scalable business.
          It&apos;s a terrible way to solve the actual problem.
        </P>

        <P>
          The problem with dashboards is that they transfer the operational
          burden back to the customer. You still need someone to log in, review
          findings, investigate false positives, draft takedown requests, track
          their progress, and follow up when they stall. Most companies
          don&apos;t have someone whose job that is. So the dashboard goes
          unused, the subscription gets cancelled, and the threats keep running.
        </P>

        <P>
          We chose differently. We run the scans. We verify the threats. We
          file the takedowns. We track the resolutions. You get a weekly report
          with what we found, what we did about it, and what happened. If
          something is urgent, you hear from us immediately. The output is
          not a dashboard you have to manage. It&apos;s a problem that gets
          smaller every week.
        </P>

        <P>
          This means we&apos;re not for everyone. If you want to run your own
          operations in-house and just need scanning data, there are good tools
          for that. We&apos;re for the companies that want the problem solved,
          not just made visible.
        </P>

        <H2>Why AI-native, not AI-adjacent</H2>

        <P>
          Every security company claims to use AI now. Most of them mean
          they&apos;ve added a machine learning model to one stage of their
          existing pipeline. That&apos;s fine as far as it goes. But
          there&apos;s a meaningful difference between a company that uses AI
          as a feature and a company that was designed from the ground up around
          what AI makes newly possible.
        </P>

        <P>
          Almost everything in external attack surface management is pattern
          recognition at scale. Scanning certificate transparency logs for
          suspicious registrations. Diffing DNS records to catch infrastructure
          changes. Scoring visual similarity between a real brand page and a
          fake. Classifying page intent from content and layout. Determining
          whether a new domain is a legitimate partner or a threat. Prioritising
          which takedown to file first based on active financial harm.
        </P>

        <P>
          These tasks are tedious, repetitive, and require processing volumes
          of data that no analyst team can handle. They are exactly the shape of
          problem that AI was built to solve. Not the creative, nuanced, chatbot
          kind of AI. The boring, reliable, classification-and-prioritisation
          kind. The kind that works.
        </P>

        <P>
          What does need humans is the judgement calls. Is this domain a
          franchise partner or a threat? Should we go to the registrar or the
          payment processor first? Is this edge case worth escalating at 2am?
          We put experienced people exactly where they add value &mdash; at
          the decision layer &mdash; and machines everywhere else. Most companies
          in this space have it backwards.
        </P>

        <H2>Why now</H2>

        <P>
          Two shifts happened recently that made this company necessary and
          possible, in that order.
        </P>

        <P>
          The first is that generative AI made impersonation trivially easy.
          Cloning a brand&apos;s visual identity used to require design skills
          and time. Now you can produce a convincing replica of any website in
          an afternoon with off-the-shelf tools. The volume and quality of
          impersonation attacks has grown dramatically. Across our client base,
          the trend is steep and accelerating. This is the new normal, not a
          temporary spike.
        </P>

        <P>
          The second is that the same AI capabilities that make attacks easier
          also make automated defence possible at a scale that wasn&apos;t
          feasible before. Visual similarity scoring, content classification,
          continuous monitoring across millions of data points &mdash; the
          building blocks exist now. They just need to be assembled by people
          who understand both the security domain and how to build reliable
          AI systems. Not chatbots. Systems.
        </P>

        <P>
          We think there&apos;s a narrow window where the companies that build
          AI-native defence define the category. In a few years, every
          serious brand will have continuous external attack surface monitoring.
          The question is whether that monitoring will be good enough to
          actually protect people.
        </P>

        <H2>The name</H2>

        <P>
          Mirret comes from &ldquo;mirror.&rdquo; The whole problem we work on
          is about reflections &mdash; someone creating a mirror of your brand
          to deceive your customers. We find the mirrors. Then we break them.
        </P>

        <div className="mt-24 border-t border-white/[0.08] pt-12">
          <p className="text-[15px] leading-[1.7] text-white/[0.5]">
            We&apos;ll scan your external attack surface for free. No sales
            call, no commitment. If there are threats impersonating your brand
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
