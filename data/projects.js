/**
 * data/projects.js
 * Real project data — window.PROJECTS
 * Do NOT invent projects, clients, stats or testimonials.
 */
window.PROJECTS = [
  {
    slug: 'library',
    title: '7X Library Manager',
    type: {
      ar: 'نظام إدارة مكتبات',
      en: 'Library ERP',
    },
    summary: {
      ar: 'نظام متكامل من الجيل التالي لإدارة المكتبات، مبني بـ PHP Vanilla وتصميم زجاجي (glassmorphism). يجمع بين نقطة البيع، الفوترة الاحترافية، تنبيهات المخزون، التقارير التفاعلية وإدارة المستخدمين متعددة الأدوار في منصة واحدة سريعة.',
      en: 'A next-generation integrated library management system built with PHP Vanilla and a glassmorphism design. Combines POS, professional invoicing, inventory alerts, interactive reports and multi-role user management in one fast platform.',
    },
    highlights: {
      ar: [
        'نقطة بيع مع ماسح باركود وطباعة حرارية',
        'فواتير A4 وحرارية احترافية مع تصدير PDF',
        '5 تقارير تفاعلية مع Chart.js',
        'نظام متعدد الأدوار (مدير / بائع)',
      ],
      en: [
        'POS with barcode scanner and thermal printing',
        'A4 and thermal professional invoices with PDF export',
        '5 interactive reports with Chart.js',
        'Multi-role system (Admin / Seller)',
      ],
    },
    tech: ['PHP Vanilla', 'MySQL PDO', 'JavaScript', 'Chart.js'],
    live: 'https://soulayman-7x.github.io/7X-Library-Manager-Landing-Page/',
    liveLabel: { ar: 'صفحة المشروع', en: 'Landing page' },
    repo: '', // TODO: add GitHub repo URL for 7X Library Manager
    screens: [
      {
        src: 'assets/img/projects/library/hero.webp',
        w: 1024, h: 1024,
        alt: {
          ar: 'واجهة ترويجية لنظام 7X Library Manager تُظهر مكتبة مضاءة بالأزرق والبنفسجي مع شاشات بيانات زجاجية',
          en: '7X Library Manager hero image showing a futuristic library illuminated in blue and purple with glassmorphism data panels',
        },
      },
      {
        src: 'assets/img/projects/library/pos.webp',
        w: 1400, h: 788,
        alt: {
          ar: 'شاشة نقطة البيع في نظام المكتبة تُظهر قائمة المنتجات والسلة وخيارات الدفع باللغة العربية',
          en: 'Library Manager POS screen showing product grid, shopping cart, and payment options in Arabic RTL layout',
        },
      },
      {
        src: 'assets/img/projects/library/invoice.webp',
        w: 1024, h: 1024,
        alt: {
          ar: 'نظام الفواتير المحترف يعرض قائمة الفواتير مع فاتورة A4 وإيصال حراري 80mm بأزرار الطباعة وتصدير PDF',
          en: 'Professional invoice system showing invoice list alongside A4 invoice and 80mm thermal receipt with print and PDF export buttons',
        },
      },
      {
        src: 'assets/img/projects/library/inventory.webp',
        w: 1400, h: 788,
        alt: {
          ar: 'صفحة قائمة المنتجات في المخزن تُظهر الأصناف مع الأسعار والكميات والتصنيفات بواجهة عربية',
          en: 'Inventory product list showing items with prices, quantities, categories and Arabic RTL interface',
        },
      },
      {
        src: 'assets/img/projects/library/reports.webp',
        w: 1400, h: 788,
        alt: {
          ar: 'لوحة التقارير تعرض إجمالي المبيعات والمصاريف والفواتير مع مخطط دائري لتوزيع الأصناف ورسم بياني للمبيعات اليومية',
          en: 'Reports dashboard showing total sales, expenses, invoices count with donut chart for category distribution and daily sales line chart',
        },
      },
    ],
    featured: true,
  },

  {
    slug: 'pharma',
    title: '7X Pharma Nexus',
    type: {
      ar: 'نظام إدارة صيدليات',
      en: 'Healthcare',
    },
    summary: {
      ar: 'منصة شاملة لإدارة الصيدليات مصممة للتوسع. تحكم فوري في المخزون، سير عمل آمن للوصفات الطبية، ولوحات تحليلات POS ديناميكية.',
      en: 'A comprehensive pharmaceutical management platform designed for scale. Real-time inventory control, secure prescription workflows and dynamic POS analytics dashboards.',
    },
    highlights: {
      ar: [
        'نظام نقطة بيع (POS) كامل',
        'تتبع انتهاء صلاحية الأدوية في المخزون',
        'إدارة رصيد العملاء وحساباتهم',
      ],
      en: [
        'Full point of sale (POS) system',
        'Inventory expiry date tracking',
        'Client credit management',
      ],
    },
    tech: ['PHP OOP', 'MySQL', 'JavaScript', 'CSS3'],
    live: '',
    liveLabel: { ar: '', en: '' },
    repo: 'https://github.com/soulayman-7x/7X_Pharma_Core',
    screens: [
      {
        src: 'assets/img/projects/pharma/main.webp',
        w: 1400, h: 709,
        alt: {
          ar: 'واجهة نقطة البيع في نظام 7X Pharma Nexus تُظهر قائمة الأدوية مع البحث والتصنيف وسلة البيع الحالية وخيارات الدفع',
          en: '7X Pharma Nexus POS interface showing medicine grid with search, category tabs, current sale cart and payment options',
        },
      },
      {
        src: 'assets/img/projects/pharma/inventory.webp',
        w: 1400, h: 705,
        alt: {
          ar: 'صفحة مخزون الأدوية تُظهر جدول الأدوية مع الباركود وتاريخ انتهاء الصلاحية والكميات وحالة المخزون',
          en: 'Medicine inventory page showing table with barcode, expiry dates, quantities and stock status (In Stock, Low Stock, Critical, Expired)',
        },
      },
    ],
    featured: false,
  },

  {
    slug: 'hub',
    title: '7X Hub',
    type: {
      ar: 'منصة مدونات',
      en: 'Blog platform',
    },
    summary: {
      ar: 'نظام إدارة محتوى عالي الأداء بمعمارية MVC مخصصة. مصادقة آمنة، عمليات CRUD على النصوص الغنية، ولوحة نشاط قاعدة البيانات.',
      en: 'A high-performance content management system with a custom MVC architecture. Secure authentication, rich-text CRUD operations and a database activity dashboard.',
    },
    highlights: {
      ar: [
        'معمارية MVC مخصصة من الصفر',
        'لوحة تحليلات للمدير',
        'تسجيل نشاط قاعدة البيانات',
      ],
      en: [
        'Custom MVC architecture from scratch',
        'Admin analytics dashboard',
        'Database activity logging',
      ],
    },
    tech: ['PHP OOP', 'MySQL', 'CSS3'],
    live: '',
    liveLabel: { ar: '', en: '' },
    repo: 'https://github.com/soulayman-7x/7X_Hub_Blog',
    screens: [
      {
        src: 'assets/img/projects/hub/main.webp',
        w: 1400, h: 788,
        alt: {
          ar: 'الصفحة الرئيسية لمنصة 7X Hub تُظهر شعار المنصة وعنوان رئيسي باللغة الإنجليزية مع إحصائيات المقالات والفئات',
          en: '7X Hub homepage showing platform logo, bold English headline and site statistics for articles, network logs, categories and verified agents',
        },
      },
      {
        src: 'assets/img/projects/hub/dashboard.webp',
        w: 708, h: 436,
        alt: {
          ar: 'لوحة سجلات قاعدة البيانات في 7X Hub تُظهر جدول البروتوكولات مع التصنيفات والطوابع الزمنية',
          en: '7X Hub admin database logs dashboard showing protocol entries table with sectors, timestamps and action buttons',
        },
      },
    ],
    featured: false,
  },
];
