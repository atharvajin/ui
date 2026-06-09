// ─────────────────────────────────────────────────────────────────────────────
// Services categories and featured service cards for display on ServicesPage
// ─────────────────────────────────────────────────────────────────────────────

export const legalCategories = [
  { title: 'Court Appearance', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS5LmmgC2JLQiVhFHxI-Y462SgCamrYgbm6nJpN3IIlBJY1o1WCCwW4Yl7fKgDMdpSmAFh186GmHXt5zxkmY69WDFYOL078Q_SSVBDNaY9doAeanGGHkkGGGH5NaVKqtsjhvZgiHAPjDDTwALA369iWwJj6B2Od_VIPnxvcu-t9FIZ5BivrFZeNODfdXF-TZxCCbo6_oNk-Q00NSCYzU3ONAHB66zRIAAqCJuawlN9TRaEy1Dc9HRFClSQTf_JwcZ1ZDr3KSLRtA', bgColor: 'bg-[#f2e9e4]' },
  { title: 'Contract Drafting', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQwxCSeHMoVvaCMhvsGwza7z0RAh3Qbsu0I_U92B2IipvJsCyZNysiH7pNFSDB5-_4K_2d3pYuIbO9C4-F8hLqX_a7bDRdkrKgHH60MDm-5dxvq_qXaFdl5YYtTOWBtOpvQQm1BZLabhTaWNCxpkcBJZBr7n85jzAoWp4PHyrnSngwcmEYdOZ8qO_yTfzwGEhHEmpWFhsLOTZvBAWS3fvGpOdSk5-TpzBoWP2dfwN87WHz60yWEOBA_3AxPNGhGk-7p_Ena1t6Yg', bgColor: 'bg-[#e9f2ee]' },
  { title: 'Govt Documents', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdrdE1nrGGeXP7Oo_xNGE8eZna87eJcFLC0iborsXDo6_xDp6mjJSBIadK0DF_T3s5RB9fSeolJhuOI4mrsobgF-V8sGKZAT7VetVhJEc42uIlmATIU6aL6o9307HYJ6LWSlNNSlaxNKmya7Mfo65jPfOwlaK8PDmIwWrD7imyIVcv_DpVq0hzObPGWg7HHBopdKzD2wTA0EbvmXsQFrj2OrGW2YiHUiPHfG15Mmr54gsiVVkr82TTcPNdXWvbY6vuirNA3wez7g', bgColor: 'bg-[#f2e9ec]' },
  { title: 'Criminal Lawsuits', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS5LmmgC2JLQiVhFHxI-Y462SgCamrYgbm6nJpN3IIlBJY1o1WCCwW4Yl7fKgDMdpSmAFh186GmHXt5zxkmY69WDFYOL078Q_SSVBDNaY9doAeanGGHkkGGGH5NaVKqtsjhvZgiHAPjDDTwALA369iWwJj6B2Od_VIPnxvcu-t9FIZ5BivrFZeNODfdXF-TZxCCbo6_oNk-Q00NSCYzU3ONAHB66zRIAAqCJuawlN9TRaEy1Dc9HRFClSQTf_JwcZ1ZDr3KSLRtA', bgColor: 'bg-[#e3e9f2]' },
  { title: 'Civil Lawsuits', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQwxCSeHMoVvaCMhvsGwza7z0RAh3Qbsu0I_U92B2IipvJsCyZNysiH7pNFSDB5-_4K_2d3pYuIbO9C4-F8hLqX_a7bDRdkrKgHH60MDm-5dxvq_qXaFdl5YYtTOWBtOpvQQm1BZLabhTaWNCxpkcBJZBr7n85jzAoWp4PHyrnSngwcmEYdOZ8qO_yTfzwGEhHEmpWFhsLOTZvBAWS3fvGpOdSk5-TpzBoWP2dfwN87WHz60yWEOBA_3AxPNGhGk-7p_Ena1t6Yg', bgColor: 'bg-[#f2f0e9]' },
  { title: 'Corporate Advisory', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhZf_k-gXhyhZDLPqvwsXDMrytBp_tpRHDYD_nTYF6bC9Ve_MW34y66vIAyfo9ITsazTL8pO8n-Y695kS1OvhOHqtIO5nW0Lc-rOoLlTACPouJEIj3CCei_-LoiOClyjUSr-3boHmzEI0A0RV3vlNprfK7_Tz8s0TUOj502ZyCRgUhFqQoJ6wWS9s5wNXZjmAXjX0DUy7NwicH-cbCeJS2fYxAwev2gdR5A6Nzc1gnp8Mo76ezpXU3uvCI7hHoqIoz4SbOTCofmQ', bgColor: 'bg-[#edeeec]' }
];

export const frequentServices = [
  {
    provider: 'Standard Legal Group',
    title: 'General Counsel Consultation',
    rating: '4.9',
    description: '60-minute strategic advisory session for SMEs.',
    price: 'From ₹ 250',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDREkhrux6_2Z9AOIa0cftEtaNf8OmAtvwgBvl-kqi6y6gxrOY3DMxK1SvJI_qbFybmh_kOy3QrtOv-jNRPWglbF0gdOX_xXoT_PsG-x1pXqQsuvHIN-Z7z_oNXSDP-frlBsMM6tp4F48w2VoZ12xOBpX2ZehshQX6B54d1Wl9HOvhzexEajPuTv_fChYObP-8610a7DYfUA7RfSV4nc02EZS8_2X8lk2cTAA4bWnGBD3HYe2xaRtvH1d8E2z_VQMlFbXkEoQh1cQ',
    badge: 'Vetted Expert'
  },
  {
    provider: 'Elite Drafting Partners',
    title: 'Employment Contract Review',
    rating: '5.0',
    description: 'Comprehensive legal audit of employment agreements.',
    price: 'From ₹ 450',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfIwa8gYqnb5pjFIi0gcG-gZKiF5GNFGq7biAd1js-C_JZ29Mu8Ho6cseMU28ZRNeNGJUDp55TEZyq_pcXp3keY1U1wa1aM48BaDuA8AH0s_ipyrWaNAhz1F5belNOgWYSy51DF6kzUFoG-PBb53VhaklMtWmtTvXBaNj8pRX0XGuYE4OCGkfWKfSKYiRcnoe71CkgZR4M3RFVhp8BrN26nq3exY0bXqWUgV6aJcj3TH9Uo__Q5f59iiPHnxwkQjXVHFcPBBc60Q'
  },
  {
    provider: 'Global Notary Hub',
    title: 'Digital Document Notarization',
    rating: '4.8',
    description: 'Legally binding digital seal for international documents.',
    price: 'From ₹ 85',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwoZsEe57q2ZpFUXLHy8P-fn_r8yMQzmJllWvgA9MZCPLG47FcwIrYr3QSL5Q7-NVxq585wYi9jeMJoSZJYuQmRyYDiwyVlu4xe618LaJyn2yshAo1ir15l19glSZbU3wrUl-gDpnAlsVcRPG7jKD8rvhT5YuMqUzv_qAPO_Lq9jPmFd9c_YEPTgbH6gmvR7oHo-LJI6D3NgYHdU3hslAdqvhKE7OyXpU4HftTc8SXgljYKS47DSOYl2rcj3TH9Uo__Q5f59iiPHnxwkQjXVHFcPBBc60Q'
  }
];

export const marketingCategories = [
  { title: 'Brand Strategy', bgColor: 'bg-primary-fixed', altText: 'Category visualization for Brand Strategy', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOoDdlzsZOKFjEu_tt7DpH0M8d0ImvmVKJXMcsbvQZAJCnqZPBZh8M7Z7aEo5k-TpvhT9dqZwHEZ4iofDfXBdQ-SbK_FJvqBP2fD-Weti1t9DEliSbhOKdHkZMI5oMnt4L0t0C5_83YfUTu-eemyRp7whuGvKzR5x8QWQpQKsoIBVogP6i4k0gdK_ccR0ct8OK740LoSEkkgTvxxtAwC4KWCWriPzpYMZod_GAo7jeNLKIikF_dq6Mv-IpFp_CJVbeAa8UuG63QnP4' },
  { title: 'Content Creation', bgColor: 'bg-tertiary-fixed', altText: 'Category visualization for Content Creation', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAM4Cq-obJ-1mEiSQ7uyh0KL0mMvwAdk-84oKHoDDtOkbwUIu7zJKZFFlpgsfW4xB1-EvHQxkNX0QSoI7lw8cP3rVY-2NaMSP2zcz87cn4G1ywbsy2cVpYcy0CJmNmwkmfMg-CSOXgKg911wMd8e-xe5HsdGgMhu7YyzdbdE00YKDacCPKENCUnQmML6Cl6FIRptXOlVvn2OcSsjoqf0gdKVv3SYjOmbEOKdCRwSnevvofxmHvVYngluP0IjYXsOU7_EASPZiHE1Bb' },
  { title: 'Social Media Management', bgColor: 'bg-secondary-fixed', altText: 'Category visualization for Social Media Management', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU-6c5dzcRB_61jEABFbY1TEZ3k9ljw3T1VduxDjWfcbPjwO5-wi_vMu0Xh_n6HXUTxxaPH27wZ_t3ndX1U62-0SPBslCJLOIfqGTqHXZFUm0XHvQXUCreCwxRDyYdpCyjyOb-vymw4N6_jOFMz5myzQd2kiNowSIPeVlWAfeIVsBMVf6__TzSVbFkqFDUPA2KfUpmFN3kpwY2_uFnjF4ZpYWHNe6FxWOH2M2lM3Xj-5OTfRy5FaKF5NvrUIDOKwJ6ysvzIHaOiEdt', textDim: true },
  { title: 'SEO & Performance Marketing', bgColor: 'bg-surface-container-highest', altText: 'Category visualization for SEO & Performance Marketing', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj2sk3FZ50ZBxuuxYTEp8-PWu3QZtG0pN0u3VSPr6fw_PgVd91JBUDAEBkefoU3Lri7yuI_zNkmWYtiW7UVHAA5kQVrOCmAs9QXW6eeCVNLKlOYtGtLd7uzBn5SSuQaauzlL381BPV9UwNis-TtrmC5Ec9NiBMgeWuAI0mavvxgMPPxCshNjpJWc2VkCyOInCUexj-BDzFk9Kq3DIV6BTqYVE8ctbo7hVeYZaXlso7vf0ub4bia2w8FB4Ud_ZTykzonLoW4bkSGxLZ', colSpan2: true },
  { title: 'Email Marketing', bgColor: 'bg-primary-fixed-dim', altText: 'Category visualization for Email Marketing', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo7YNaZo-JEo0YaEE0k6E0w99TseVaLYmvVPXnzIO6RcIWBd-kxWflmZzO1_ojNhfs4wGVsHmlX9q1Xf7TVsZJHsYXmcFcPMWC2VJgnG1xsxwOnBo0q3Z079cYEoIW8IileFIqob8_Wk7qDbed_Ne0WGzmNj5n2C-szhIsP_IF-47Qefj3-tdUe6oKINmsI6IsSb5vOayNjziyyi3WfkuOuO2dkSNKv2Ahqn3TskTSqJR5Y9TnrF7j8YVrT7iyEmqLbfaXGPfkN7SF' },
  { title: 'Influencer Relations', bgColor: 'bg-surface-container', altText: 'Category visualization for Influencer Relations', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEJooGkGN1fpSLBcIM-IYCd4rhIswy0Wd_PSH77E1562UUaSQrpMlb1firO9iA6V91UlMi8iBrNpu50FYuxKvWR-iQeDhbpwa5Yfb0kJiE9zE7j5poSPTH2yQKNh7OHZSY35MbIznhkozAJH33V0UjueIvyw4tPh0r9ZNptSs3pD6vF4UQCeiBEZFWCTbtGGHMYGE3op35h-QAqwEcH8jIF8Opb2qELT3W4MWV9AvFnA3doAmY0fQmIEytHPQWYZiRba5nV7GxC0oa' },
  { title: 'Event Marketing', bgColor: 'bg-tertiary-fixed-dim', altText: 'Category visualization for Event Marketing', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHRY7UvrTuGzRFuHkAz5nnAZbvb87VGU0gSzuoP9d9-3htHdGWajscTx_bdsxegI0X_l-JJvLaB9g_Z55N0D2YB6QGUJQ6fxPwTPWF6KevheRYlfhzJhDpxzLtdrk55E983KGBer1EcDHKMZ3SUvwYxzGvt_Gi3ePAicITDyaG3nx_7ke5xQZjXZgEv3hoGTdWCA0Qkr5Jhe8H4M998WpnH2u4BXvdcweikfchP7w_QIOEZiR-n3fl9mxxLYHL75ss2oc9TUFHzMDf' },
  { title: 'Public Relations', bgColor: 'bg-[#e9e8e6]', altText: 'Category visualization for Public Relations', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwGWXBhS3FyjighiI07sc5UOhVXuC-nnODAJckFJVQmxqtFkp5174ZYvLTlfIjvzTOD5g8md2Rgth4GL9A1kQGxOdfghtX7z-8SK0a8c2XlPOjI3HSMJx8dQhs4iyjho5q6wEZabh_VlqmzZTtE7lIrzHulzDOji74OrVZG70SIzcbHazoMfLEs2pzsld_G0xsPOE9vjsrKiUPyZNAL8vw9tx5bGPbiP5dlW7XKQK2zmqNEan6Iyqd6fhpTriWMRE-Lmskzy4Iehla' }
];

export const marketingFrequentServices = [
  { title: 'Comprehensive Brand Audit', provider: 'By Athena Studios', rating: '4.9', description: "A deep-dive analysis into your brand's digital presence and market positioning.", price: '₹ 1,200', altText: 'Service example for Comprehensive Brand Audit', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0hV9OOOgWON-PvvCXP9SogDoJMe60QAze8eQoAzCxqPU2R5kP4sxTC5GfY9uhygVnQdNidlLPYzTbHzrL49ymY7dJ0FGX2IQHs14UtzwreszPLl9dh45QQBnWxIgtgq2Sqv2mVQdfSCaYA5W3R7Kzlh8IJDYedwUoWClr0QbEFseMB9jT1OB-zche4uey6hCzz1qqtAlZ9C4txydOHl3OnrhdKdqDUXk1jFMHcLSo6NQEolL1egOGyFWmjBzs3VR2Z2-aMcXZU9lx', badge: 'Strategic' },
  { title: 'Viral Content Package', provider: 'By The Creator Labs', rating: '5.0', description: 'High-impact short-form video content designed for organic reach and engagement.', price: '₹ 3,500', altText: 'Service example for Viral Content Package', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhswjoOogJGX9LavaBd2Jhh--Z5omCkJSj3yUcCBccwD-XQJFKinQJGKWFe3TmUtkjQWXCYghIpA-q95ovSPRt6PJPgFiZUZi-Q1_yCVHxHxtG-E-4hJgNIjgy_nFZ4jZREZiyyLp5Q1EZUpQJ205g3-AZqQ0VvUlrDSdelZ2MR-IIECT5AYpioRXWdQpWUBmhJ-FNico2ebNJmH4FlHepAiadPvnjZjedxO5Tn0JqoS1uuQ0tVxYsV7ujqOOZLmCP2cJTdfiK9RQU', badge: 'Creative' },
  { title: 'Influencer Outreach', provider: "By L'Elite PR", rating: '4.8', description: "Strategic connection to top-tier creators tailored to your brand's specific niche.", price: '₹ 850+', altText: 'Service example for Influencer Outreach', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRT_ZFavCIBsDpUzM4b1-sJg1HCUHIJdHXdt4LE_Uy5NUXqm_BJIzXsmT5iT2v8Kd01-Nfsz14BQc356Ephy774fpfRm_Xq5GtteLel7mUeNHrJVg-_Gh4EFFENnL0g2Kr1d8A_uT9q94jc_VJBywvRUIuSJjfBMQi81V1_NpqtKWhKwZu_qfImfLYQyb9-HeRUblGlZvh04htcqR5gIGzOVPGfvVX-dPbsr2uYGSDu6OoFo1qroyx5WGFt5UOwCo5E0B7eXp4r68S', badge: 'Growth' }
];

export const weddingCategories = [
  { title: 'Wedding Planning', bgColor: 'bg-surface-container-low', altText: 'Category visualization for Wedding Planning', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgUFx1EhBk2an1VRVUbXCCWRYowmC9ADNIRax_Ay2c2M9fH7ROvVSfOXTUNumPkPn9GdYG3ePKcBAwivzA2WuiZHA-8ZMuvwm0PG2FQtyexDv7GOlrG79psS9KiZR-gGCgMru5JaitGaP6_X8KFebDcJEosKOV9aD1a2tm9T89a4FqycztiyC5ey8kGY2vKvuZiawExslqtsB7IjLqB-iSx8qhj0f149JFcN_wzAiRo4X7tpAyYFRXyVRYZDMc0SeUG3w7KDRarxju' },
  { title: 'Floral Design', bgColor: 'bg-[#f2f0e9]', altText: 'Category visualization for Floral Design', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9g56n2xygYjaDshPXnwhKWDu3GLZez5M0-tsvZ4-d7b9_pGiXCkf_aiCMIcfP555LqDwuqbxaOCU3gdfDGcdCFBcCHx7zrVsniu-CzKRnpB-YlRWrjCoSNzonLwR-2b4KVthsVWlJyWVPDt1phwrVqB2s9NX24cocJoao5u24xil77hCYFtJqXkBaSvVaUpxXC2Zqg1gC7OrRH3SW3ol2jKTSxGZZTr8EX2huC8sjPEH7JPfTY2XcRrzrcagUFxsq2OPgTz5G3DMy' },
  { title: 'Venue Curation', bgColor: 'bg-[#edeeec]', altText: 'Category visualization for Venue Curation', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJXAM36nQouHKW4O3NUJyFLxo2B6JcG6W4t2BI2P77W9Mniex1Al2c7JXuIJBVAcOtLnNj2tSXrbfOCDSXzvJ9ZS6Xk6pOGpUb0NA7-sPmL7TeIZEAaQXMTUBnkCeAfk6moF3fUAWU_0KE4p1B9pXC3OOr6NMC2DrKnxTe6RMeKiiPQsXy8-XSqColw55NQQA125dENiOiaGq52d5Yvd6eX5zrAY9kLIVAV2mqczhfab9BImYanpARJCTPX4GQ2jyf7EUpVxFysv8T' }
];

export const weddingFrequentServices = [
  { title: 'Full-Service Planning', provider: 'Aurelia & Co.', rating: '4.9', description: 'Comprehensive management from concept to toast.', price: 'From ₹ 12,500', altText: 'Service example for Full-Service Planning', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlznkOFEUVmHM5ISsFTIcjYxPwU6cIVxu1H0wJdde_GKqDhvUOSbWMlPoZTkxhIAfwHsy9Hiky9O3gcUWlSHLHCGZzEhsd-v8QiCYKByM04Ib7ySv2EHDZNcV-YUw0ctaiV_BVGGlRdOey9lnAHWvp6sSbM-Cc5Q0gFGjOVDZQUX0eLml7q_s88hgiUswQg1u2D4dKvOYz8B3PK3d3XdfueLDYTXR0wjqIUpcvITR4vn_X1IWubhtEURl9GpeVhdNwfFES9vqfxSff', badge: 'Vetted Expert' },
  { title: 'Artisanal Floral Package', provider: 'Flora Ethos', rating: '5.0', description: 'Custom seasonal arrangements and grand installations.', price: 'From ₹ 6,200', altText: 'Service example for Artisanal Floral Package', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaGhjyAKA24MpUNsyYAO2cgVMGgialWkgNrGR2rnEbFsjk5C3xBUTN5xRk2dTByVcbMOTyUwEYFgPkm27Hg897T88pQZXwsqw-c5eOluewW6QL0rOzZd9_nMAZFk4ryKKBYfXp_PQtxkyq4gkJQ002TDiFr0hyL1-I1f8zR8cpFI2QyfxsQ9Ey0L1eOeUL2msmOuRACbde3nSq_EbK4d1valde9F2CnCIC2pSx56rM6Z4yAAsIQxPumPO5bgYivlxKv6E6IU7hUlk0' },
  { title: 'Bespoke Venue Scouting', provider: 'Stone & Gable', rating: '4.8', description: 'Finding the hidden architectural gems of the world.', price: 'From ₹ 4,500', altText: 'Service example for Bespoke Venue Scouting', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1r2puEbT_Rh802DRKHzeBMOWKoZJ-rzCtVWBpgiKuajIaPqMxPNRthbVIcnNjcPQqtw-zSW6tAnsuOf7fRZIeZFU-eM5_Hatz9fmixZUcHL41RGxyDH6wa8jSOy1dparbmN2TcS3t_mSDyYP1mwVTsjW7_RWOCJ_Zez9l60RiOINAeI0vQtoAq6YJZwgY_5iYXkiXstqhvE3vT7l6rqABjED_8rQezIEKIQf1xBSA2_nsqIr4EqL9kkAqwbkxYgrnRbAVQRubsANB' }
];

export const technicalCategories = [
  { title: 'Software Development', bgColor: 'bg-surface-container-low', altText: 'Category visualization for Software Development', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPL66CD_6PeFXMKKCNthr81BC9aqVbmTT7LsBGom-e12wL80HKpxAe7gnjHV9p6wkV3BqjP-zdYsRVDnIW55IAjyPGNGUj5EsJAuRNDJCkB21jfmFYIo1rxr4RYNn06orxEGVCYpRbftenEJ_OebYtaf-xMxwzie0xuaXE79qZcQVCeH4qLYpykh08HVeFU22K91ophqBCgZdb7abefKKI37ZQqzxAPmauehvihzoIvLiwpnXQuHka_3q5AAT7tnV1NibkZ648wsSW' },
  { title: 'AI Integration', bgColor: 'bg-[#f2f0e9]', altText: 'Category visualization for AI Integration', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk7BIkQngQnQdOFAy9Guh5ES-zoIFFC6tNcYLWYpVoQOHc7XNGKBW5P2QG7qlJ1guQqaL0-5H6J8GuogLKjQSovznCKuZGJL8R2qFLCei0gqVz7g4jP3sr5gp7lS-8QgJjqHmE8eg6VmhHFLBy7eMtpJlwlbAFVPEXKqolgdOJxu1WvWhyijsHxOGd4-p2tm15ltXeautqWl28zIetu_4ZhqkopbhtX84SzzPh6C-CHAPDdxGOh9r40tbId0E_OzkvIJZd8DrkVvL2' },
  { title: 'Cloud Infra', bgColor: 'bg-[#edeeec]', altText: 'Category visualization for Cloud Infra', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxLJIWpeFIjHfu9l-ObmBy1ZzkGPihqf0UzjaQjDyLfBavJiAOoWw2F0-A6gzvjG3dziAfNX5JLDu8xbJ_mHFzr8Lr2RbfF6FrXSwKtzYaVahIVglji7OEBwzLLFD9Jw6NvX8Bi67Umuu-RYwThMBypG_H18MAjbSAuOYU2Zp5ON8m1s7qHnUkrbWGvVo3jknR8EEOVMpTlZI3VSX2jRwJAE2JU5YTKtJT94tk07apaJmqmveSH173rV-5WbSHjmHN4dXoihiFpvXP' }
];

export const technicalLeadCurators = [
  { name: 'Dr. Elena Vance', rating: '4.9 (124 reviews)', description: 'Senior AI Strategist specializing in ethical neural integration for research archives and galleries.', price: '₹ 215', altText: 'Profile photo of Dr. Elena Vance', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByV4mKNd5q595hoLV8MvdV32xkLKAVz20kE6scr4gm5YSXD2_rzw79bY0W-BIL2TGbXRCOiD8169SaexxP20xA4hoUF3uQCmPnN2j-Upe6XIKUBuKqMPp0tMZW5X_O_LqZ3zw8W0lNOosqlrc7IEkd-wGTC-o5QIV8GYz9ro35J7PPaZPSigbQF_cvCxYZwBDf5SMB3q8fvZS5EFV4ILPdQToHTSD7mC5Qir7Rn5Hs44reXOFhc8uKzsek6jN-z0eeM0D-yJ4qjb39' },
  { name: 'Marcus Thorne', rating: '5.0 (89 reviews)', description: 'Cloud Infrastructure Architect focus on high-availability systems for global archival distribution.', price: '₹ 180', altText: 'Profile photo of Marcus Thorne', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfRiJq1GLZY8YNLu8HKGPMcdRQsVmQfu25WUgGMF_L8DpsccMDysfK5tiNN8djSCDD9WlBtLVBt_MlwbYSUb59kN4LSVlOSkLhJtXiAeOEW0_Nlt31hmMSEs892wZ4QLciQPqEDdOBNIDUqoPYH6WrXLSF9f4tRD-522jwZAWwgXg6JZG_nML6F_4W1ir3FxkGyezR37sv5lSQaBq589KYubPffReADwbXsBiK4OiIUUwW_E7C1B-3O2f9ADeDzbOJj-q7ypAfXU0w' },
  { name: 'Sienna Loft', rating: '4.8 (210 reviews)', description: 'Full-stack specialist focusing on bespoke archival software and digital asset management systems.', price: '₹ 195', altText: 'Profile photo of Sienna Loft', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUDA1xppTUmgMFGhUvq8r4yEfoy14DBzqnprOeifOPwPJXVCf0cipc8Jbo378WcAXvbBNOCQdmVwca2a2vV-lDlyoQ63FyWGKz5wBX0P7REMviKNg2E50CSQyIW4hZj6-KOYz41EPRnLjlrt4YXNDfOyknBBXy7eixHeByRvvnOMZbtP3h9eK2csCL7GHRsbKY91eaxjQv2cUOuNH5wzSUTuy7DkZRF4-DIBr7nbhKfu9aATIWhwT_NmQ4q_cQor9ysz3rvxn-aNjH' }
];

export const financialCategories = [
  { title: 'Tax Consulting', bgColor: 'bg-surface-container-low', altText: 'Tax Consulting', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop' },
  { title: 'Financial Planning', bgColor: 'bg-[#f2f0e9]', altText: 'Financial Planning', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop' },
  { title: 'Audit Services', bgColor: 'bg-[#edeeec]', altText: 'Audit Services', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop' }
];

export const travelCategories = [
  { title: 'Itinerary Planning', bgColor: 'bg-surface-container-low', altText: 'Itinerary Planning', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop' },
  { title: 'Corporate Travel', bgColor: 'bg-[#f2f0e9]', altText: 'Corporate Travel', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop' }
];

export const creativesCategories = [
  { title: 'Illustration', bgColor: 'bg-surface-container-low', altText: 'Illustration', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop' },
  { title: 'Video Editing', bgColor: 'bg-[#f2f0e9]', altText: 'Video Editing', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop' }
];
