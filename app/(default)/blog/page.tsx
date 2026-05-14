import { getBlogPosts } from "@/components/mdx/utils";
import PageIllustration from "@/components/page-illustration";
import PostItem from "@/components/post-item";

export const metadata = {
  title: "Healthcare Intelligence Blog - Clear Mind Life",
  description: "Insights on revenue cycle management, AI in healthcare, claims optimization, and compliance — from the team building the autonomous RCM engine.",
};

export default function Blog() {
  const allBlogs = getBlogPosts();

  // Sort posts by date, newest first
  allBlogs.sort((a, b) => {
    return new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
      ? -1
      : 1;
  });

  const categories = [
    { label: "All", active: true },
    { label: "RCM Strategy", active: false },
    { label: "AI & Automation", active: false },
    { label: "Compliance", active: false },
    { label: "Case Studies", active: false },
    { label: "Product Updates", active: false },
  ];

  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-6 tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Healthcare Intelligence
            </div>
            <h1 className="mb-4 text-5xl font-black text-gray-900 tracking-tight">
              The Clear Mind Blog
            </h1>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              Deep dives on revenue cycle management, AI-driven automation, payer policy changes, and how forward-thinking practices are eliminating the $20B claims denial crisis.
            </p>
          </div>

          {/* Categories */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className={`btn-sm font-semibold shadow transition-colors ${
                  cat.active
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-900"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Posts */}
          {allBlogs.length > 0 ? (
            <div className="space-y-10 border-l [border-image:linear-gradient(to_bottom,theme(colors.slate.200),theme(colors.slate.300),transparent)1]">
              {allBlogs.map((post, postIndex) => (
                <PostItem key={postIndex} {...post} />
              ))}
            </div>
          ) : (
            /* Empty state — no MDX posts yet */
            <div className="space-y-6">
              {[
                {
                  tag: "RCM Strategy",
                  title: "Why 20% of Healthcare Revenue Disappears Before It's Collected",
                  desc: "A breakdown of the four critical failure points in the revenue cycle — and how autonomous agents intercept each one before the damage is done.",
                  date: "May 2026",
                  readTime: "8 min read",
                  color: "rose",
                },
                {
                  tag: "AI & Automation",
                  title: "The X12 270/271 Deep Dive: How Real-Time Eligibility Verification Works",
                  desc: "Most practices still verify insurance manually. Here's the exact EDI transaction flow our Receptionist Agent executes in under 2 seconds.",
                  date: "April 2026",
                  readTime: "12 min read",
                  color: "blue",
                },
                {
                  tag: "Compliance",
                  title: "NCCI Edits Explained: The 2.3M Rules That Determine If Your Claim Gets Paid",
                  desc: "CMS publishes 2.3 million Procedure-to-Procedure edit pairs. We loaded all of them. Here's what they mean for your billing team.",
                  date: "March 2026",
                  readTime: "10 min read",
                  color: "violet",
                },
                {
                  tag: "Case Studies",
                  title: "How a 5-Provider NYC Mental Health Practice Recovered $47K in Month One",
                  desc: "Dr. Sarah Chen's practice was losing $180K annually to preventable claim denials. This is the exact workflow change that turned it around.",
                  date: "February 2026",
                  readTime: "6 min read",
                  color: "emerald",
                },
                {
                  tag: "Product Updates",
                  title: "Introducing the Claims Intelligence Agent: Pre-Submission Scrubbing at Scale",
                  desc: "We've trained our ML model on 10M+ historical claims. It now predicts denial probability with 94% accuracy before a single claim leaves your facility.",
                  date: "January 2026",
                  readTime: "5 min read",
                  color: "indigo",
                },
              ].map((post, i) => {
                const colorMap: Record<string, string> = {
                  rose: "bg-rose-50 text-rose-700 border-rose-200",
                  blue: "bg-blue-50 text-blue-700 border-blue-200",
                  violet: "bg-violet-50 text-violet-700 border-violet-200",
                  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
                  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
                };
                return (
                  <div
                    key={i}
                    className="pl-8 relative before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-gray-300 before:-translate-x-[5px]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${colorMap[post.color]}`}>
                        {post.tag}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{post.date} · {post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight hover:text-blue-600 cursor-pointer transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 font-medium leading-relaxed text-sm">
                      {post.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Load more */}
          <div className="mt-12 text-center">
            <button className="btn-sm min-w-[220px] bg-gray-800 py-1.5 text-gray-200 shadow hover:bg-gray-900 font-semibold">
              Load more{" "}
              <span className="ml-2 tracking-normal text-gray-500">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
