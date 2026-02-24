import Testimonial from "@/components/testimonial";
import TestimonialImg01 from "@/public/images/testimonial-01.jpg";
import TestimonialImg02 from "@/public/images/testimonial-02.jpg";
import TestimonialImg03 from "@/public/images/testimonial-03.jpg";
import TestimonialImg04 from "@/public/images/testimonial-04.jpg";
import TestimonialImg05 from "@/public/images/testimonial-05.jpg";
import TestimonialImg06 from "@/public/images/testimonial-06.jpg";
import TestimonialImg07 from "@/public/images/testimonial-07.jpg";
import TestimonialImg08 from "@/public/images/testimonial-08.jpg";
import TestimonialImg09 from "@/public/images/testimonial-09.jpg";

export default function TestimonialsGrid() {
  const testimonials = [
    {
      img: TestimonialImg01,
      name: "Peter Lowe",
      username: "@peterlowex",
      date: "May 19, 2027",
      content:
        "As a founder, having a visually appealing and user-friendly website is essential. This tool not only helped me achieve that but also improved my site's performance and SEO.",
      channel: "Twitter",
    },
    {
      img: TestimonialImg02,
      name: "Rodri Alba",
      username: "@rodri_spn",
      date: "Apr 12, 2027",
      content:
        "Simple has revolutionized the way I manage my work. Its intuitive interface and seamless functionality make staying organized effortless. I can't imagine my life without it.",
      channel: "Twitter",
    },
    {
      img: TestimonialImg03,
      name: "Michele Lex",
      username: "@MikyBrown",
      date: "Mar 04, 2027",
      content:
        "I've tried several website builders before, but none were as user-friendly and versatile as this one. From design to functionality, it exceeded my expectations!",
      channel: "Twitter",
    },
    {
      img: TestimonialImg04,
      name: "Michael Ross",
      username: "@michjack",
      date: "Jan 15, 2027",
      content:
        "Simple lives up to its name in every way. It's incredibly easy to use yet powerful enough to handle all my tasks effortlessly. It's become an essential part of my daily routine.",
      channel: "Twitter",
    },
    {
      img: TestimonialImg05,
      name: "Mike Bryan",
      username: "@mike0point7",
      date: "Dec 02, 2026",
      content:
        "I've been using Simple for over a year now, and it has transformed the way I work. It's intuitive, efficient, and has all the features I need to stay productive.",
      channel: "Twitter",
    },
    {
      img: TestimonialImg06,
      name: "Sarah Rodriguez",
      username: "@sararodriguez",
      date: "Nov 11, 2026",
      content:
        "Simple has made a significant impact on my business. It has helped me streamline my workflow, improve my productivity, and grow my brand. I highly recommend it to anyone looking to do the same.",
      channel: "Twitter",
    },
    {
      img: TestimonialImg07,
      name: "Duncan Mitch",
      username: "@lovingme_",
      date: "Oct 23, 2026",
      content:
        "I've been using Simple for a few months now, and I can't imagine my life without it. It has simplified my work process, increased my efficiency, and helped me achieve my goals faster.",
      channel: "Twitter",
    },
    {
      img: TestimonialImg08,
      name: "Kavisha Mills",
      username: "@kavigirl99",
      date: "Sep 30, 2026",
      content:
        "Simple has been a game-changer for me. It has helped me stay organized, manage my tasks more efficiently, and improve my overall productivity. I can't recommend it enough!",
      channel: "Twitter",
    },
    {
      img: TestimonialImg09,
      name: "Dante Luzzi",
      username: "@dante1987",
      date: "Aug 17, 2026",
      content:
        "I've been using Simple for a while now, and it has transformed the way I work. It's intuitive, efficient, and has all the features I need to stay productive.",
      channel: "Twitter",
    },
  ];

  return (
    <section className="relative before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:h-[120%] before:bg-gradient-to-b before:from-gray-100">
      <div
        className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 to-gray-900 opacity-30 blur-[160px] will-change-[filter]"></div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Powered by an elite technology stack
            </h2>
          </div>
          {/* Logos */}
          <div className="pb-12 md:pb-16">
            <div className="flex flex-wrap items-center justify-center text-gray-500 font-semibold text-xl md:text-2xl gap-8 md:gap-16">
              <div className="flex items-center gap-2">
                <span>OpenAI API</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Cohere API</span>
              </div>
              <div className="flex items-center gap-2">
                <span>FHIR Interoperability</span>
              </div>
              <div className="flex items-center gap-2">
                <span>X12 EDI</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Twilio Programmable SMS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
