"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Search,
  ArrowRight,
  Play,
  Music,
  Utensils,
  Wine,
  Camera,
  MessageSquare,
  X,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  Star,
  Quote,
  Clock,
  Heart,
  Compass,
  Volume2,
  Tv,
} from "lucide-react";

export default function About() {
  // Theme Showcase State
  const [activeThemeTab, setActiveThemeTab] = useState("neon");

  // Interactive Vibe Builder State
  const [guestCount, setGuestCount] = useState(120);
  const [vibeIntensity, setVibeIntensity] = useState(85); // 0-100
  const [selectedVibeStyle, setSelectedVibeStyle] = useState("luxe");
  const [cateringType, setCateringType] = useState("mixology");
  const [builderOutput, setBuilderOutput] = useState({
    tier: "Signature Gold",
    recommendation:
      "A sensational evening under dim ambient lights with tailored soundscapes.",
    estimatedHours: "6 Hours",
    intensityLabel: "Deep & Electric",
  });

  // Testimonials Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Custom Booking Quote Popup / Form State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactNotes, setContactNotes] = useState("");
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState(false);

  // Active Story Milestone State
  const [activeMilestone, setActiveMilestone] = useState(0);

  // FAQ Expand state
  const [faqOpenState, setFaqOpenState] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
  });

  // Themes data
  const eventThemes = [
    {
      id: "neon",
      name: "Neon Noir Glow",
      subtitle: "Electric Retro Future",
      description:
        "Step into a high-contrast hyper-visual wonderland. Infused with rich magenta UV beams, sleek customizable light installations, and an absolute electric pulse that makes dancing look mesmerizing.",
      colorScheme: "Magenta & Midnight Glow",
      gradient: "from-pink-500 via-purple-600 to-indigo-900",
      vibeScore: 98,
      featuredTrack: "Pulse: Retro Synthwave Mix (124BPM)",
      vibeHighlight: "Late-night premium rave & club energy",
      perks: [
        "Interactive Laser Mapping",
        "UV-Reactive Craft Cocktails",
        "Acoustic Sound-Isolation Pods",
      ],
    },
    {
      id: "gala",
      name: "Royal Velvet Gala",
      subtitle: "Timeless Classical Splendor",
      description:
        "Opulence reimagined for contemporary visionaries. Muted gold detailing, deep plush crimson accents, towering crystal lights, and bespoke orchestral quartets blending dynamically with ambient chill house.",
      colorScheme: "Velvet Pink, Gold & Charcoal",
      gradient: "from-amber-100 via-pink-100 to-rose-200",
      vibeScore: 78,
      featuredTrack: "Symphony: Classical Orchestral Remix",
      vibeHighlight: "Elegant, ultra-exclusive high-society gala",
      perks: [
        "Gourmet 7-Course Degustation",
        "Bespoke Chandelier Installation",
        "White-Glove Butler Concierge",
      ],
    },
    {
      id: "garden",
      name: "Pastel Garden",
      subtitle: "Whimsical Floral Dreamscape",
      description:
        "An ethereal, light-filled paradise blooming with fresh pastel roses, interactive botanical arches, fairy-light canopies, and custom acoustic organic house. Absolute bliss for daydreamers and sunlit lovers.",
      colorScheme: "Cotton Candy Pink & Fresh Linen",
      gradient: "from-rose-500/20 via-pink-500/30 to-indigo-500/5",
      vibeScore: 60,
      featuredTrack: "Ethereal: Sweet Organic Soft Melodies",
      vibeHighlight: "Sunbasked botanical high-tea & twilight dinners",
      perks: [
        "Edible Floral Mixology Bar",
        "Ambient Forest Soundscape",
        "Immersive Living Wall Backdrops",
      ],
    },
    {
      id: "lounge",
      name: "Chic Penthouse",
      subtitle: "Ultra-Minimalist Sky Oasis",
      description:
        "Sleek brushed brass, structural low-profile white leather lounges, marble firepits, and panoramic city views. Curated deep progressive house, creating an effortlessly cool and highly conversational playground.",
      colorScheme: "Rose Gold, Platinum & Cream",
      gradient: "from-pink-100 via-rose-50 to-white",
      vibeScore: 88,
      featuredTrack: "Skyline: Velvet Underground Deep House",
      vibeHighlight: "Sophisticated premium cocktail lounges",
      perks: [
        "360° Skyline Holographic View",
        "Rare Vintage Cigar Room",
        "Molecular Caviar Bar",
      ],
    },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Genevieve Montgomery",
      role: "Global Creative Director",
      event: "Vatican Pink Masquerade Gala (350 Guests)",
      quote:
        "Celebrations crafted an experience so visually astounding and operationally perfect that our elite international guests are still talking about it. The pink satin drapery alongside modern laser mapping was pure genius.",
      rating: 5,
      vibe: "Royal Velvet Gala",
    },
    {
      id: 2,
      name: "Sir Harrison Mercer",
      role: "Tech Innovator & Philanthropist",
      event: "Cyber Punk Neon Birthday (150 Guests)",
      quote:
        "I wanted something completely out of this world, not your typical luxury boring party. They built a custom pink-glow neon labyrinth inside a historic hangar. The cocktails glowed and matched the DJ music real-time. Unmatched caliber!",
      rating: 5,
      vibe: "Neon Noir Glow",
    },
    {
      id: 3,
      name: "Amara Vance",
      role: "Fashion & Fine Arts Curator",
      event: "Private Blossom Spring Showcase (80 Guests)",
      quote:
        "Delicate, artistic, and breathtaking. From the bespoke botanical scents customized for our runway to the molecular strawberry champagne spheres, their attention to the minutiae of the guest experience is simply outstanding.",
      rating: 5,
      vibe: "Pastel Garden",
    },
  ];

  // FAQ questions
  const faqs = [
    {
      question: "What makes Celebrations' booking process uniquely premium?",
      answer:
        "We bypass standard booking form models entirely. Every single celebration is assigned its own dedicated Spatial & Culinary Designer. Together, we preview state-of-the-art interactive mood cards, custom ambient scent profiles, soundscapes, and digital mockups with absolute high-fidelity precision before any contract is finalized.",
    },
    {
      question: "Can we book destinations outside of main capital cities?",
      answer:
        "Absolutely. Our elite logistics network specializes in transforming atypical settings—be it remote private islands, historical chateaus, active industrial hangars, or brutalist concrete basements—into ultra-luxurious, state-certified event zones.",
    },
    {
      question: "Do you manage entire guest lists and RSVP logistics?",
      answer:
        "Yes, we handle the entire ecosystem of your host responsibilities. Our premium services offer digital biometric RSVP integrations, private security clearance handling, absolute confidentiality protection, bespoke physical invitation craftwork, and luxury pick-up/drop-off transport fleets.",
    },
    {
      question: "How far in advance should we secure our celebration date?",
      answer:
        "Due to high-society demand and our highly selective schedule (we only design a maximum of 4 major events worldwide per month to guarantee flawless prestige), we recommend initiating your consultation 4 to 12 months in advance.",
    },
  ];

  // Story Milestones
  const milestones = [
    {
      year: "2019",
      title: "The Spark of Rebel Elegance",
      desc: "Founded in Milan by a trio of rebellious event planners tired of sterile, cookie-cutter ballroom events. We aimed to fuse classical elegance with experimental futuristic pink light systems.",
    },
    {
      year: "2021",
      title: "The Famous Pink Airport Hangar Party",
      desc: "Designed our breakthrough private gala inside an active aircraft hangar transformed with high-society pink floral canopies. Over 500 VIPs attended and it went down as the party of the century.",
    },
    {
      year: "2023",
      title: "Bespoke Hologram Launch",
      desc: "Pioneered custom holographic spatial projection mapping, allowing hosts to completely change the walls, ceilings, and room architecture of a venue with a single iPad touch.",
    },
    {
      year: "2026",
      title: "Globally Renowned Icon",
      desc: "With offices in New York, London, Tokyo, and Milan, Celebrations now defines the gold standard for high-end bespoke experiences, private galas, luxury birthdays, and premium visual branding events.",
    },
  ];

  // Interactive Vibe Builder algorithm
  useEffect(() => {
    let tier = "Signature Luxe";
    let label = "Sophisticated Pulse";
    let recommendation = "";
    let hours = "5 Hours";

    // Tier based on guests and intensity
    const totalMetaphoricalEnergy = guestCount * (vibeIntensity / 100);

    if (selectedVibeStyle === "neon") {
      hours = "7 Hours";
      label =
        vibeIntensity > 75 ? "Hyper-Electric Rave" : "Subtle Cyber Atmospheric";
      if (guestCount > 200) {
        tier = "Elite Ultra-Neon Rave";
        recommendation =
          "An immersive warehouse-scale masterpiece with synchronized neon lasers, state-level surround sound, live mixologists, and dynamic liquid-nitrogen cooling pods.";
      } else {
        tier = "Electric Neon Clubroom";
        recommendation =
          "A high-contrast luxury private club experience. Glowing neon cocktail glasses, interactive reactive DJ booth, and customized ultra-premium soundscapes.";
      }
    } else if (selectedVibeStyle === "luxe") {
      hours = "6 Hours";
      label =
        vibeIntensity > 80
          ? "Dynamic Kinetic Grandeur"
          : "Sleek Low-Frequency Chill";
      if (guestCount > 150) {
        tier = "Infinite Royal Velvet Bespoke";
        recommendation =
          "The peak of contemporary prestige. Includes a custom-built grand central stage, classical ensembles blending with progressive DJs, live molecular dining, and rare wine arrays.";
      } else {
        tier = "Modern Royal Velvet Salon";
        recommendation =
          "An ultra-exclusive private gallery transformation. Soft velvet booths, glowing glass floral displays, and rare premium tastings under handcrafted brass accents.";
      }
    } else if (selectedVibeStyle === "organic") {
      hours = "8 Hours (Day to Night)";
      label =
        vibeIntensity > 70
          ? "Sunlight to Firepit Sunset"
          : "Ethereal Botanical Retreat";
      if (guestCount > 180) {
        tier = "Imperial Botanical Wonderland";
        recommendation =
          "A spectacular outdoor flow. Immersive lavender & white-orchid ceiling canopies, active projection mapping on surrounding forest cover, edible organic cocktail bar, and deep forest melodies.";
      } else {
        tier = "Private Blossom Sanctuary";
        recommendation =
          "A delightful, highly intimate sun-basked glass pavilion event. Organic soft acoustics, acoustic sound nests, and custom-infused multi-sensory culinary tasting menus.";
      }
    } else {
      hours = "4 Hours (High Velocity)";
      label = "Ultra-High Density Sparkle";
      tier = "Penthouse Golden Skyline";
      recommendation =
        "High-society networking and celebratory vibe. Dynamic champagne towers, molecular caviar spoons, 360-degree holographic sky backdrops, and incredibly polished minimal electronic acoustics.";
    }

    setBuilderOutput({
      tier,
      recommendation,
      estimatedHours: hours,
      intensityLabel: label,
    });
  }, [guestCount, vibeIntensity, selectedVibeStyle, cateringType]);

  const toggleFaq = (index) => {
    setFaqOpenState((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const submitQuoteRequest = (e) => {
    e.preventDefault();
    if (contactEmail.trim() === "") return;
    setIsQuoteSubmitted(true);
    setTimeout(() => {
      // Clear or close after success display
    }, 4000);
  };

  const currentTheme =
    eventThemes.find((t) => t.id === activeThemeTab) || eventThemes[0];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-pink-300 selection:text-pink-900 overflow-x-hidden">
      {/* EXQUISITE BACKGROUND MESH: Highly Premium Pink & White Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink-200/50 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-[1200px] right-0 w-[500px] h-[500px] bg-pink-100/60 rounded-full blur-[140px] translate-x-1/3"></div>
        <div className="absolute bottom-[800px] left-10 w-[700px] h-[700px] bg-rose-100/40 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-0 right-[15%] w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-[110px] translate-y-1/3"></div>
        {/* Fine grid overlay layer for technological/premium precision alignment */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #db2777 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      {/* STICKY GLASS HEADER */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                CELEBRATIONS
              </span>
              <span className="block text-[9px] uppercase tracking-[0.3em] font-medium text-slate-400">
                Crafting Legacies
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600">
            <a
              href="#why-celebrate"
              className="hover:text-pink-600 transition-colors uppercase tracking-wider text-xs"
            >
              Architectural Philosophy
            </a>
            <a
              href="#theme-explorer"
              className="hover:text-pink-600 transition-colors uppercase tracking-wider text-xs"
            >
              Event Themes
            </a>
            <a
              href="#vibe-calculator"
              className="hover:text-pink-600 transition-colors uppercase tracking-wider text-xs"
            >
              Vibe Architect
            </a>
            <a
              href="#our-legacy"
              className="hover:text-pink-600 transition-colors uppercase tracking-wider text-xs"
            >
              Our Journey
            </a>
            <a
              href="#faq"
              className="hover:text-pink-600 transition-colors uppercase tracking-wider text-xs"
            >
              Bespoke QA
            </a>
          </nav>

          <button
            onClick={() => setIsQuoteModalOpen(true)}
            id="cta_header_booking"
            className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-pink-600 text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-pink-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Initiate Consultation
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 pb-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/75 border border-pink-200/50 text-pink-700 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-pink-500" />
              <span>We do not plan events. We draft masterworks.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-slate-900 leading-tight">
              Bespoke Party Design for <br className="hidden sm:inline" />
              <span className="font-extrabold bg-gradient-to-r from-pink-600 via-rose-500 to-indigo-600 bg-clip-text text-transparent">
                Exceptional Minds.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Celebrations is a world-renowned creative studio operating at the
              intersection of avant-garde spatial design, molecular gastronomy,
              and pure atmospheric wizardry. We execute flawless events from
              secret bunkers to high-altitude skyline glasshouses.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("vibe-calculator");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                id="hero_btn_builder"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-sm tracking-widest uppercase shadow-lg shadow-pink-200 transition-all transform hover:-translate-y-1"
              >
                Launch Vibe Builder
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("theme-explorer");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                id="hero_btn_explore"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-800 font-bold text-sm tracking-widest uppercase hover:bg-slate-50 hover:border-pink-300 transition-all flex items-center justify-center gap-2"
              >
                <span>Browse Event Themes</span>
                <ChevronRight className="w-4 h-4 text-pink-500" />
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-8 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
              <div className="border-l-2 border-pink-400 pl-4">
                <span className="block text-2xl lg:text-3xl font-extrabold text-slate-900">
                  4
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Global Offices
                </span>
              </div>
              <div className="border-l-2 border-pink-400 pl-4">
                <span className="block text-2xl lg:text-3xl font-extrabold text-slate-900">
                  1.2k+
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Bespoke Galas
                </span>
              </div>
              <div className="border-l-2 border-pink-400 pl-4">
                <span className="block text-2xl lg:text-3xl font-extrabold text-slate-900">
                  100%
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Unforgettable
                </span>
              </div>
            </div>
          </div>

          {/* Interactive visual collage representing potential */}
          <div className="flex-1 w-full relative">
            <div className="relative max-w-xl mx-auto lg:ml-auto">
              {/* Backglow panel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-[3rem] blur-2xl transform rotate-3"></div>

              {/* Main Premium Card Mock */}
              <div className="relative bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] p-6 shadow-2xl shadow-pink-100 z-10">
                {/* Simulated Glass interface of booking concierge */}
                <div className="flex items-center justify-between pb-6 border-b border-pink-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-300 bg-pink-100 flex items-center justify-center font-bold text-pink-700">
                      CL
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Celebration Planner v4.2
                      </h4>
                      <p className="text-[11px] font-medium text-pink-500">
                        Online & Active - Milan Lounge
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>{" "}
                    Live Architect
                  </span>
                </div>

                {/* Simulated active booking preview mockup */}
                <div className="py-6 space-y-5">
                  <div className="bg-slate-50/70 p-4 rounded-2xl border border-pink-100/50">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">
                      Active Concept
                    </p>
                    <h5 className="text-lg font-bold text-slate-800">
                      Cannes Midnight Neon Gala
                    </h5>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-pink-500" /> Private
                        Villa
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-pink-500" /> 180 VIPs
                      </span>
                    </div>
                  </div>

                  {/* Curated status items */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-white border border-pink-100 rounded-xl flex items-center gap-2.5">
                      <Music className="w-4 h-4 text-pink-500 shrink-0" />
                      <div>
                        <p
                          className="text-slate-400 font-semibold mb-0.5"
                          style={{ fontSize: "9px" }}
                        >
                          SOUND ARCHITECTURE
                        </p>
                        <p className="font-bold text-slate-700 leading-tight">
                          Dolby 7D Spatial
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white border border-pink-100 rounded-xl flex items-center gap-2.5">
                      <Wine className="w-4 h-4 text-pink-500 shrink-0" />
                      <div>
                        <p
                          className="text-slate-400 font-semibold mb-0.5"
                          style={{ fontSize: "9px" }}
                        >
                          CATERING CONCEPT
                        </p>
                        <p className="font-bold text-slate-700 leading-tight">
                          Molecular Sorbet
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white border border-pink-100 rounded-xl flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-pink-500 shrink-0" />
                      <div>
                        <p
                          className="text-slate-400 font-semibold mb-0.5"
                          style={{ fontSize: "9px" }}
                        >
                          ATMOSPHERIC LIGHTING
                        </p>
                        <p className="font-bold text-slate-700 leading-tight">
                          Sensory Glow V3
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white border border-pink-100 rounded-xl flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                      <div>
                        <p
                          className="text-slate-400 font-semibold mb-0.5"
                          style={{ fontSize: "9px" }}
                        >
                          SATISFACTION RATING
                        </p>
                        <p className="font-bold text-slate-700 leading-tight">
                          99.98% Exceptional
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ambient micro visualizer bar representing live music */}
                  <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center animate-pulse">
                        <Volume2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[9px] text-pink-300 font-bold uppercase tracking-widest">
                          PROPOSED PLAYLIST
                        </p>
                        <p className="text-xs font-bold truncate max-w-[150px]">
                          Luxe Euphoria House Set
                        </p>
                      </div>
                    </div>
                    {/* Visualizer bars */}
                    <div className="flex items-end gap-1 h-6">
                      <div
                        className="w-1 bg-pink-400 h-3 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 bg-pink-500 h-5 rounded-full animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      ></div>
                      <div
                        className="w-1 bg-rose-400 h-2 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-1 bg-pink-300 h-4 rounded-full animate-bounce"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Bottom luxury branding signature */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-2 uppercase tracking-wide border-t border-slate-100">
                  <span>Certified High-Class</span>
                  <span>EST. 2019</span>
                </div>
              </div>

              {/* Decorative Floating items showing interactive feedback */}
              <div className="absolute -top-6 -right-6 bg-pink-600 text-white font-extrabold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-2xl shadow-lg z-20 flex items-center gap-2 hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" /> Selected: VIP Pink Satin Vibe
              </div>

              <div className="absolute -left-6 bottom-16 bg-white border border-pink-100 p-3 rounded-2xl shadow-xl z-20 flex items-center gap-2.5 hover:scale-105 transition-transform">
                <div className="p-2 rounded-xl bg-pink-50 text-pink-600">
                  <Heart className="w-4.5 h-4.5 fill-pink-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    5 Star Premium Care
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Awarded best design
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CELEBRATIONS SECTION: Architectural Philosophy */}
      <section
        id="why-celebrate"
        className="relative z-10 py-24 select-none bg-white block-shadow border-t border-b border-pink-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <p className="text-pink-600 text-xs font-extrabold tracking-[0.25em] uppercase">
              Meticulous Rigor Meets High Art
            </p>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-slate-900">
              Why Discerning Hosts Work with <br className="hidden md:inline" />
              <span className="font-extrabold bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Celebrations Event Architecture
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-pink-600 to-indigo-600 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-base leading-relaxed pt-2">
              Most planners follow lists. We invent visual languages, design
              tailored light velocities, and orchestrate sensory transformations
              that leave crowds awestruck.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <Compass className="w-7 h-7 text-pink-600" />,
                title: "Bespoke Spatial Architecture",
                description:
                  "We don't accept standard venue parameters. We install floating ceiling foliage, build customized high-gloss pink staging, and integrate holographic panels that expand any architectural footprint instantly.",
              },
              {
                icon: <Wine className="w-7 h-7 text-pink-600" />,
                title: "Multi-Sensory Culinary Identity",
                description:
                  "Catering is theatre. Enjoy slow-melting strawberry-champagne pearls, molecular smoke desserts, customized interactive pink cocktail clouds, and organic ingredients sourced under deep planetary tracking cycles.",
              },
              {
                icon: <Music className="w-7 h-7 text-pink-600" />,
                title: "Custom Laser & Light Curation",
                description:
                  "Using high-end custom software pipelines, our designers sync fine neon vectors, glowing ambient arrays, and dynamic projection mapping to mimic the rhythm of high-tier live musicians.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-[2rem] p-8 border border-pink-100/40 hover:border-pink-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-pink-100/60 group-hover:bg-pink-600 text-pink-600 group-hover:text-white flex items-center justify-center mb-6 transition-all shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-pink-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Philosophy Spotlight */}
          <div className="mt-16 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[100px]"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-xl space-y-4">
                <span className="text-pink-400 text-xs font-bold uppercase tracking-widest block">
                  Core Philosophic Manifesto
                </span>
                <h3 className="text-2xl md:text-3.5xl font-extrabold leading-tight">
                  "Perfect parties happen twice. Once inside the architectural
                  blueprint, and once in the memory of a lifetime."
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Every celebration is an act of artistic dialogue. We refuse
                  boilerplate templates. When working with Celebrations, you are
                  partnering with specialized designers, sound scientists,
                  acoustic curators, and molecular chefs.
                </p>
              </div>
              <div className="shrink-0 flex items-center justify-center p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md w-full lg:w-96 text-left space-y-4 flex-col">
                <div className="w-full flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-pink-500 animate-ping"></div>
                  <span className="text-xs uppercase font-extrabold text-pink-400 tracking-wider">
                    Aesthetic Standard
                  </span>
                </div>
                <div className="w-full space-y-3.5">
                  <div className="flex justify-between border-b border-white/5 pb-2 text-[13px]">
                    <span className="text-slate-400">
                      Perfect Precision Pitch:
                    </span>
                    <span className="font-bold text-slate-100">99.8%</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2 text-[13px]">
                    <span className="text-slate-400">
                      Catering Sophistication:
                    </span>
                    <span className="font-bold text-slate-100">
                      Bespoke Only
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2 text-[13px]">
                    <span className="text-slate-400">Atmosphere Tone:</span>
                    <span className="font-bold text-slate-100">
                      Warm Pink Velvet & Soft Gold
                    </span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-slate-400">
                      RSVP Control Strategy:
                    </span>
                    <span className="font-bold text-slate-100">
                      Biometric & Elite Concierge
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC EVENT THEME EXPLORER SECTION: Interactive tabs with stunning graphics */}
      <section
        id="theme-explorer"
        className="relative z-10 py-24 select-none px-6 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold tracking-wider uppercase">
              Curated Atmospheric Blueprints
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight">
              Explore Our Signature{" "}
              <span className="font-extrabold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                Event Themes
              </span>
            </h2>
            <p className="text-slate-500 text-sm">
              We have designed four pre-configured atmospheric palettes, each
              built specifically to capture a deeply unique emotional energy.
              Select a theme below to view its visual specs and spatial design
              items.
            </p>
          </div>

          {/* Interactive Navigation Tabs to browse EventThemes */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            {eventThemes.map((theme) => {
              const isActive = activeThemeTab === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setActiveThemeTab(theme.id)}
                  id={`theme_tab_${theme.id}`}
                  className={`px-5 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                      : "bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:border-pink-300 shadow-sm"
                  }`}
                >
                  {theme.name}
                </button>
              );
            })}
          </div>

          {/* Large dynamic viewport of selected theme */}
          <div className="relative mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeThemeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-[3rem] p-8 md:p-12 border border-pink-100 shadow-xl overflow-hidden relative"
              >
                {/* Visual Accent Gradient Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div
                    className={`p-8 rounded-[2rem] bg-gradient-to-br ${currentTheme.gradient} text-white relative overflow-hidden aspect-video lg:aspect-square flex flex-col justify-between shadow-lg`}
                  >
                    {/* Decorative high tech circles */}
                    <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-4 left-4 text-xs font-bold bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {currentTheme.subtitle}
                    </div>

                    <div className="space-y-3 z-10">
                      <Sparkles className="w-8 h-8 text-white/95" />
                      <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                        {currentTheme.name}
                      </h3>
                      <p className="text-white/80 text-xs tracking-wider uppercase font-semibold">
                        Mood Score: {currentTheme.vibeScore}% Premium Energy
                      </p>
                    </div>

                    <div className="z-10 mt-6 pt-4 border-t border-white/10">
                      <p className="text-[10px] text-white/65 uppercase tracking-widest font-bold">
                        Recommended Playlist
                      </p>
                      <p className="text-sm font-bold flex items-center gap-2 mt-1">
                        <Play className="w-3.5 h-3.5 fill-white" />{" "}
                        {currentTheme.featuredTrack}
                      </p>
                    </div>
                  </div>

                  {/* Vibe Summary Stats */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">
                        Color Palette
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {currentTheme.colorScheme}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">
                        Signature Event Style
                      </p>
                      <p className="text-sm font-bold text-pink-600 capitalize">
                        {currentTheme.vibeHighlight}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Conceptual Detail Text & Feature Selection */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-widest text-pink-500">
                        Theme Atmosphere Breakdown
                      </span>
                      <h3 className="text-2xl sm:text-3.5xl font-extrabold text-slate-800 mt-1">
                        {currentTheme.subtitle}
                      </h3>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed">
                      {currentTheme.description}
                    </p>

                    <div className="space-y-3.5">
                      <p className="text-slate-700 text-xs uppercase tracking-widest font-bold">
                        Inclusive Luxury Features
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentTheme.perks.map((perk, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-slate-50/70 border border-pink-100/50 rounded-xl"
                          >
                            <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <span className="text-xs font-semibold text-slate-700">
                              {perk}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions for theme interaction */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      onClick={() => {
                        setSelectedVibeStyle(currentTheme.id);
                        const el = document.getElementById("vibe-calculator");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      id="theme_setup_action"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Load in Vibe Architect</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* DYNAMIC VIBE CALCULATOR SECTION (Aesthetic Configuration Showcase) */}
      <section
        id="vibe-calculator"
        className="relative z-10 py-24 select-none px-6 bg-white border-t border-b border-pink-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold tracking-wider uppercase">
              Interactive Sandbox Playground
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight">
              Interactive{" "}
              <span className="font-extrabold bg-gradient-to-r from-pink-600 via-rose-500 to-indigo-600 bg-clip-text text-transparent">
                Vibe Architect
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-pink-600 to-indigo-600 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-sm">
              Adjust the physical constraints of your upcoming celebration. Our
              digital atmosphere compiler will immediately suggest premium
              spatial adjustments, sound directions, and aesthetic highlights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Control Panel Panel */}
            <div className="lg:col-span-6 bg-slate-50 p-8 rounded-[2.5rem] border border-pink-100/60 shadow-inner space-y-8">
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2 pb-4 border-b border-pink-100">
                <Sparkles className="w-5 h-5 text-pink-500" /> Adjust Variables
              </h3>

              {/* Variable 1: Guest Volume */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Attendee Cohort Size
                  </label>
                  <span className="text-sm font-extrabold text-pink-600">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="500"
                  step="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-pink-600 focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>30 (Intimate Lounge)</span>
                  <span>500 (Grand Carnival)</span>
                </div>
              </div>

              {/* Variable 2: Selected Vibe Style */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Baseline Aesthetic Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      id: "neon",
                      name: "Cyber Neon Noir",
                      color: "bg-pink-100 border-pink-400 text-pink-700",
                    },
                    {
                      id: "luxe",
                      name: "Royal Velvet Gala",
                      color:
                        "bg-emerald-50 border-emerald-300 text-emerald-800",
                    },
                    {
                      id: "organic",
                      name: "Botanical Garden",
                      color: "bg-indigo-50 border-indigo-200 text-indigo-700",
                    },
                    {
                      id: "penthouse",
                      name: "Premium Penthouse",
                      color: "bg-amber-50 border-amber-300 text-amber-800",
                    },
                  ].map((style) => {
                    const isSelected = selectedVibeStyle === style.id;
                    return (
                      <button
                        key={style.id}
                        onClick={() => setSelectedVibeStyle(style.id)}
                        className={`p-4 rounded-xl text-left border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-slate-900 border-slate-900 text-white font-bold shadow-lg shadow-pink-100"
                            : "bg-white border-slate-200 text-slate-600 hover:border-pink-300"
                        }`}
                      >
                        <p className="text-xs font-bold uppercase">
                          {style.name}
                        </p>
                        <p className="text-[9px] mt-1 opacity-70">
                          Custom design suite
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Variable 3: Atmosphere Intensity */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Event Vibe Level
                  </label>
                  <span className="text-sm font-extrabold text-pink-600">
                    {vibeIntensity}% (Electric)
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={vibeIntensity}
                  onChange={(e) => setVibeIntensity(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-pink-600 focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Muted Jazz Lounge (20%)</span>
                  <span>Festival Tremor (100%)</span>
                </div>
              </div>

              {/* Variable 4: Culinary Program */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Culinary Exploration Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "mixology", label: "Artisan Bar" },
                    { id: "gourmet", label: "7-Course Eat" },
                    { id: "both", label: "Full Synergy" },
                  ].map((opt) => {
                    const isSelected = cateringType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setCateringType(opt.id)}
                        className={`py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${
                          isSelected
                            ? "bg-pink-600 border-pink-600 text-white shadow-md"
                            : "bg-white border-slate-100 text-slate-500 hover:border-pink-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Generated Experience Blueprint Panel: The Response Display */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between self-stretch min-h-[500px]">
              {/* Absolutes decorative */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[110px] pointer-events-none"></div>

              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-pink-400">
                      Atmospheric Blueprint Output
                    </span>
                  </div>
                  <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest">
                    Real-Time Sync
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Recommended Space Tier
                  </p>
                  <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white bg-gradient-to-r from-pink-400 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
                    {builderOutput.tier}
                  </h3>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                  <p className="text-[9px] text-pink-400 font-extrabold tracking-widest uppercase">
                    Expert Recommendation Description
                  </p>
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">
                    {builderOutput.recommendation}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 text-xs">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-[9px] text-pink-400 font-extrabold uppercase tracking-wider block">
                      Est. Setup Labor
                    </span>
                    <span className="text-lg font-bold text-slate-100">
                      {builderOutput.estimatedHours}
                    </span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-[9px] text-pink-400 font-extrabold uppercase tracking-wider block">
                      Sound Pulse Label
                    </span>
                    <span className="text-lg font-bold text-slate-100 truncate">
                      {builderOutput.intensityLabel}
                    </span>
                  </div>
                </div>

                {/* Micro indicators representing dynamic potential */}
                <div className="space-y-2.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Proposed Soundwave Speed Mapping
                  </span>
                  <div className="flex items-center gap-1.5 h-10 w-full bg-slate-950 rounded-xl p-3 border border-white/5">
                    {Array.from({ length: 18 }).map((_, idx) => {
                      // Height depends on vibe intensity
                      const heightFactor =
                        Math.sin(idx * 0.7) * (vibeIntensity / 3) +
                        vibeIntensity / 2.5;
                      return (
                        <div
                          key={idx}
                          className="flex-1 bg-gradient-to-t from-pink-500 to-rose-400 rounded-full transition-all duration-300 pointer-events-none"
                          style={{
                            height: `${Math.max(10, Math.min(100, heightFactor))}%`,
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED LEGACY & TIMELINE: Explaining potential and history */}
      <section
        id="our-legacy"
        className="relative z-10 py-24 select-none px-6 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Title Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-pink-600 block">
                Our Meticulous Evolution
              </span>
              <h2 className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight">
                From a Rebel Sketch to{" "}
                <span className="font-extrabold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                  Global Iconic Preeminence.
                </span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Celebrations began as a radical design critique against
                classical conservative events. We saw too many ballrooms
                featuring dull pastel tablecloths and boring podiums. Our ethos
                was born the moment we decided that guests deserved custom
                artistic journeys.
              </p>

              <div className="p-6 bg-white border border-pink-100 rounded-3xl space-y-4">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
                  Our Unbending Pledges:
                </h4>
                <div className="space-y-3">
                  <div className="flex gap-2.5 text-xs text-slate-600">
                    <span className="font-bold text-pink-500">✓</span> No
                    standard templates, strictly bespoke atmospheric design
                    lines.
                  </div>
                  <div className="flex gap-2.5 text-xs text-slate-600">
                    <span className="font-bold text-pink-500">✓</span> Complete
                    structural preview before financial obligations.
                  </div>
                  <div className="flex gap-2.5 text-xs text-slate-600">
                    <span className="font-bold text-pink-500">✓</span>{" "}
                    High-fidelity acoustics crafted by certified acoustic
                    artists.
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Column */}
            <div className="lg:col-span-1"></div>
            <div className="lg:col-span-6 space-y-8 relative pl-6 md:pl-8 before:absolute before:top-4 before:bottom-4 before:left-[17px] before:w-0.5 before:bg-pink-100">
              {milestones.map((milestone, idx) => {
                const isActive = activeMilestone === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveMilestone(idx)}
                    className="relative cursor-pointer group"
                  >
                    {/* Circle Indicator */}
                    <div
                      className={`absolute -left-[32px] md:-left-[36px] w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                        isActive
                          ? "border-pink-500 shadow-md scale-110 shadow-pink-100"
                          : "border-slate-200 group-hover:border-pink-300"
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full ${isActive ? "bg-pink-600" : "bg-slate-200 group-hover:bg-pink-300"}`}
                      ></div>
                    </div>

                    <div
                      className={`p-6 rounded-2xl border transition-all ${
                        isActive
                          ? "bg-white border-pink-200 shadow-md translate-x-1.5"
                          : "bg-white/40 hover:bg-white border-slate-100 hover:border-pink-100"
                      }`}
                    >
                      <span className="text-xs font-extrabold text-pink-600 uppercase tracking-wider">
                        {milestone.year}
                      </span>
                      <h4 className="text-base font-bold text-slate-800 mt-1">
                        {milestone.title}
                      </h4>
                      <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM CAROUSEL: Testimonials */}
      <section className="relative z-10 py-24 select-none px-6 bg-white overflow-hidden border-t border-pink-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-pink-500 text-xs font-bold tracking-[0.2em] uppercase">
              High Society Reviews
            </span>
            <h2 className="text-3xl md:text-5.5xl font-light text-slate-900 tracking-tight">
              Honest Praise from{" "}
              <span className="font-extrabold bg-gradient-to-r from-pink-600 via-rose-500 to-indigo-600 bg-clip-text text-transparent">
                Elite Hosts
              </span>
            </h2>
          </div>

          <div className="bg-slate-50 border border-pink-100/60 rounded-[3rem] p-8 md:p-14 relative shadow-xl overflow-hidden min-h-[320px] flex flex-col justify-between">
            {/* Background design quote mark */}
            <Quote className="absolute -top-6 -left-6 w-32 h-32 text-pink-100/40 pointer-events-none fill-pink-50" />

            <div className="relative z-10 space-y-6">
              {/* Stars */}
              <div className="flex gap-1 text-pink-500">
                {Array.from({
                  length: testimonials[activeTestimonial].rating,
                }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-pink-500 text-pink-500"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-slate-600 text-base md:text-xl font-light italic leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </p>

              {/* Client specifications */}
              <div className="pt-6 border-t border-slate-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-pink-100/50 border border-pink-200/50 text-pink-700 text-xs font-bold uppercase tracking-wider self-start sm:self-center">
                  Theme: {testimonials[activeTestimonial].vibe}
                </div>
              </div>
            </div>

            {/* Testimonial Selectors */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full bg-white hover:bg-pink-100 text-slate-700 hover:text-pink-600 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {activeTestimonial + 1} / {testimonials.length}
              </span>
              <button
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full bg-white hover:bg-pink-100 text-slate-700 hover:text-pink-600 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BESPOKE Q&A / FAQ SECTION */}
      <section
        id="faq"
        className="relative z-10 py-24 select-none px-6 bg-slate-50 border-t border-pink-50"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-pink-500 text-xs font-bold tracking-[0.2em] uppercase">
              Clarification of Prestige
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight">
              Bespoke{" "}
              <span className="font-extrabold bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Operations Q&A
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenState[idx];
              return (
                <div
                  key={idx}
                  className="bg-white border border-pink-100/55 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm md:text-base font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-50 bg-slate-50/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER & CTA */}
      <footer className="relative z-10 bg-slate-900 text-white pt-24 pb-12 overflow-hidden border-t-4 border-pink-500">
        <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Main call to design work */}
          <div className="text-center max-w-2xl mx-auto space-y-6 mb-20">
            <span className="text-pink-400 text-xs font-bold uppercase tracking-widest block">
              Immediate Consultation Blueprint
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Ready to Begin Your Masterpiece?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We operate strictly under non-disclosure security agreements when
              needed. Secure your date and launch the first conversation towards
              aesthetic perfection.
            </p>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              id="cta_footer_start"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-400 hover:from-pink-500 hover:to-rose-300 text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-pink-900/30 cursor-pointer"
            >
              Initiate Consultation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-slate-800 pt-16 text-slate-400 text-sm">
            <div className="space-y-4">
              <span className="text-lg font-bold tracking-widest text-white uppercase block">
                CELEBRATIONS
              </span>
              <p className="text-xs text-slate-400">
                Pioneering the future of physical events and premium
                atmospheres. Built with high-society precision and artistic
                rigor.
              </p>
              <div className="flex gap-3 pt-2">
                <span className="text-xs text-pink-400">Milan</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-pink-400 font-semibold">
                  Tokyo
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-pink-400">London</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-pink-400">NYC</span>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-white uppercase tracking-widest block">
                Signature Blueprints
              </span>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a
                    href="#theme-explorer"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Neon Noir Glow
                  </a>
                </li>
                <li>
                  <a
                    href="#theme-explorer"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Royal Velvet Gala
                  </a>
                </li>
                <li>
                  <a
                    href="#theme-explorer"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Pastel Garden Blossom
                  </a>
                </li>
                <li>
                  <a
                    href="#theme-explorer"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Chic Penthouse Lounge
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-white uppercase tracking-widest block">
                Bespoke Framework
              </span>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a
                    href="#why-celebrate"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Spatial Architecture
                  </a>
                </li>
                <li>
                  <a
                    href="#why-celebrate"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Molecular Tastings
                  </a>
                </li>
                <li>
                  <a
                    href="#vibe-calculator"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Vibe Architect Sandbox
                  </a>
                </li>
                <li>
                  <a
                    href="#our-legacy"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Our Detailed Milestone
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-white uppercase tracking-widest block">
                Immediate Hotlines
              </span>
              <ul className="space-y-2 md:space-y-3.5 text-xs">
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" /> Via
                  della Moscova 24, Milan
                </li>
                <li className="text-slate-300">
                  milan.office@celebrations-booking.lux
                </li>
                <li className="text-slate-300">
                  tokyo.office@celebrations-booking.lux
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/80 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-widest">
            <span>© 2026 CELEBRATIONS STUDIO. ALL PRIVACY RESERVED.</span>
            <div className="flex gap-4 mt-4 sm:translate-y-0">
              <a href="#" className="hover:text-pink-400 transition-colors">
                NDA Policy
              </a>
              <span>/</span>
              <a href="#" className="hover:text-pink-400 transition-colors">
                Biometric Security Status
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* FULL PREVIEW DIALOG/MODAL: INITIATE CONSULTATION FOR EXTREME PREMIUM FEEL */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-8 border border-pink-100 shadow-2xl z-10 overflow-hidden"
            >
              {/* Absolutes visual mesh inside modal */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full blur-2xl pointer-events-none"></div>

              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 text-slate-500 hover:text-pink-600 flex items-center justify-center border border-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-pink-500">
                    Exquisite Engagement
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    Initiate Private Consultation
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    An expert atmospheric designer is assigned to review your
                    initial telemetry parameters immediately.
                  </p>
                </div>

                {isQuoteSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-pink-50 border border-pink-200 rounded-2xl text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center mx-auto shadow-md">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800">
                        Your Masterpiece Sparked
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        An email containing initial biometric RSVP codes and
                        virtual spatial links has been transmitted successfully
                        to{" "}
                        <strong className="text-pink-600">
                          {contactEmail}
                        </strong>
                        .
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={submitQuoteRequest} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Your Distinguished Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lady Genevieve Vance"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Secure Transmission Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. genevieve@vancecurations.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Scribbled Aspirations (Optional)
                      </label>
                      <textarea
                        placeholder="Brief notes about spatial, acoustic or molecular ideas you wish to initiate..."
                        rows={3}
                        value={contactNotes}
                        onChange={(e) => setContactNotes(e.target.value)}
                        className="w-full p-4 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-slate-50 resize-none"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-full bg-slate-900 border border-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-pink-600 hover:border-pink-600 transition-colors shadow-lg cursor-pointer"
                      >
                        Transmit Telemetry
                      </button>
                    </div>
                  </form>
                )}

                <div className="text-[10px] text-slate-400 text-center leading-relaxed">
                  By transmitting, you verify access privileges to Celebrations
                  private spaces and agree to reciprocal security protocols.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
