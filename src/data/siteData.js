// ─── BUA Group — Site Content Data (verified from buagroup.com) ──────────────

export const navLinks = [
  { label: "Home",        href: "/"               },
  { label: "About",       href: "/about"          },
  { label: "Businesses",  href: "/businesses", hasMega: true },
  { label: "Newsroom",    href: "/media"          },
  { label: "Careers",     href: "/careers"        },
  { label: "Contact", href: "/contact" },
];

export const megaMenu = {
  foods: {
    label: "Foods",
    icon: "🌾",
    links: [
      { name: "BUA Foods PLC",   href: "https://www.buafoodsplc.com/", desc: "Leading Food & FMCG business" },
      { name: "Flour",           href: "https://www.buafoodsplc.com/flour/", desc: "Premium wheat flour milling" },
      { name: "Sugar",           href: "https://www.buafoodsplc.com/sugar/", desc: "Nigeria's largest sugar refinery" },
      { name: "Edible Oils",     href: "https://www.buafoodsplc.com/edible-oils/", desc: "Refined cooking oils" },
      { name: "Rice",            href: "https://www.buafoodsplc.com/rice/", desc: "Parboiled & long grain rice" },
    ],
  },
  infrastructure: {
    label: "Infrastructure",
    icon: "🏗",
    links: [
      { name: "BUA Cement PLC",  href: "https://www.buacement.com/", desc: "Sub-Saharan Africa's premier cement manufacturer" },
      { name: "BUA Estates",     href: "https://www.buaestate.com/", desc: "Premium real estate development" },
      { name: "Ports & Terminals", href: "https://buagroup.com/infrastructure/#ports", desc: "Deepwater port infrastructure" },
      { name: "Mines & Steel",   href: "#", desc: "Mining and steel manufacturing" },
    ],
  },
};

export const quickLinks = [
  { label: "Who We Are",       href: "/about"          },
  { label: "Our History",      href: "/about#history"  },
  { label: "Our Leadership",   href: "/about#management" },
  { label: "Our Vision & Values", href: "/about#values" },
  { label: "Businesses",       href: "/businesses"     },
  { label: "Newsroom",         href: "/media"          },
  { label: "Careers",          href: "/careers"        },
];

export const companyLinks = [
  { label: "Foods",             href: "https://www.buafoodsplc.com/" },
  { label: "Cement",            href: "https://www.buacement.com/"   },
  { label: "Real Estate",       href: "https://www.buaestate.com/"   },
  { label: "Infrastructure",    href: "/businesses"                  },
  { label: "Ports & Terminals", href: "/businesses"                  },
];

export const newsMediaLinks = [
  { label: "Press Releases",  href: "/media" },
  { label: "Videos",          href: "/media" },
  { label: "Pictures",        href: "/media" },
  { label: "Events",          href: "/media" },
  { label: "Awards",          href: "/media" },
];

export const footerLegal = [
  { label: "Privacy Policy",  href: "/privacy" },
  { label: "Terms of Use",    href: "/terms"   },
];

export const contactInfo = {
  email: "info@buagroup.com",
  phone: "234-1-4610669-70",
  locations: {
    abuja: "https://maps.app.goo.gl/ZCZHKgEBv7CpDf247",
    lagos: "https://maps.app.goo.gl/o983NRARfJiQznA2A",
  },
};

export const socialLinks = {
  facebook:  "https://web.facebook.com/BUAgroupNG",
  x:         "https://x.com/BUAgroup",
  linkedin:  "https://www.linkedin.com/company/bua-group-ng",
  youtube:   "https://www.youtube.com/channel/UC3XGanCVZwJBRpwhP0opELQ",
  tiktok:    "https://www.tiktok.com/@buagroup_ng",
};

export const stats = [
  { val: "11M+",    label: "MTPA Cement Capacity",    sub: "Across all production clusters"      },
  { val: "1.5M+",   label: "MTPA Sugar Capacity",     sub: "Largest refinery in Nigeria"         },
  { val: "35,000+", label: "Employees",               sub: "Direct & indirect workforce"         },
  { val: "1988",    label: "Founded",                 sub: "Lagos, Nigeria"                      },
];

export const businesses = [
  {
    sector: "Food & FMCG",
    entity: "BUA Foods PLC",
    tagline: "A leading Food and Fast-Moving Consumer Goods (FMCG) business listed on the Nigerian Exchange Group.",
    icon: "🌾",
    href: "https://www.buafoodsplc.com/",
    imageSrc: "https://buagroup.com/wp-content/uploads/2025/05/DJI_0964_Easy-Resize.com_.jpg",
  },
  {
    sector: "Cement & Infrastructure",
    entity: "BUA Cement PLC",
    tagline: "One of the largest manufacturers of quality cement across sub-Saharan Africa.",
    icon: "🏭",
    href: "https://www.buacement.com/",
    imageSrc: "https://buagroup.com/wp-content/uploads/2025/05/731A9162_Easy-Resize.com_.jpg",
  },
  {
    sector: "Real Estate",
    entity: "BUA Estates",
    tagline: "Developing premium urban residential and commercial real estate across Nigeria's growth corridors.",
    icon: "🏙",
    href: "https://www.buaestate.com/",
    imageSrc: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=75",
  },
];
