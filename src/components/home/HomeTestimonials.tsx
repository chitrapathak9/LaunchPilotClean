import React from "react";
import { AnimatedTestimonials } from "../ui/animated-testimonials"

export function HomeTestimonials() {
  return (
    <AnimatedTestimonials
      title="Trusted by industry leaders"
      subtitle="Don't just take our word for it. See what founders and engineering teams have to say about partnering with Launch AI Pilot."
      badgeText="Client Success"
      testimonials={[
        {
          id: 1,
          name: "Alex Johnson",
          role: "CTO",
          company: "MedTech Flow",
          content:
            "Launch AI Pilot didn't just build us a healthcare AI tool, they completely redefined our diagnostic workflows. The speed of execution and depth of their technical understanding is unmatched.",
          rating: 5,
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          id: 2,
          name: "Sarah Miller",
          role: "Founder",
          company: "AdScale Metrics",
          content:
            "We were stuck trying to integrate generic LLM wrappers into our ad platform. They came in, scrapped the bloated architecture, and built a custom predictive engine that increased our retention by 40%.",
          rating: 5,
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          id: 3,
          name: "Michael Chen",
          role: "Director of Operations",
          company: "Innovate Logistics",
          content:
            "The 100% code ownership model is a game changer. We didn't just get an app; we got a fully scalable asset that our internal team now easily maintains. They are the top 1% of agency partners.",
          rating: 5,
          avatar: "https://randomuser.me/api/portraits/men/46.jpg",
        },
      ]}
    // trustedCompanies={["Google", "Microsoft", "Airbnb", "Spotify", "Netflix"]}
    // trustedCompaniesTitle="Our engineers have built solutions for"
    />
  );
}
