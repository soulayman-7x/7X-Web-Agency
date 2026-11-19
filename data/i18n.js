/**
 * data/i18n.js
 * All translatable UI strings — window.I18N
 * Arabic is the default; English is applied by assets/js/i18n.js
 */
window.I18N = {
  meta: {
    title: {
      ar: '7X Web Agency | حلول رقمية متكاملة',
      en: '7X Web Agency | Digital Solutions',
    },
    description: {
      ar: 'مطور ويب فول ستاك من المغرب. نبني مواقع احترافية، برامج إدارة المحلات، شبكات واي فاي، وتحسين SEO.',
      en: 'Full-Stack Web Developer from Morocco. We build professional websites, store management software, Wi-Fi networks and SEO growth.',
    },
  },

  nav: {
    services: { ar: 'الخدمات', en: 'Services' },
    projects: { ar: 'أعمالي', en: 'Projects' },
    contact:  { ar: 'تواصل', en: 'Contact' },
    langToggle: { ar: 'EN', en: 'عربي' },
    whatsapp: { ar: 'واتساب', en: 'WhatsApp' },
    menuOpen:  { ar: 'فتح القائمة', en: 'Open menu' },
    menuClose: { ar: 'إغلاق القائمة', en: 'Close menu' },
  },

  hero: {
    eyebrow: { ar: 'سليمان 7X · مطور ويب فول ستاك', en: 'SOULAYMAN 7X · Full-Stack Web Developer' },
    headline: { ar: 'نبني لك حضوراً رقمياً يبيع', en: 'We build a digital presence that sells.' },
    sub: {
      ar: 'مواقع، برامج إدارة المحلات، شبكات وتحسين SEO، من الفكرة إلى المبيعات.',
      en: 'Websites, store management software, networking and SEO, from idea to sales.',
    },
    cta1: { ar: 'تواصل عبر واتساب', en: 'Chat on WhatsApp' },
    cta2: { ar: 'شاهد أعمالي', en: 'View my work' },
    logoAlt: { ar: 'شعار 7X Web Agency', en: '7X Web Agency logo' },
  },

  services: {
    sectionTitle: { ar: 'الخدمات', en: 'Services' },
    sectionSub: {
      ar: 'حلول رقمية متكاملة لنمو أعمالك',
      en: 'Complete digital solutions to grow your business',
    },
    items: [
      {
        num: '01',
        title: { ar: 'تطوير المواقع', en: 'Web Development' },
        desc: {
          ar: 'مواقع سريعة وآمنة تعمل على جميع الأجهزة، مصممة لتحقق أهداف عملك.',
          en: 'Fast, secure websites that work on every device, designed to meet your business goals.',
        },
        icon: 'code',
      },
      {
        num: '02',
        title: { ar: 'حلول رقمية', en: 'Digital Solutions' },
        desc: {
          ar: 'تحويل أعمالك إلى الفضاء الرقمي بأنظمة مخصصة تناسب احتياجاتك تماماً.',
          en: 'Transforming your business into the digital space with custom systems that fit your exact needs.',
        },
        icon: 'layers',
      },
      {
        num: '03',
        title: { ar: 'برامج إدارة المحلات', en: 'Store Management Software' },
        desc: {
          ar: 'أنظمة POS متكاملة للمخزون والفواتير والتقارير، مع دعم كامل للغة العربية.',
          en: 'Full POS systems for inventory, invoicing and reporting with complete Arabic-language support.',
        },
        icon: 'store',
      },
      {
        num: '04',
        title: { ar: 'بناء الشبكات وضبط الواي فاي', en: 'Networking & Wi-Fi Setup' },
        desc: {
          ar: 'تصميم وتركيب شبكات موثوقة وتغطية واي فاي شاملة للمكاتب والمحلات.',
          en: 'Designing and installing reliable networks and full Wi-Fi coverage for offices and shops.',
        },
        icon: 'wifi',
      },
      {
        num: '05',
        title: { ar: 'تحسين SEO وزيادة المبيعات', en: 'SEO & Sales Growth' },
        desc: {
          ar: 'استراتيجيات SEO مثبتة ترفع ترتيبك في جوجل وتحوّل الزوار إلى عملاء.',
          en: 'Proven SEO strategies that raise your Google ranking and turn visitors into customers.',
        },
        icon: 'chart',
      },
      {
        num: '06',
        title: { ar: 'إضافة المحل إلى خرائط جوجل', en: 'Google Maps Listing' },
        desc: {
          ar: 'تسجيل وتحسين نشاطك التجاري على خرائط جوجل لجذب العملاء المحليين.',
          en: 'Registering and optimising your business on Google Maps to attract local customers.',
        },
        icon: 'map',
      },
    ],
    techTitle: { ar: 'التقنيات التي أعمل بها', en: 'Technologies I work with' },
  },

  projects: {
    sectionTitle: { ar: 'أعمالي', en: 'Projects' },
    sectionSub: {
      ar: 'مشاريع حقيقية، نتائج حقيقية',
      en: 'Real projects, real results',
    },
    viewProject:   { ar: 'عرض المشروع', en: 'View project' },
    sourceCode:    { ar: 'الكود المصدري', en: 'Source code' },
    inquireWa:     { ar: 'الاستفسار عبر واتساب', en: 'Inquire via WhatsApp' },
    closDialog:    { ar: 'إغلاق', en: 'Close' },
    techLabel:     { ar: 'التقنيات', en: 'Tech stack' },
    highlightsLbl: { ar: 'المميزات', en: 'Highlights' },
    prevSlide:     { ar: 'الشريحة السابقة', en: 'Previous slide' },
    nextSlide:     { ar: 'الشريحة التالية', en: 'Next slide' },
    prevProject:   { ar: 'المشروع السابق', en: 'Previous project' },
    nextProject:   { ar: 'المشروع التالي', en: 'Next project' },
    slideOf:       { ar: 'من', en: 'of' },
    /* Per-project WhatsApp inquiry message template.
       {title} will be replaced with the project title. */
    inquiryMsgTpl: {
      ar: 'السلام عليكم 👋 أنا مهتم بمشروع *{title}* وأريد معلومات أكثر عنه.',
      en: "Hello 👋 I'm interested in the project *{title}* and would like more information.",
    },
  },

  contact: {
    sectionTitle: { ar: 'تواصل معي', en: 'Get in touch' },
    sectionSub: {
      ar: 'جاهز لبدء مشروعك؟ تواصل معي اليوم.',
      en: "Ready to start your project? Let's talk today.",
    },
    whatsappCta: { ar: 'تواصل عبر واتساب', en: 'Chat on WhatsApp' },
    emailLabel:  { ar: 'البريد الإلكتروني', en: 'Email' },
    locationLabel: { ar: 'الموقع', en: 'Location' },
    location: { ar: 'المغرب', en: 'Morocco' },
    githubAria:   { ar: 'ملف سليمان على GitHub', en: "Soulayman's GitHub profile" },
    linkedinAria: { ar: 'ملف سليمان على LinkedIn', en: "Soulayman's LinkedIn profile" },
    instagramAria:{ ar: 'حساب سليمان على Instagram', en: "Soulayman's Instagram account" },
  },

  footer: {
    tagline: { ar: '7X Web Agency | حلول رقمية متكاملة', en: '7X Web Agency | Integrated Digital Solutions' },
    rights:  { ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' },
  },

  skipLink: { ar: 'تخطي إلى المحتوى الرئيسي', en: 'Skip to main content' },

  floatWa: { ar: 'تواصل عبر واتساب', en: 'Chat on WhatsApp' },
};
