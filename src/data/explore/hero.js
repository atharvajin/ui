// ─────────────────────────────────────────────────────────────────────────────
// Explore page — hero tags, curated categories, how-it-works, auctions, etc.
// ─────────────────────────────────────────────────────────────────────────────

export const exploreHeroTags = [
  { id: 1, icon: "timer", text: "The Vault (Ending Soon)", colorClass: "text-primary", hoverClass: "hover:bg-[#cfe8e0]", shapeClass: "rounded-tr-none" },
  { id: 2, icon: "chair", text: "Mid-Century Modern", colorClass: "text-secondary", hoverClass: "hover:bg-[#ffdad3]", shapeClass: "rounded-bl-none" },
  { id: 3, icon: "data_object", text: "Generative Art", colorClass: "text-tertiary", hoverClass: "hover:bg-[#e9fff2]", shapeClass: "rounded-tl-none" },
  { id: 4, icon: "confirmation_number", text: "Paris Auction Week", colorClass: "text-[#443e51]", hoverClass: "hover:bg-[#f2f0ff]", shapeClass: "rounded-br-none" },
];

export const curatedCategories = [
  {
    id: 1,
    title: "Fine Art",
    titleColor: "text-primary-dim",
    bgClass: "bg-[#cfe8e0]",
    customClass: "hover:bg-primary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9UMLBGvFrjWrX5xHuyk8jgEu8C-FHTfr25mBC1mtht1s8uT6Og7AEVfO2nEZ1Wyjys6XcGfbYGSuNaqgBuXPZkz5Jqgz1YcVDQX_9Meb6jmiLAINNq4zPZpN76_mZVqTeEc8U6jf8QYCtOWyfs98P63vwdmnX_PXU6PIuXr-1RwXY5LbWFqrxMrnFUII1vaKDb_nde6c-N5uYpKRfv8sGaQadUJK96-2zWvfcgmqfdBNrYT-Zg0hIL5Oklg3RBWSQtb6qOujzfg",
    alt: "Ceramic vase"
  },
  {
    id: 2,
    title: "Automobilia",
    titleColor: "text-[#72463d]",
    bgClass: "bg-[#ffdad3]",
    customClass: "hover:bg-secondary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbUJcpqLgHwrpilRs_3_igxldTOqwahxx7Q4o_qKXwuOySFVjrsOkMp_oCxu2qRUTnyfLRzM7EAdbz1VX_LxVKcTdiwksTBpa-LDTPDpAlteAPwx5cnNFItx9-RBu0t-nN1ItlfZimphs0wttnVVC_eT5WEjvlqGelJ7s7SDzG6KkYlHCY4u1ZbFPJd4uFgVkvIUw6yuZO5d9m9ifotngn88Xd2fWN996RSXtq7on1IU6bzZjJuv4aPgzul8zV0uLm-wwS73O7Lw",
    alt: "Vintage car"
  },
  {
    id: 3,
    title: "Digital Assets",
    titleColor: "text-[#3e5148]",
    bgClass: "bg-[#e9fff2]",
    customClass: "hover:bg-tertiary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCscvTzKQs_5_WmlcEgvJytiAsyq9FXsRH_M2EtcUejPyp6_BcTBYLhsCP_vF8WYxb2zDB_8g9jmlED5spyjaOVjIVTVleJ86n_8Kqz3sGoVOG_Mmf_4zbROKGY-sYejuTDuE9ZENSDQM8v4Ig8Dm_XKF7FiKWppgXPxq9RxopM8TdT9dE5ypiGoVTrmkSb6pYil8vMmHSX5jzroL9p38D_I2i2uqi3Ol4lm2PzWsrR__jQCFB3wkmnFwzYN9THuWTsN87bYo0AYA",
    alt: "Digital sculpture"
  },
  {
    id: 4,
    title: "Services",
    titleColor: "text-[#443e51]",
    bgClass: "bg-[#f2f0ff]",
    customClass: "hover:bg-surface-container-high",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwoZsEe57q2ZpFUXLHy8P-fn_r8yMQzmJllWvgA9MZCPLG47FcwIrYr3QSL5Q7-NVxq585wYi9jeMJoSZJYuQmRyYDiwyVlu4xe618LaJyn2yshAo1ir15l19glSZbU3wrUl-gDpnAlsVcRPG7jKD8rvhT5YuMqUzv_qAPO_Lq9jPmFd9c_YEPTgbH6gmvR7oHo-LJI6D3NgYHdU3hslAdqvhKE7OyXpU4HftTc8SXgljYKS47DSOYl2rcqjll1Kqjz-q2MR9qew",
    alt: "Craft tool"
  },
  {
    id: 5,
    title: "Govt Documents",
    titleColor: "text-primary-dim",
    bgClass: "bg-[#e8fef2]",
    customClass: "hover:bg-primary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdrdE1nrGGeXP7Oo_xNGE8eZna87eJcFLC0iborsXDo6_xDp6mjJSBIadK0DF_T3s5RB9fSeolJhuOI4mrsobgF-V8sGKZAT7VetVhJEc42uIlmATIU6aL6o9307HYJ6LWSlNNSlaxNKmya7Mfo65jPfOwlaK8PDmIwWrD7imyIVcv_DpVq0hzObPGWg7HHBopdKzD2wTA0EbvmXsQFrj2OrGW2YiHUiPHfG15Mmr54gsiVVkr82TTcPNdXWvbY6vuirNA3wez7g",
    alt: "Government Documents"
  },
  {
    id: 6,
    title: "Refurbished",
    titleColor: "text-[#72463d]",
    bgClass: "bg-[#ffc8bc]",
    customClass: "hover:bg-secondary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfIwa8gYqnb5pjFIi0gcG-gZKiF5GNFGq7biAd1js-C_JZ29Mu8Ho6cseMU28ZRNeNGJUDp55TEZyq_pcXp3keY1U1wa1aM48BaDuA8AH0s_ipyrWaNAhz1F5belNOgWYSy51DF6kzUFoG-PBb53VhaklMtWmtTvXBaNj8pRX0XGuYE4OCGkfWKfSKYiRcnoe71CkgZR4M3RFVhp8BrN26nq3exY0bXqWUgV6aJcj3TH9Uo__Q5f59iiPHnxwkQjXVHFcPBBc60Q",
    alt: "Refurbished Goods"
  },
  {
    id: 7,
    title: "Contracts",
    titleColor: "text-[#3e5148]",
    bgClass: "bg-[#daf0e4]",
    customClass: "hover:bg-tertiary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQwxCSeHMoVvaCMhvsGwza7z0RAh3Qbsu0I_U92B2IipvJsCyZNysiH7pNFSDB5-_4K_2d3pYuIbO9C4-F8hLqX_a7bDRdkrKgHH60MDm-5dxvq_qXaFdl5YYtTOWBtOpvQQm1BZLabhTaWNCxpkcBJZBr7n85jzAoWp4PHyrnSngwcmEYdOZ8qO_yTfzwGEhHEmpWFhsLOTZvBAWS3fvGpOdSk5-TpzBoWP2dfwN87WHz60yWEOBA_3AxPNGhGk-7p_Ena1t6Yg",
    alt: "Contract Review"
  }
];

export const howItWorksFeatures = [
  {
    id: 1,
    icon: "verified_user",
    title: "Secure Escrow",
    description: "Financial protection for both curator and collector, ensuring every exchange is honored."
  },
  {
    id: 2,
    icon: "bolt",
    title: "Digital Instant Delivery",
    description: "Immediate access to your digital acquisitions through our secure, high-speed vault."
  },
  {
    id: 3,
    icon: "public",
    title: "Global Shipping",
    description: "Bespoke white-glove delivery services connecting rare objects with global destinations."
  }
];

export const auctions = [
  {
    id: 1,
    title: "Vacheron Constantin Patrimony",
    currentBid: "₹ 42,500",
    endTime: "Ends in 2h 45m",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfIwa8gYqnb5pjFIi0gcG-gZKiF5GNFGq7biAd1js-C_JZ29Mu8Ho6cseMU28ZRNeNGJUDp55TEZyq_pcXp3keY1U1wa1aM48BaDuA8AH0s_ipyrWaNAhz1F5belNOgWYSy51DF6kzUFoG-PBb53VhaklMtWmtTvXBaNj8pRX0XGuYE4OCGkfWKfSKYiRcnoe71CkgZR4M3RFVhp8BrN26nq3exY0bXqWUgV6aJcj3TH9Uo__Q5f59iiPHnxwkQjXVHFcPBBc60Q",
    alt: "Rare Watch"
  },
  {
    id: 2,
    title: "Signed First Edition: 'Ulysses'",
    currentBid: "₹ 12,000",
    endTime: "Ends in 5h 12m",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDREkhrux6_2Z9AOIa0cftEtaNf8OmAtvwgBvl-kqi6y6gxrOY3DMxK1SvJI_qbFybmh_kOy3QrtOv-jNRPWglbF0gdOX_xXoT_PsG-x1pXqQsuvHIN-Z7z_oNXSDP-frlBsMM6tp4F48w2VoZ12xOBpX2ZehshQX6B54d1Wl9HOvhzexEajPuTv_fChYObP-8610a7DYfUA7RfSV4nc02EZS8_2X8lk2cTAA4bWnGBD3HYe2xaRtvH1d8E2z_VQMlFbXkEoQh1cQ",
    alt: "First Edition Book"
  },
  {
    id: 3,
    title: "Louis Vuitton Trunk c.1920",
    currentBid: "₹ 8,900",
    endTime: "Ends in 8h 04m",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGFPuqIGmmOLh_kYubXafGoz2uIWBfFhtuI2tjrDlvot3KFUrEaDHXaYbKVZvvSnJYgLulaWjLM6heohg60Et6-7HwoyQEQ0sZQ0yPnDLYHGqYSXHaPYCh8CdHasPRhPgeQIdKlnaQ_PmqvhRukGcKTC45bjQ0gnzu1qRYgN0iE5-q-yM-YtW2pfjdWteK_986x_KMMVe9iMCgjMMjWMrr3Mr3T2k7Rr_0uP-9tNcRidWOkUcXMdH7DAzcXL53UDKZv8CbmYUF6g",
    alt: "Vintage Luggage"
  }
];

export const trendingDigitalAssets = [
  {
    id: 1,
    title: "Ether Genesis #042",
    floorPrice: "4.2 ETH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQCHmbClgLDy87puNSvrrR7rOkyBkew9k-plOOzoYSG_qBQATqurlp9x8zYPXI4ks-OuUtqbLG0OeAY1pbKn4WQpq39mcgGmMtBt7NDJAtqpz488d4KK4k1S0hrP8wNfR5veqZJCccDI7Nz4uQUmmT9lbhpEwZsiTuE21Vvh8AOoZ7ipoEaYF7I9l92ZrnZGMLE9w3HUgwtYxqkPvZiObGqe0tJNcGA2kJECb-mlzwbH9t3AsF9ruDzvMszunM549ZKVp0Kjreqg",
    alt: "NFT Art"
  },
  {
    id: 2,
    title: "Virtual Estate: Neo-Tokyo",
    floorPrice: "1.8 ETH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1aQSrfbMk9QEyViwOLlKQMtiUTQCXVRrFkSy4qaDnkNOmLj-TPbro1mKZ6HqBURemZngzrPAgLGnsGR95GirFTars2SN9ObaXbWOorYHWhQ9jZmgIwqZKXwUY0VoX8M2FNPgkppFPGMRy6TV8HrcAJhx5ZajxDH2k88o_wpPDjrOTqUfxKWK-uxJNudJADS-7-vyZUTM_ZRPRFlatVslwJPBJYbw0YSmNMj6Cv-HyMc4aDUG9QKCkNzh3E4ljLN0YM5-ehde-zw",
    alt: "Cyberpunk City"
  }
];

export const localServices = [
  {
    id: 1,
    title: "Art Restoration",
    rating: "London • 4.9 ★",
    description: "Specializing in 19th-century oil painting conservation and structural repair.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBuF2XGclbp0zyYXNyVeGVfaDG4cz0iKceOWoDXu8NJx6-wNnannxYI0f4jTvlrhO-A-dX58abPh76r-QEGi8COcqd4ocDA0X7bpxgshBNNp3CmT7Q5OcDUGRpFvESz26Ueg5NebyjztaGS_c6k1Q09UMgkZL8XiLfYfiwgM5LchW0EcrmmlvHqZoeedT7jU6VQmWP5SYqAEK4KJAMsJuCgaIdIaWDXZV7nKzA1ZROLnN7A_zWfKBwrpA11wjKytqcr8E57F_3iw",
    alt: "Restoration Expert"
  },
  {
    id: 2,
    title: "Rare Item Appraisal",
    rating: "New York • 5.0 ★",
    description: "Certified appraisals for estate planning, insurance, and curated auctions.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlAdUR51CeT4cASdiAdbHnq830miMbn_ahkvaoxsx0aRLvXufXFo1yOQCAeIrNJx-arSByCunMPoqr_sfE1OyADokmMsdUXWWmGsDefxJWV-jybO-rk2ztTryGRv-fpnK_Gq4_X6-bb_P3KlWWg9tCCAkIQVYhms2dLcVU2xqkfe7-LYgblpK5jmDRt45IcdkWroNl1BuBI1K3gjhXc9QCisdXVrF1zY7ionhg3kjjUIWuZ7FxRxYgP33zEaMCwTj0VdXmNjtUYQ",
    alt: "Appraiser"
  },
  {
    id: 3,
    title: "Bespoke Logistics",
    rating: "Paris • 4.8 ★",
    description: "Global fine art transportation with real-time temperature and shock monitoring.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAicUobLxnwmUfbZE4DBiEP64O52pcO1KUmkB7xNSv2Ya8N-tV59JSM6P08PE20D8iqbzJZXSyacjG_YN3lInqUOrM4rOJlzDd11yTO7PZW5S3mxXvw2xVRoTtsu9pGTlagMjQbauYP14ZTHnXlNNS4Oqtygmpo02gez7JBFvISnJ-uQQwvEK6gjCko4Z4Sr5EYTV2ArSJFekSlMtsY-YhzZ8Mo_sZpsrkUAolOwEVIRz64pHZP41YiL6WhPQzY4eh1j0qlifagGQ",
    alt: "Fine Art Courier"
  }
];
