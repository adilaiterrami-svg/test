/* ============================================================
   TRANSLATIONS — FR (défaut) · EN · AR
   ============================================================ */
const TRANSLATIONS = {

  /* ── NAVBAR ── */
  'nav.about':          { fr: 'À propos',      en: 'About',          ar: 'من أنا' },
  'nav.consultation':   { fr: 'Consultation',  en: 'Consultation',   ar: 'الاستشارة' },
  'nav.experience':     { fr: 'Expérience',    en: 'Experience',     ar: 'الخبرة' },
  'nav.formation':      { fr: 'Formation',     en: 'Education',      ar: 'التكوين' },
  'nav.videos':         { fr: 'Vidéos',        en: 'Videos',         ar: 'مقاطع الفيديو' },
  'nav.publications':   { fr: 'Publications',  en: 'Publications',   ar: 'المنشورات' },
  'nav.galerie':        { fr: 'Galerie',       en: 'Gallery',        ar: 'المعرض' },
  'nav.contact':        { fr: 'Contact',       en: 'Contact',        ar: 'التواصل' },

  /* ── HERO ── */
  'hero.label':      { fr: 'Professeur · Gastro-Entérologue',       en: 'Professor · Gastroenterologist',            ar: 'أستاذ · أخصائي أمراض الجهاز الهضمي' },
  'hero.tagline':    { fr: 'Endoscopie Interventionnelle · Hépatologie · Oncologie Digestive', en: 'Interventional Endoscopy · Hepatology · Digestive Oncology', ar: 'التنظير التداخلي · أمراض الكبد · الأورام الهضمية' },
  'hero.badge.chu':  { fr: 'CHU Mohammed VI',     en: 'CHU Mohammed VI',      ar: 'المستشفى الجامعي محمد السادس' },
  'hero.badge.priv': { fr: 'Cliniques Privées',   en: 'Private Clinics',      ar: 'العيادات الخاصة' },
  'hero.badge.fac':  { fr: 'Faculté de Médecine', en: 'Faculty of Medicine',  ar: 'كلية الطب' },
  'hero.badge.city': { fr: 'Marrakech',            en: 'Marrakech',            ar: 'مراكش' },
  'hero.cta':        { fr: 'Prendre contact',      en: 'Get in touch',         ar: 'تواصل معنا' },

  /* ── À PROPOS ── */
  'about.label':    { fr: 'Qui suis-je',    en: 'Who I am',   ar: 'من أنا' },
  'about.title':    { fr: 'À propos',       en: 'About',      ar: 'نبذة عني' },
  'about.linkedin': { fr: 'Profil LinkedIn', en: 'LinkedIn Profile', ar: 'ملف لينكدإن' },
  'about.lead':     {
    fr: 'Gastro-entérologue spécialisé en <strong>endoscopie interventionnelle</strong>, <strong>hépatologie</strong> et <strong>oncologie digestive</strong>.',
    en: 'Gastroenterologist specializing in <strong>interventional endoscopy</strong>, <strong>hepatology</strong> and <strong>digestive oncology</strong>.',
    ar: 'أخصائي أمراض الجهاز الهضمي متخصص في <strong>التنظير التداخلي</strong> و<strong>أمراض الكبد</strong> و<strong>الأورام الهضمية</strong>.'
  },
  'about.bio1': {
    fr: 'Parcours clinique, pédagogique et de recherche reconnu à l\'échelle nationale et internationale. Formation avancée effectuée en Europe, en Turquie, en Égypte et en Inde. Passionné par l\'enseignement basé sur la simulation médicale.',
    en: 'Nationally and internationally recognized clinical, educational and research career. Advanced training completed in Europe, Turkey, Egypt and India. Passionate about medical simulation-based teaching.',
    ar: 'مسيرة إكلينيكية وتعليمية وبحثية معترف بها على المستويين الوطني والدولي. تكوين متقدم في أوروبا وتركيا ومصر والهند. شغف بالتدريس القائم على المحاكاة الطبية.'
  },
  'about.bio2': {
    fr: 'Membre du Conseil d\'Administration de la <strong>Société Marocaine d\'Endoscopie Digestive</strong> et du <strong>Groupe des Jeunes Endoscopistes de l\'Association Européenne d\'Endoscopie Digestive (EAGE)</strong>.',
    en: 'Member of the Board of Directors of the <strong>Moroccan Society of Digestive Endoscopy</strong> and the <strong>Young Endoscopists Group of the European Association of Digestive Endoscopy (EAGE)</strong>.',
    ar: 'عضو مجلس إدارة <strong>الجمعية المغربية لتنظير الجهاز الهضمي</strong> وعضو <strong>مجموعة المنظرين الشباب التابعة للجمعية الأوروبية لتنظير الجهاز الهضمي (EAGE)</strong>.'
  },
  'about.stat.teaching':   { fr: 'Ans d\'enseignement',   en: 'Years of teaching',    ar: 'سنوات التدريس' },
  'about.stat.pub':         { fr: 'Publications',          en: 'Publications',         ar: 'المنشورات' },
  'about.stat.countries':   { fr: 'Pays de formation',     en: 'Training countries',   ar: 'دول التكوين' },
  'about.stat.leadership':  { fr: 'Postes de direction',   en: 'Leadership roles',     ar: 'مناصب قيادية' },

  /* ── CONSULTATION ── */
  'consult.label':          { fr: 'Rendez-vous',              en: 'Appointments',           ar: 'المواعيد' },
  'consult.title':          { fr: 'Lieux de Consultation',    en: 'Consultation Locations', ar: 'أماكن الاستشارة' },
  'consult.chu.subtitle':   { fr: 'Hôpital Universitaire Public',        en: 'Public University Hospital',       ar: 'مستشفى جامعي عمومي' },
  'consult.chu.unit':       { fr: 'Unité d\'Endoscopie Digestive',        en: 'Digestive Endoscopy Unit',         ar: 'وحدة تنظير الجهاز الهضمي' },
  'consult.chu.hepato':     { fr: 'Coordinateur du Staff d\'Hépatologie', en: 'Hepatology Staff Coordinator',    ar: 'منسق فريق أمراض الكبد' },
  'consult.priv.subtitle':  { fr: 'Consultation & Endoscopie en Secteur Privé', en: 'Consultation & Endoscopy in Private Sector', ar: 'استشارة وتنظير في القطاع الخاص' },
  'consult.priv.gastro':    { fr: 'Consultations gastro-entérologiques',  en: 'Gastroenterological consultations', ar: 'استشارات أمراض الجهاز الهضمي' },
  'consult.priv.acts':      { fr: 'Coloscopie, Gastroscopie, Écho-endoscopie', en: 'Colonoscopy, Gastroscopy, Echoendoscopy', ar: 'تنظير القولون، تنظير المعدة، التصوير بالصدى' },
  'consult.priv.multi':     { fr: 'Plusieurs établissements privés à Marrakech', en: 'Several private facilities in Marrakech', ar: 'عدة مؤسسات خاصة في مراكش' },
  'consult.fac.subtitle':   { fr: 'Enseignement Universitaire',   en: 'University Teaching',     ar: 'التدريس الجامعي' },
  'consult.fac.name':       { fr: 'Faculté de Médecine et de Pharmacie, Marrakech', en: 'Faculty of Medicine and Pharmacy, Marrakech', ar: 'كلية الطب والصيدلة، مراكش' },
  'consult.fac.prof':       { fr: 'Professeur en Gastro-entérologie', en: 'Professor of Gastroenterology', ar: 'أستاذ في أمراض الجهاز الهضمي' },
  'consult.fac.sim':        { fr: 'Formation par simulation médicale', en: 'Medical simulation training',   ar: 'التدريب بالمحاكاة الطبية' },

  /* ── EXPÉRIENCE ── */
  'exp.label':   { fr: 'Carrière',                    en: 'Career',                       ar: 'المسيرة المهنية' },
  'exp.title':   { fr: 'Expérience Professionnelle',  en: 'Professional Experience',      ar: 'الخبرة المهنية' },
  'exp.present': { fr: 'Présent',                     en: 'Present',                      ar: 'الآن' },

  'exp.1.title':  { fr: 'Professeur en Gastro-entérologie',  en: 'Professor of Gastroenterology',       ar: 'أستاذ في أمراض الجهاز الهضمي' },
  'exp.1.org':    { fr: 'Faculté de Médecine et de Pharmacie, Marrakech', en: 'Faculty of Medicine and Pharmacy, Marrakech', ar: 'كلية الطب والصيدلة، مراكش' },
  'exp.1.li1':    { fr: 'Enseignement aux étudiants en médecine et aux résidents en gastro-entérologie.', en: 'Teaching medical students and gastroenterology residents.', ar: 'تدريس طلاب الطب والمقيمين في أمراض الجهاز الهضمي.' },
  'exp.1.li2':    { fr: 'Élaboration et mise en œuvre de programmes d\'enseignement et de curricula pédagogiques.', en: 'Development and implementation of teaching programs and pedagogical curricula.', ar: 'وضع وتنفيذ برامج التدريس والمناهج البيداغوجية.' },

  'exp.2.title':  { fr: 'Responsable de l\'Unité d\'Endoscopie Digestive', en: 'Head of Digestive Endoscopy Unit', ar: 'مسؤول وحدة تنظير الجهاز الهضمي' },
  'exp.2.org':    { fr: 'CHU Mohammed VI, Marrakech', en: 'CHU Mohammed VI, Marrakech', ar: 'المستشفى الجامعي محمد السادس، مراكش' },
  'exp.2.li1':    { fr: 'Gestion des opérations de l\'unité et maintien de hauts standards de soins.', en: 'Management of unit operations and maintenance of high standards of care.', ar: 'إدارة عمليات الوحدة والحفاظ على معايير رعاية عالية.' },
  'exp.2.li2':    { fr: 'Réalisation de procédures diagnostiques et thérapeutiques avancées.', en: 'Performing advanced diagnostic and therapeutic procedures.', ar: 'إجراء إجراءات تشخيصية وعلاجية متقدمة.' },
  'exp.2.li3':    { fr: 'Direction d\'une équipe pluridisciplinaire de professionnels de santé.', en: 'Leading a multidisciplinary team of healthcare professionals.', ar: 'قيادة فريق متعدد التخصصات من المهنيين الصحيين.' },

  'exp.3.title':  { fr: 'Coordinateur du Staff d\'Hépatologie', en: 'Hepatology Staff Coordinator', ar: 'منسق فريق أمراض الكبد' },
  'exp.3.org':    { fr: 'CHU Mohammed VI, Marrakech', en: 'CHU Mohammed VI, Marrakech', ar: 'المستشفى الجامعي محمد السادس، مراكش' },
  'exp.3.li1':    { fr: 'Coordination de l\'équipe d\'hépatologie et organisation des activités cliniques.', en: 'Coordination of the hepatology team and organization of clinical activities.', ar: 'تنسيق فريق أمراض الكبد وتنظيم الأنشطة الإكلينيكية.' },
  'exp.3.li2':    { fr: 'Élaboration des plans de prise en charge et des stratégies thérapeutiques.', en: 'Development of management plans and therapeutic strategies.', ar: 'وضع خطط الرعاية والاستراتيجيات العلاجية.' },

  'exp.4.title':  { fr: 'Membre du Conseil National', en: 'National Council Member', ar: 'عضو المجلس الوطني' },
  'exp.4.org':    { fr: 'Société Marocaine d\'Endoscopie Digestive', en: 'Moroccan Society of Digestive Endoscopy', ar: 'الجمعية المغربية لتنظير الجهاز الهضمي' },
  'exp.4.li1':    { fr: 'Participation active aux activités et à la planification stratégique de la société.', en: 'Active participation in society activities and strategic planning.', ar: 'مشاركة فعالة في أنشطة الجمعية والتخطيط الاستراتيجي.' },
  'exp.4.li2':    { fr: 'Promotion des meilleures pratiques en endoscopie digestive.', en: 'Promotion of best practices in digestive endoscopy.', ar: 'تعزيز أفضل الممارسات في تنظير الجهاز الهضمي.' },

  'exp.5.title':  { fr: 'Responsable de l\'Unité d\'Endoscopie Digestive', en: 'Head of Digestive Endoscopy Unit', ar: 'مسؤول وحدة تنظير الجهاز الهضمي' },
  'exp.5.org':    { fr: 'Hôpital Provincial d\'Essmara', en: 'Provincial Hospital of Essmara', ar: 'المستشفى الإقليمي السمارة' },
  'exp.5.li1':    { fr: 'Gestion des opérations de l\'unité et assurance de la qualité des soins.', en: 'Management of unit operations and quality assurance of care.', ar: 'إدارة عمليات الوحدة وضمان جودة الرعاية.' },
  'exp.5.li2':    { fr: 'Réalisation de procédures diagnostiques et thérapeutiques endoscopiques.', en: 'Performing endoscopic diagnostic and therapeutic procedures.', ar: 'إجراء إجراءات تنظيرية تشخيصية وعلاجية.' },

  'exp.6.title':  { fr: 'Membre du Comité de Lecture', en: 'Editorial Board Member', ar: 'عضو هيئة التحرير' },
  'exp.6.org':    { fr: 'Revue Marocaine des Maladies de l\'Appareil Digestif (RMMAD)', en: 'Moroccan Journal of Digestive Diseases (RMMAD)', ar: 'المجلة المغربية لأمراض الجهاز الهضمي (RMMAD)' },
  'exp.6.li1':    { fr: 'Évaluation de travaux scientifiques et de recommandations cliniques.', en: 'Review of scientific papers and clinical recommendations.', ar: 'تقييم الأعمال العلمية والتوصيات الإكلينيكية.' },
  'exp.6.li2':    { fr: 'Contribution aux politiques et normes nationales de santé.', en: 'Contribution to national health policies and standards.', ar: 'المساهمة في السياسات والمعايير الصحية الوطنية.' },

  /* ── FORMATION ── */
  'form.label':  { fr: 'Parcours académique',  en: 'Academic background',  ar: 'المسار الأكاديمي' },
  'form.title':  { fr: 'Formation & Diplômes', en: 'Education & Degrees',   ar: 'التكوين والشهادات' },
  'form.deg1.title':  { fr: 'Doctorat en Médecine',                         en: 'Doctor of Medicine',                         ar: 'دكتوراه في الطب' },
  'form.deg1.badge':  { fr: 'Très honorable avec félicitations du jury',    en: 'With highest honors',                        ar: 'بتقدير مشرف جداً مع تهانئ لجنة التحكيم' },
  'form.deg2.title':  { fr: 'Diplôme de Spécialité en Gastro-entérologie',  en: 'Specialty Diploma in Gastroenterology',      ar: 'دبلوم التخصص في أمراض الجهاز الهضمي' },
  'form.deg3.title':  { fr: 'DIU – Syndrome de l\'Intestin Irritable',      en: 'University Diploma – Irritable Bowel Syndrome', ar: 'دبلوم جامعي – متلازمة القولون المتهيج' },
  'form.deg4.title':  { fr: 'MBA – Management Hospitalier',                 en: 'MBA – Hospital Management',                  ar: 'ماجستير إدارة المستشفيات' },
  'form.deg5.title':  { fr: 'Formation Postgraduée – Organisation Mondiale de Gastroentérologie', en: 'Postgraduate Training – World Gastroenterology Organisation', ar: 'تكوين ما بعد التخرج – المنظمة العالمية لأمراض الجهاز الهضمي' },
  'form.deg6.title':  { fr: 'Formation en Pancréatologie',                  en: 'Training in Pancreatology',                  ar: 'تكوين في أمراض البنكرياس' },
  'form.internships.title': { fr: 'Formations en Endoscopie Interventionnelle', en: 'Interventional Endoscopy Training', ar: 'تكوينات في التنظير التداخلي' },

  /* ── VIDÉOS ── */
  'videos.label':    { fr: 'Gestes endoscopiques',     en: 'Endoscopic procedures',         ar: 'التقنيات التنظيرية' },
  'videos.title':    { fr: 'Vidéos de Procédures',     en: 'Procedure Videos',              ar: 'مقاطع الإجراءات' },
  'videos.desc':     { fr: 'Découvrez les gestes techniques réalisés par le Pr. Ait Errami en endoscopie interventionnelle.', en: 'Explore the technical procedures performed by Prof. Ait Errami in interventional endoscopy.', ar: 'اكتشف الإجراءات التقنية التي يجريها الأستاذ عيت أرامي في التنظير التداخلي.' },
  'videos.soon':     { fr: 'Vidéo à venir',            en: 'Video coming soon',             ar: 'الفيديو قريباً' },
  'videos.note':     { fr: 'Les vidéos de procédures endoscopiques seront ajoutées prochainement.', en: 'Endoscopic procedure videos will be added soon.', ar: 'سيتم إضافة مقاطع الإجراءات التنظيرية قريباً.' },

  /* ── PUBLICATIONS ── */
  'pub.label':  { fr: 'Recherche & Science',      en: 'Research & Science',      ar: 'البحث العلمي' },
  'pub.title':  { fr: 'Publications & Congrès',   en: 'Publications & Congresses', ar: 'المنشورات والمؤتمرات' },
  'pub.tag.international': { fr: 'Étude Multicentrique Internationale', en: 'International Multicenter Study', ar: 'دراسة دولية متعددة المراكز' },
  'pub.tag.award':         { fr: 'Prix du Meilleur Travail de Recherche', en: 'Best Research Award',           ar: 'جائزة أفضل عمل بحثي' },
  'pub.tag.article':       { fr: 'Article',   en: 'Article',  ar: 'مقال' },
  'pub.tag.book':          { fr: 'Ouvrage',   en: 'Book',     ar: 'كتاب' },
  'pub.tag.digital':       { fr: 'Innovation numérique', en: 'Digital Innovation', ar: 'ابتكار رقمي' },
  'pub.conferences.title': { fr: 'Congrès & Présentations', en: 'Congresses & Presentations', ar: 'المؤتمرات والعروض' },

  /* ── COMPÉTENCES ── */
  'skills.title':          { fr: 'Compétences & Affiliations',     en: 'Skills & Affiliations',          ar: 'الكفاءات والانتماءات' },
  'skills.endo.title':     { fr: 'Endoscopie Interventionnelle',   en: 'Interventional Endoscopy',       ar: 'التنظير التداخلي' },
  'skills.endo.desc':      { fr: 'Expert en ERCP, EUS, EMR et gestes endoscopiques diagnostiques & thérapeutiques avancés.', en: 'Expert in ERCP, EUS, EMR and advanced diagnostic & therapeutic endoscopic procedures.', ar: 'خبير في ERCP وEUS وEMR والإجراءات التنظيرية التشخيصية والعلاجية المتقدمة.' },
  'skills.hepato.title':   { fr: 'Hépatologie',                    en: 'Hepatology',                     ar: 'أمراض الكبد' },
  'skills.hepato.desc':    { fr: 'Expertise avancée en hépatologie, maladies du foie et oncologie digestive.', en: 'Advanced expertise in hepatology, liver disease and digestive oncology.', ar: 'خبرة متقدمة في أمراض الكبد والأورام الهضمية.' },
  'skills.teach.title':    { fr: 'Formation Médicale',             en: 'Medical Education',              ar: 'التكوين الطبي' },
  'skills.teach.desc':     { fr: 'Professeur universitaire passionné par la simulation médicale et l\'innovation pédagogique.', en: 'University professor passionate about medical simulation and pedagogical innovation.', ar: 'أستاذ جامعي شغوف بالمحاكاة الطبية والابتكار البيداغوجي.' },
  'skills.lead.title':     { fr: 'Leadership',                     en: 'Leadership',                     ar: 'القيادة' },
  'skills.lead.desc':      { fr: 'Coordination d\'équipes pluridisciplinaires et gestion d\'unités hospitalières.', en: 'Coordination of multidisciplinary teams and hospital unit management.', ar: 'تنسيق الفرق متعددة التخصصات وإدارة الوحدات الاستشفائية.' },
  'skills.research.title': { fr: 'Recherche Médicale',             en: 'Medical Research',               ar: 'البحث الطبي' },
  'skills.research.desc':  { fr: 'Maîtrise de la recherche clinique, de la rédaction scientifique et de la collaboration internationale.', en: 'Mastery of clinical research, scientific writing and international collaboration.', ar: 'إتقان البحث الإكلينيكي والكتابة العلمية والتعاون الدولي.' },
  'skills.digital.title':  { fr: 'Santé Numérique',                en: 'Digital Health',                 ar: 'الصحة الرقمية' },
  'skills.digital.desc':   { fr: 'Développement d\'applications mobiles pour la gastro-entérologie et l\'aide à la pratique médicale.', en: 'Development of mobile applications for gastroenterology and medical practice support.', ar: 'تطوير تطبيقات الهاتف المحمول لأمراض الجهاز الهضمي ودعم الممارسة الطبية.' },
  'members.title':         { fr: 'Membres & Affiliations', en: 'Memberships & Affiliations', ar: 'العضويات والانتماءات' },

  /* ── GALERIE ── */
  'gallery.label':        { fr: 'Terrain & International',           en: 'Field & International',             ar: 'الميدان والدولي' },
  'gallery.title':        { fr: 'Galerie',                           en: 'Gallery',                           ar: 'المعرض' },
  'gallery.subtitle':     { fr: 'Congrès, ateliers pratiques et présentations scientifiques', en: 'Congresses, practical workshops and scientific presentations', ar: 'المؤتمرات والورشات العملية والعروض العلمية' },
  'gallery.filter.all':   { fr: 'Tout',                              en: 'All',                               ar: 'الكل' },
  'gallery.filter.cong':  { fr: 'Congrès',                          en: 'Congresses',                        ar: 'المؤتمرات' },
  'gallery.filter.pres':  { fr: 'Présentations & Ateliers',         en: 'Presentations & Workshops',         ar: 'العروض والورشات' },

  /* ── CONTACT ── */
  'contact.label':         { fr: 'Nous joindre',       en: 'Get in touch',     ar: 'تواصل معنا' },
  'contact.title':         { fr: 'Contact',             en: 'Contact',          ar: 'التواصل' },
  'contact.call':          { fr: 'Appeler directement', en: 'Call directly',    ar: 'الاتصال مباشرة' },
  'contact.location':      { fr: 'Localisation',        en: 'Location',         ar: 'الموقع' },
  'contact.priv.detail':   { fr: 'Plusieurs établissements privés, Marrakech', en: 'Several private facilities, Marrakech', ar: 'عدة مؤسسات خاصة، مراكش' },
  'form.name.label':       { fr: 'Nom complet',         en: 'Full name',        ar: 'الاسم الكامل' },
  'form.name.placeholder': { fr: 'Votre nom complet',   en: 'Your full name',   ar: 'اسمك الكامل' },
  'form.email.label':      { fr: 'Adresse e-mail',      en: 'Email address',    ar: 'البريد الإلكتروني' },
  'form.email.placeholder':{ fr: 'votre@email.com',     en: 'your@email.com',   ar: 'بريدك@email.com' },
  'form.phone.label':      { fr: 'Téléphone',           en: 'Phone',            ar: 'الهاتف' },
  'form.subject.label':    { fr: 'Objet',               en: 'Subject',          ar: 'الموضوع' },
  'form.subject.placeholder': { fr: 'Consultation / Collaboration / Autre', en: 'Consultation / Collaboration / Other', ar: 'استشارة / تعاون / أخرى' },
  'form.message.label':    { fr: 'Message',             en: 'Message',          ar: 'الرسالة' },
  'form.message.placeholder': { fr: 'Votre message...', en: 'Your message...',  ar: 'رسالتك...' },
  'form.submit':           { fr: 'Envoyer le message',  en: 'Send message',     ar: 'إرسال الرسالة' },
  'form.success.title':    { fr: 'Message envoyé !',    en: 'Message sent!',    ar: 'تم إرسال الرسالة!' },
  'form.success.desc':     { fr: 'Merci pour votre message. Le Pr. Ait Errami vous répondra dans les plus brefs délais.', en: 'Thank you for your message. Prof. Ait Errami will reply as soon as possible.', ar: 'شكراً على رسالتك. سيرد الأستاذ عيت أرامي في أقرب وقت ممكن.' },

  /* ── FOOTER ── */
  'footer.role':  { fr: 'Gastro-Entérologue · Professeur · Chercheur', en: 'Gastroenterologist · Professor · Researcher', ar: 'أخصائي أمراض الجهاز الهضمي · أستاذ · باحث' },
  'footer.loc':   { fr: 'CHU Mohammed VI · Cliniques Privées · Faculté de Médecine, Marrakech', en: 'CHU Mohammed VI · Private Clinics · Faculty of Medicine, Marrakech', ar: 'المستشفى الجامعي محمد السادس · العيادات الخاصة · كلية الطب، مراكش' },
  'footer.nav':   { fr: 'Navigation',  en: 'Navigation',  ar: 'التنقل' },
  'footer.social':{ fr: 'Réseaux',     en: 'Networks',    ar: 'الشبكات' },
  'footer.copy':  { fr: '© 2025 Pr. Adil Ait Errami. Tous droits réservés.', en: '© 2025 Pr. Adil Ait Errami. All rights reserved.', ar: '© 2025 الأستاذ عادل عيت أرامي. جميع الحقوق محفوظة.' },
};
