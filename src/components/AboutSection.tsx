import React, { useState, useRef, useEffect } from "react";
import { FileText, Eye, Target, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function AboutSection() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const location = useLocation();
  useEffect(() => {
    setOpenSection(null);
  }, [location]);

  // Close on outside click with smooth animation
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenSection(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Section = ({
    id,
    title,
    icon,
    color,
    preview,
    children,
  }: {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    preview: string;
    children: React.ReactNode;
  }) => {
    const isOpen = openSection === id;

    // Define color classes based on color prop
    const getColorClasses = (color: string) => {
      switch (color) {
        case 'blue':
          return {
            bg: 'bg-blue-100',
            button: 'bg-blue-600 hover:bg-blue-700',
            icon: 'text-blue-600'
          };
        case 'green':
          return {
            bg: 'bg-green-100',
            button: 'bg-green-600 hover:bg-green-700',
            icon: 'text-green-600'
          };
        case 'purple':
          return {
            bg: 'bg-purple-100',
            button: 'bg-purple-600 hover:bg-purple-700',
            icon: 'text-purple-600'
          };
        default:
          return {
            bg: 'bg-gray-100',
            button: 'bg-gray-600 hover:bg-gray-700',
            icon: 'text-gray-600'
          };
      }
    };

    const colorClasses = getColorClasses(color);

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg transition-shadow hover:shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${colorClasses.bg}`}
          >
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>

        <p className="text-gray-700 mb-4">{preview}</p>

        {/* Animated Content */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key={id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="overflow-hidden text-gray-700"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="pb-4"
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          layout
          className={`mt-2 px-6 py-3 rounded-full font-semibold text-white ${colorClasses.button} transition`}
          onClick={() => toggleSection(id)}
          whileTap={{ scale: 0.97 }}
        >
          {isOpen ? "Show Less" : "Read More"}
        </motion.button>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 min-h-screen p-6 md:p-12"
    >
      <div className="mb-6 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold text-center text-primary mb-2">
                About Travel Top10
              </h2>
              <p className="text-lg md:text-2xl text-gray-600 font-medium text-center">
                Bringing the World's Best Travel Brands into One Trusted Circle
              </p>
            </div>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Upper Half */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left - Graphic */}
          <div className="relative h-96 mb-8 lg:mb-0">
            {/* Main purple card */}
            <div className="absolute top-0 left-0 w-80 h-64 bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl p-8 shadow-2xl overflow-hidden">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <div className="w-12 h-16 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-t-full relative">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-600 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-600 rounded-b"></div>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 w-28 h-28 border-2 border-yellow-400 rounded-full opacity-60"></div>
                <div className="absolute bottom-4 right-4 w-16 h-20 bg-purple-600 rounded-2xl transform rotate-12">
                  <div className="w-full h-4 bg-purple-500 rounded-t-2xl mt-16"></div>
                </div>
              </div>
            </div>
            {/* Pink clock card */}
            <div className="absolute top-8 right-0 w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 transform rotate-45 flex items-center justify-center shadow-lg">
              <div className="transform -rotate-45">
                {/* Replaced <Clock /> with a simple clock SVG icon to fix missing import */}
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/>
                </svg>
              </div>
            </div>
            {/* Yellow card */}
            <div className="absolute bottom-0 right-8 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 shadow-2xl">
              <div className="w-32 h-24 mx-auto mt-8 relative">
                <div className="w-full h-full bg-purple-600 rounded-t-full rounded-bl-full opacity-80"></div>
                <div className="absolute top-2 left-4 w-6 h-6 bg-purple-700 rounded-full"></div>
                <div className="absolute top-4 right-6 w-4 h-4 bg-purple-700 rounded-full"></div>
                <div className="absolute bottom-4 left-8 w-8 h-2 bg-purple-700 rounded"></div>
                <div className="absolute top-0 left-2 w-28 h-12 border-4 border-purple-700 rounded-full flex">
                  <div className="w-12 h-12 border-2 border-purple-700 rounded-full bg-transparent"></div>
                  <div className="w-4 h-1 bg-purple-700 mt-6"></div>
                  <div className="w-12 h-12 border-2 border-purple-700 rounded-full bg-transparent"></div>
                </div>
              </div>
              <div className="w-24 h-4 bg-purple-800 rounded-full mx-auto mt-4 opacity-60"></div>
            </div>
          </div>
          {/* Right - Welcome (STATIC) */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Welcome to{" "}
              <span className="font-bold text-gray-900">Travel </span>
              <span className="font-bold text-red-500">Top10</span> — your
              trusted companion in unforgettable journeys. Founded in June 2020
              and headquartered in Hyderabad, we specialize in curating and
              delivering top-tier travel and tourism services across India and
              beyond.
            </p>
          </div>
        </div>

        {/* Lower Half */}
        <div className="grid grid-cols-1 gap-8">
          <Section
            id="about"
            title="About Us"
            icon={<FileText className="w-6 h-6 text-blue-600" />}
            color="blue"
            preview="Bringing the World's Best Travel Brands into One Trusted Circle."
          >
            
      <h3 className="text-2xl font-bold text-primary">Welcome to Travel Top10</h3>
      <p>
        Travel Top10 started with a clear goal: to create a group of the most
        trusted, experienced, and high-performing travel brands from around the
        world and bring them closer to customers, industry experts, and
        international partners.
      </p>

      <h3 className="text-2xl font-bold text-primary">The Challenge in the Travel Industry</h3>
      <p>
        For many years, the travel industry has been big, fast-changing, and
        sometimes hard to navigate for people trying to find a trustworthy travel
        service. With so many options out there, it's hard to tell which companies
        offer real value and which are just using clever marketing. That's where
        we step in. At Travel Top10, our mission is to cut through the noise and
        bring you only the very best — the top 10.
      </p>

      <h3 className="text-2xl font-bold text-primary">Our Platform</h3>
      <ul className="pl-6 space-y-2 list-none">
        <li>⭐ Hotels</li>
        <li>⭐ Tour Operators</li>
        <li>⭐ Travel Influencers</li>
        <li>⭐ Destination Management Companies (DMCs)</li>
      </ul>

      <h3 className="text-2xl font-bold text-primary">How We Select</h3>
      <ul className="pl-6 space-y-2 list-none">
        <li>⭐ Company History</li>
        <li>⭐ Performance and Service Quality</li>
        <li>⭐ Customer Trust and Reviews</li>
        <li>⭐ Business Track Record</li>
        <li>⭐ Value Offered</li>
      </ul>

      <h3 className="text-2xl font-bold text-primary">Our Goals</h3>
      <ul className="pl-6 space-y-2 list-none">
        <li>⭐ Help customers find the best travel planner or company</li>
        <li>⭐ Give Indian travel businesses access to the world's top DMCs</li>
        <li>⭐ Bring trusted brands together in a circle of collaboration</li>
      </ul>

      <h3 className="text-2xl font-bold text-primary">What Makes Us Different?</h3>
      <ul className="pl-6 space-y-2 list-none">
        <li>⭐ We are not a marketplace — we are a curated circle</li>
        <li>⭐ We don't just list brands — we choose them with purpose</li>
        <li>⭐ We don't just promote — we honor excellence</li>
        <li>⭐ We work for travelers and industry integrity, not for brands</li>
      </ul>

      <h3 className="text-2xl font-bold text-primary">Our Promise</h3>
      <p>
        Travel Top10 is a community built on honesty, integrity, and trust. For
        customers, this means confidence in the service you get. For travel
        brands, it means recognition for their hard work, ethics, and top-quality
        service.
      </p>

      <h3 className="text-2xl font-bold text-primary">Join Us</h3>
      <p>
        We invite you to explore this circle of trusted brands. Let's travel
        better — together.
      </p>

          </Section>

          <Section
            id="vision"
            title="Our Vision"
            icon={<Eye className="w-6 h-6 text-green-600" />}
            color="green"
            preview="To Build a Global Trust Badge for the World's Most Reliable Travel Brands......"
          >
          <p>
            At <strong>Travel Top10</strong>, our vision is clear and strong: We want to create
            a global travel system that is built on <strong>trust, performance, and high standards</strong>.
            Our goal is to shape the future of travel by building a{" "}
            <strong>Circle of the World's Most Trusted Travel Brands</strong>. This Circle
            brings together travelers, tour operators, hotel owners, influencers, and
            DMCs who share values like honesty, excellent service, and happy customers.
          </p>
    
          <h3 className="text-2xl font-bold text-primary">✨ A Global Circle of Trust</h3>
          <p>
            Today, travelers face too many choices but not enough clear information.
            The internet is filled with ads, fake reviews, and overpromising websites.
            It's hard to know which brands are truly trustworthy.
          </p>
          <p>
            That's where <strong>Travel Top10</strong> comes in. We're not just another
            listing site. We are a <strong>carefully chosen community</strong> of the
            most reliable and proven travel professionals. Being part of this Circle
            is <strong>earned</strong> — through success, ethics, and service, not
            through buying ads.
          </p>
    
          <h3 className="text-2xl font-bold text-primary">💡 Why We Exist</h3>
          <ul className="pl-6 space-y-3 list-none">
            <li>
              ⭐ <strong>Information Overload</strong> — Many low-performing brands appear
              trustworthy online. Travel Top10 does detailed checks and only highlights
              brands that meet our strict standards in service, experience, and honesty.
            </li>
            <li>
              ⭐ <strong>Trust Deficit</strong> — Too many travelers face unreliable agents
              or fake websites. We restore trust with verified listings based on
              customer feedback, compliance, and values.
            </li>
            <li>
              ⭐ <strong>Disconnected Excellence</strong> — Many excellent travel
              professionals struggle to connect with the right markets. We connect
              global DMCs with India's most trusted agencies.
            </li>
          </ul>
    
          <h3 className="text-2xl font-bold text-primary">🤝 Our Commitments</h3>
          <ul className="pl-6 space-y-3 list-none">
            <li>
              ⭐ <strong>City-Specific & Category-Focused</strong> — Top 10 brands in
              every city and category (Hotels, DMCs, Tour Operators, Influencers).
            </li>
            <li>
              ⭐ <strong>Quality-Driven Global Network</strong> — A referral network
              trusted by both travelers and professionals.
            </li>
            <li>
              ⭐ <strong>Support for Local Excellence</strong> — Giving local brands
              global visibility if they meet our standards.
            </li>
            <li>
              ⭐ <strong>Gateway for International DMCs</strong> — Providing a trusted
              entry point for global DMCs into India.
            </li>
            <li>
              ⭐ <strong>Educational & Ethical Force</strong> — Promoting ethics,
              transparency, and sustainability across the travel industry.
            </li>
          </ul>
    
          <h3 className="text-2xl font-bold text-primary">🏅 The Global Trust Badge</h3>
          <p>
            Just like a <strong>Michelin Star in dining</strong> or an{" "}
            <strong>ISO quality certification</strong>, Travel Top10 will be the{" "}
            <strong>gold standard of trust</strong> in travel — a badge travelers can
            instantly recognize and rely on.
          </p>
          <p>
            For travel businesses, being listed means belonging to a global elite.
            For travelers, it guarantees safety, reliability, and excellence.
          </p>
    
          <h3 className="text-2xl font-bold text-primary">🌐 More Than a Website</h3>
          <p>
            Travel Top10 is more than a platform — it's a movement to redefine trust
            in travel: one city at a time, one category at a time, one brand at a time.
          </p>
          <p>
            ✅ Join the Circle <br />
            ✅ Trust the Badge <br />
            ✅ Welcome to <strong>Travel Top10</strong>
          </p>
    
          </Section>

          <Section
            id="mission"
            title="Our Mission"
            icon={<Target className="w-6 h-6 text-purple-600" />}
            color="purple"
            preview='"When the best come together, travel becomes extraordinary."'
          >
          <p className="text-lg font-bold">To Build the Strongest Network of Trusted Travel Brands That Deliver Flawless Experiences</p>
          
          <p>At Travel Top10, our mission is to create a powerful, refined network of the most trusted, and reliable travel brands — a carefully chosen group where only the very best are recognized and showcased around the world.</p>
          
          <p>In today's world, where there are so many travel choices but very few trustworthy options, we are building a platform where quality is not just guessed — it is guaranteed. Travelers will no longer have to rely on random reviews or online ads. Instead, they can come to Travel Top10 to find the top-performing, most dependable travel brands in every category, selected based on real-world performance, consistency, and past trustworthiness.</p>
          
          <h3 className="text-2xl font-bold text-primary">Our Focus</h3>
          <ul className="pl-6 space-y-2 list-none">
            <li>⭐ To find and highlight the Top 10 brands in every major travel category — including Hotels, Tour Operators, Travel Influencers, and Destination Management Companies (DMCs).</li>
            <li>⭐ To create a trusted reference point for travelers and industry professionals who are looking for only the most reliable and proven travel service providers.</li>
            <li>⭐ To form a closed circle of elite travel brands — not a list created by the public, but a handpicked network based on strict standards of track record, client satisfaction, ethics, and excellent service.</li>
          </ul>
          
          <h3 className="text-2xl font-bold text-primary">How Brands Earn Their Place</h3>
          <ul className="pl-6 space-y-2 list-none">
            <li>⭐ Years of consistent service</li>
            <li>⭐ Open and honest business practices</li>
            <li>⭐ Customer loyalty and satisfaction</li>
            <li>⭐ Proven expertise and knowledge of destinations</li>
            <li>⭐ Strong leadership and ethical values</li>
          </ul>
          
          <p>We do not accept brands based on popularity, marketing, or paid promotions. Each entry is earned through performance and merit — because we believe trust cannot be bought, it must be built.</p>
          
          <p>This mission is not just about listing brands — it is about creating a reliable global travel system. Through this initiative, we are building a Circle of Trustworthy Travel Brands, where travelers can choose their travel partner with confidence, and brands can connect with equally credible peers, both in India and worldwide.</p>
          
          <h3 className="text-2xl font-bold text-primary">Our Mission Has Two Parts</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>1. For Travelers:</strong> We want to give travelers one place where they can find the most trusted names in the travel industry, both locally and globally. Whether it's booking a honeymoon to Europe, choosing a tour guide in Rajasthan, travelers will come to Travel Top10 knowing they are looking at only the top-tier professionals.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>2. For the Travel Industry:</strong> We aim to offer a platform where travel businesses that meet the highest standards can gain visibility, trust, and new opportunities. For international DMCs, this becomes a way to work with India's best tour operators. For domestic travel agents, it becomes a community of excellence and collaboration, with no place for average service.</p>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-primary">We Envision Travel Top10 Becoming</h3>
          <ul className="pl-6 space-y-2 list-none">
            <li>⭐ The most respected recognition in the travel industry</li>
            <li>⭐ A standard of quality for customers and partners</li>
            <li>⭐ A business network based purely on merit and mutual respect</li>
            <li>⭐ A source of inspiration for travel professionals to keep raising their standards</li>
          </ul>
          
          <p>This is not a short-term campaign. It is a long-term movement backed by decades of industry experience. Our founding team has spent over 18–20 years working across different areas of travel — building relationships with global DMCs, organizing FITs and groups, solving challenges on the ground, and most importantly, learning what trust and service really mean.</p>
          
          <p>That experience is now being used in Travel Top10, where our mission is not just to list — but to elevate, connect, and empower the best travel brands around the world.</p>
          
          <p>We are creating a brand that travelers will trust without hesitation — and one that the travel industry will value as a symbol of excellence.</p>
          
          <div className="bg-primary/10 p-6 rounded-lg text-center">
            <p className="text-lg font-bold">This is more than a platform.</p>
            <p className="text-lg">It's a Circle. A Standard. A Seal of Excellence.</p>
            <p className="text-lg font-bold text-primary">Welcome to Travel Top10 — where only the best belong.</p>
          </div>
    
          </Section>
        </div>
      </div>
    </div>
  );
}
