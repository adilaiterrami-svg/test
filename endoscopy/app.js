'use strict';

// ── Speech Recognition ──────────────────────────────────────
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = null, activeTarget = null, activeMicBtn = null;

function initSpeech() {
  if (!SpeechRec) return;
  recog = new SpeechRec();
  recog.lang = 'fr-FR';
  recog.continuous = false;
  recog.interimResults = true;

  recog.onresult = e => {
    const t = Array.from(e.results).map(r => r[0].transcript).join('');
    if (activeTarget) {
      if (activeTarget.tagName === 'SELECT') {
        matchSelect(activeTarget, t);
      } else {
        const cur = activeTarget.value;
        activeTarget.value = cur ? cur + ' ' + t : t;
      }
    }
  };

  recog.onend = () => {
    badge.classList.remove('show');
    if (activeMicBtn) { activeMicBtn.classList.remove('listening'); activeMicBtn = null; }
    activeTarget = null;
  };

  recog.onerror = () => {
    badge.classList.remove('show');
    if (activeMicBtn) { activeMicBtn.classList.remove('listening'); activeMicBtn = null; }
  };
}

function matchSelect(sel, text) {
  const t = text.toLowerCase().trim();
  for (const opt of sel.options) {
    if (opt.value && opt.text.toLowerCase().includes(t)) {
      sel.value = opt.value;
      return;
    }
  }
}

function startMic(target, btn) {
  if (!recog) { alert('Dictée vocale non disponible sur ce navigateur.'); return; }
  if (activeMicBtn) { recog.stop(); return; }
  activeTarget = target;
  activeMicBtn = btn;
  btn.classList.add('listening');
  badge.classList.add('show');
  try { recog.start(); } catch(e) {}
}

// ── DOM helpers ─────────────────────────────────────────────
const $ = id => document.getElementById(id);
const badge = document.getElementById('listening-badge');

function micBtn(targetId) {
  const b = document.createElement('button');
  b.className = 'btn-mic';
  b.title = 'Dicter';
  b.innerHTML = '🎙️';
  b.type = 'button';
  b.addEventListener('click', () => {
    const el = document.getElementById(targetId);
    if (el) startMic(el, b);
  });
  return b;
}

function optRow(name, options, multi = false) {
  const row = document.createElement('div');
  row.className = 'options-row';
  options.forEach(opt => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opt-btn';
    b.textContent = opt;
    b.dataset.val = opt;
    b.addEventListener('click', () => {
      if (!multi) row.querySelectorAll('.opt-btn').forEach(x => x.classList.remove('selected'));
      b.classList.toggle('selected');
    });
    row.appendChild(b);
  });
  row.dataset.name = name;
  return row;
}

function getOptRow(row) {
  return Array.from(row.querySelectorAll('.opt-btn.selected')).map(b => b.dataset.val).join(', ');
}

function fieldGroup(labelText, inputEl, hasMic = false, micId = null) {
  const g = document.createElement('div');
  g.className = 'field-group';
  const lbl = document.createElement('label');
  lbl.className = 'field-label';
  lbl.textContent = labelText;
  g.appendChild(lbl);
  const row = document.createElement('div');
  row.className = 'field-row';
  row.appendChild(inputEl);
  if (hasMic && micId) { inputEl.id = micId; row.appendChild(micBtn(micId)); }
  g.appendChild(row);
  return g;
}

function sectionTitle(text) {
  const d = document.createElement('div');
  d.className = 'section-title';
  d.textContent = text;
  return d;
}

function makeInput(type = 'text', placeholder = '') {
  const el = document.createElement(type === 'textarea' ? 'textarea' : 'input');
  if (type !== 'textarea') el.type = type;
  el.placeholder = placeholder;
  return el;
}

function makeSelect(options) {
  const s = document.createElement('select');
  options.forEach(([val, txt]) => {
    const o = document.createElement('option');
    o.value = val; o.textContent = txt;
    s.appendChild(o);
  });
  return s;
}

function bostonScore(id) {
  const g = document.createElement('div');
  g.className = 'field-group';
  const lbl = document.createElement('label');
  lbl.className = 'field-label';
  lbl.textContent = 'Qualité de préparation — Score de Boston (BBPS)';
  g.appendChild(lbl);
  const row = document.createElement('div');
  row.className = 'boston-row';
  const segments = ['Côlon D', 'Côlon T', 'Côlon G'];
  const scores = [0, 1, 2, 3];
  const labels = ['Muqueuse non vue', 'Résidus solides', 'Résidus liquides', 'Excellente'];

  segments.forEach((seg, si) => {
    const col = document.createElement('div');
    col.style.cssText = 'flex:1;display:flex;flex-direction:column;gap:4px;';
    const segLbl = document.createElement('div');
    segLbl.style.cssText = 'font-size:0.68rem;color:var(--text-muted);text-align:center;margin-bottom:4px;';
    segLbl.textContent = seg;
    col.appendChild(segLbl);
    scores.forEach(sc => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `score-seg s${sc}`;
      btn.dataset.seg = si;
      btn.dataset.score = sc;
      btn.title = labels[sc];
      btn.innerHTML = `<strong>${sc}</strong>`;
      btn.addEventListener('click', () => {
        col.querySelectorAll('.score-seg').forEach(x => x.classList.remove('selected'));
        btn.classList.add('selected');
      });
      col.appendChild(btn);
    });
    row.appendChild(col);
  });
  g.appendChild(row);
  g.id = id;
  return g;
}

function getBostonTotal(g) {
  let total = 0;
  g.querySelectorAll('.score-seg.selected').forEach(b => total += +b.dataset.score);
  const selected = g.querySelectorAll('.score-seg.selected').length;
  if (selected < 3) return null;
  const labels = ['Insuffisante', 'Mauvaise', 'Médiocre', 'Acceptable', 'Bonne', 'Bonne', 'Bonne', 'Excellente', 'Excellente', 'Excellente'];
  return `${total}/9 (${labels[total]})`;
}

// ── Polyp manager ────────────────────────────────────────────
let polypCount = 0;

function polypCard(num) {
  const card = document.createElement('div');
  card.className = 'polyp-card';
  card.dataset.polyp = num;
  card.innerHTML = `<h4>Polype n°${num}</h4>
    <button type="button" class="btn-del-polyp" onclick="this.closest('.polyp-card').remove()">✕</button>
    <div class="polyp-fields">
      <div class="polyp-field"><label>Localisation</label>
        <select name="loc"><option value="">—</option>
          <option>Caecum</option><option>Côlon ascendant</option><option>Angle hépatique</option>
          <option>Côlon transverse</option><option>Angle splénique</option><option>Côlon descendant</option>
          <option>Sigmoïde</option><option>Rectum</option>
        </select></div>
      <div class="polyp-field"><label>Taille (mm)</label><input type="number" min="1" max="150" placeholder="mm"></div>
      <div class="polyp-field"><label>Morphologie (Paris)</label>
        <select name="paris"><option value="">—</option>
          <option>Ip (pédiculé)</option><option>Is (sessile large)</option>
          <option>IIa (plan surélevé)</option><option>IIb (plan)</option><option>IIc (déprimé)</option>
          <option>IIa+IIc</option><option>III (excavé)</option>
        </select></div>
      <div class="polyp-field"><label>Résection</label>
        <select name="resection"><option value="">—</option>
          <option>Pince froide</option><option>Anse froide</option><option>Anse chaude</option>
          <option>Mucosectomie (EMR)</option><option>Sous-muqueuse (ESD)</option>
          <option>Non réséqué</option><option>Tatouage + biopsie</option>
        </select></div>
      <div class="polyp-field"><label>Récupération</label>
        <select name="recup"><option value="">—</option>
          <option>Aspiration</option><option>Pince à panier</option><option>Filet de récupération</option>
          <option>Non récupéré</option>
        </select></div>
      <div class="polyp-field"><label>Aspect NBI/Pit pattern</label>
        <select name="nbi"><option value="">—</option>
          <option>NICE 1 (hyperplasique)</option><option>NICE 2 (adénomateux)</option>
          <option>NICE 3 (invasif)</option><option>Non évalué</option>
        </select></div>
    </div>`;
  return card;
}

// ── Navigation ───────────────────────────────────────────────
let currentProc = null;
const home = $('home');
const formPage = $('form-page');
const headerTitle = $('header-title');
const headerSub = $('header-sub');
const btnBack = $('btn-back');
const formContent = $('form-content');
const reportOut = $('report-output');
const toast = $('toast');

const PROC_LABELS = {
  colo:    ['Coloscopie', 'Compte rendu'],
  fogd:    ['Gastroscopie (FOGD)', 'Fibroscopie Oeso-Gastro-Duodénale'],
  cpre:    ['CPRE', 'Cholangiopancréatographie Rétrograde'],
  capsule: ['Vidéocapsule', 'Intestin grêle'],
};

document.querySelectorAll('.proc-card').forEach(card => {
  card.addEventListener('click', () => openProc(card.dataset.proc));
});

btnBack.addEventListener('click', () => {
  home.style.display = '';
  formPage.style.display = 'none';
  reportOut.classList.remove('visible');
  currentProc = null;
});

function openProc(proc) {
  currentProc = proc;
  home.style.display = 'none';
  formPage.style.display = 'block';
  const [title, sub] = PROC_LABELS[proc];
  headerTitle.textContent = title;
  headerSub.textContent = sub;
  formContent.innerHTML = '';
  reportOut.classList.remove('visible');
  reportOut.textContent = '';
  polypCount = 0;
  builders[proc]();
}

// ── Patient info (shared) ─────────────────────────────────────
function buildPatientInfo(idPrefix) {
  formContent.appendChild(sectionTitle('Identification'));

  const nom = makeInput('text', 'Nom et prénom');
  formContent.appendChild(fieldGroup('Patient', nom, true, idPrefix + '_nom'));

  const dateNaiss = makeInput('date');
  formContent.appendChild(fieldGroup('Date de naissance', dateNaiss, false));

  const dateExam = makeInput('date');
  dateExam.valueAsDate = new Date();
  formContent.appendChild(fieldGroup("Date de l'examen", dateExam, false));

  const medecin = makeInput('text', 'Opérateur');
  formContent.appendChild(fieldGroup('Médecin opérateur', medecin, true, idPrefix + '_medecin'));

  const indic = makeInput('textarea', 'Ex : Dépistage familial, rectorragies, contrôle post-polypectomie…');
  formContent.appendChild(fieldGroup('Indication', indic, true, idPrefix + '_indic'));

  return { nom, dateNaiss, dateExam, medecin, indic };
}

function getAge(dateNaiss, dateExam) {
  if (!dateNaiss.value) return '';
  const d = new Date(dateExam.value || Date.now());
  const n = new Date(dateNaiss.value);
  let age = d.getFullYear() - n.getFullYear();
  if (d.getMonth() < n.getMonth() || (d.getMonth() === n.getMonth() && d.getDate() < n.getDate())) age--;
  return ` (${age} ans)`;
}

// ── COLOSCOPIE ────────────────────────────────────────────────
function buildColo() {
  const pat = buildPatientInfo('co');

  // Prémédication
  formContent.appendChild(sectionTitle('Prémédication / Anesthésie'));
  const premed = fieldGroup('Anesthésie', makeSelect([
    ['','— choisir —'],['sedation_cs','Sédation consciente (midazolam)'],
    ['ag','Anesthésie générale (propofol)'],['aucune','Sans prémédication'],
    ['autre','Autre'],
  ]));
  premed.querySelector('select').id = 'co_premed';
  formContent.appendChild(premed);

  const scope = makeSelect([
    ['','— choisir —'],['olympus_q180','Olympus CF-Q180'],['olympus_hq190','Olympus CF-HQ190'],
    ['fujinon_760','Fujinon EC-760'],['pentax_3490','Pentax EC-3490'],['autre','Autre'],
  ]);
  formContent.appendChild(fieldGroup('Vidéocolonoscope', scope));

  // Préparation
  formContent.appendChild(sectionTitle('Préparation colique'));
  const prep = makeSelect([
    ['','— choisir —'],['peg4','PEG 4L (Klean-Prep)'],['peg2','PEG 2L + ascorbate (Moviprep)'],
    ['peg1','PEG 1L + bisacodyl (Eziclen)'],['pico','Picosulfate (Pico-Salax)'],['autre','Autre'],
  ]);
  formContent.appendChild(fieldGroup('Produit de préparation', prep));

  const prepQual = optRow('prep_qual', ['Veille uniquement', 'Fractionnée (J-1/J0)', 'Matinale']);
  const prepG = document.createElement('div');
  prepG.className = 'field-group';
  const prepLbl = document.createElement('label');
  prepLbl.className = 'field-label';
  prepLbl.textContent = 'Modalité';
  prepG.appendChild(prepLbl);
  prepG.appendChild(prepQual);
  formContent.appendChild(prepG);

  const bostonEl = bostonScore('co_boston');
  formContent.appendChild(bostonEl);

  // Examen
  formContent.appendChild(sectionTitle('Déroulement de l\'examen'));
  const intub = optRow('intub', ['Intubation caecale complète', 'Intubation iléale', 'Examen incomplet']);
  const intubG = document.createElement('div');
  intubG.className = 'field-group';
  const intubLbl = document.createElement('label');
  intubLbl.className = 'field-label';
  intubLbl.textContent = 'Intubation';
  intubG.appendChild(intubLbl);
  intubG.appendChild(intub);
  formContent.appendChild(intubG);

  const retrait = makeInput('number', 'min');
  retrait.min = 1; retrait.max = 60;
  formContent.appendChild(fieldGroup('Temps de retrait (min)', retrait));

  // Muqueuse
  formContent.appendChild(sectionTitle('Muqueuse — Segments'));
  const segs = ['Caecum / valvule de Bauhin', 'Côlon ascendant', 'Côlon transverse', 'Côlon descendant', 'Sigmoïde', 'Rectum'];
  const segInputs = {};
  segs.forEach((s, i) => {
    const id = 'co_seg_' + i;
    const inp = makeInput('textarea', 'Muqueuse normale, diverticules, lésions…');
    segInputs[s] = inp;
    formContent.appendChild(fieldGroup(s, inp, true, id));
  });

  // Polypes
  formContent.appendChild(sectionTitle('Polypes / Lésions'));
  const noPoly = optRow('no_poly', ['Pas de polype (coloscopie normale)']);
  const noPolyG = document.createElement('div');
  noPolyG.className = 'field-group';
  const noPolyLbl = document.createElement('label');
  noPolyLbl.className = 'field-label';
  noPolyLbl.textContent = 'Résultat';
  noPolyG.appendChild(noPolyLbl);
  noPolyG.appendChild(noPoly);
  formContent.appendChild(noPolyG);

  const polypListEl = document.createElement('div');
  polypListEl.className = 'polyp-list';
  polypListEl.id = 'co_polyp_list';
  const polypWrap = document.createElement('div');
  polypWrap.className = 'field-group';
  const polypLbl = document.createElement('label');
  polypLbl.className = 'field-label';
  polypLbl.textContent = 'Détail des lésions';
  polypWrap.appendChild(polypLbl);
  polypWrap.appendChild(polypListEl);
  const btnAdd = document.createElement('button');
  btnAdd.type = 'button';
  btnAdd.className = 'btn-add';
  btnAdd.textContent = '+ Ajouter un polype / lésion';
  btnAdd.addEventListener('click', () => {
    polypCount++;
    polypListEl.appendChild(polypCard(polypCount));
  });
  polypWrap.appendChild(btnAdd);
  formContent.appendChild(polypWrap);

  // Complications
  formContent.appendChild(sectionTitle('Complications / Incidents'));
  const complic = optRow('complic', ['Aucune complication', 'Perforation', 'Saignement', 'Malaise vagal', 'Douleurs importantes'], true);
  const complicG = document.createElement('div');
  complicG.className = 'field-group';
  const complicLbl = document.createElement('label');
  complicLbl.className = 'field-label';
  complicLbl.textContent = 'Incidents';
  complicG.appendChild(complicLbl);
  complicG.appendChild(complic);
  formContent.appendChild(complicG);

  // Conclusion
  formContent.appendChild(sectionTitle('Conclusion'));
  const concl = makeInput('textarea', 'Résumé des principaux résultats…');
  formContent.appendChild(fieldGroup('Conclusion', concl, true, 'co_concl'));

  const suivi = makeSelect([
    ['','— choisir —'],
    ['1an','Contrôle coloscopie à 1 an'],['3ans','Contrôle coloscopie à 3 ans'],
    ['5ans','Contrôle coloscopie à 5 ans'],['10ans','Contrôle coloscopie à 10 ans'],
    ['normal','Reprise du programme de dépistage (10 ans si normal)'],
    ['chirurgie','Avis chirurgical recommandé'],['autre','Autre (préciser)'],
  ]);
  formContent.appendChild(fieldGroup('Recommandation de surveillance', suivi));

  // Actions
  appendActions(() => {
    const bt = getBostonTotal(bostonEl);
    const polyps = Array.from(document.querySelectorAll('#co_polyp_list .polyp-card'));
    const polypsText = polyps.length === 0 ? '    Aucun polype identifié.' :
      polyps.map((c, i) => {
        const loc = c.querySelector('[name="loc"]').value;
        const sz = c.querySelector('[type="number"]').value;
        const paris = c.querySelector('[name="paris"]').value;
        const resec = c.querySelector('[name="resection"]').value;
        return `    Polype ${i+1} : ${loc || '?'}, ${sz ? sz + ' mm' : '?'}, ${paris || '?'}, résection : ${resec || '?'}`;
      }).join('\n');

    const segsText = Object.entries(segInputs).map(([s, inp]) =>
      inp.value ? `    ${s} : ${inp.value}` : ''
    ).filter(Boolean).join('\n');

    return `COMPTE RENDU DE COLOSCOPIE
══════════════════════════════════════════
Patient  : ${$('co_nom')?.value || '—'}${getAge(pat.dateNaiss, pat.dateExam)}
Date     : ${pat.dateExam.value || new Date().toLocaleDateString('fr-FR')}
Opérateur: ${$('co_medecin')?.value || '—'}

INDICATION
  ${pat.indic.value || '—'}

PRÉMÉDICATION / MATÉRIEL
  Anesthésie : ${$('co_premed')?.options[$('co_premed')?.selectedIndex]?.text || '—'}
  Endoscope  : ${scope.options[scope.selectedIndex]?.text || '—'}

PRÉPARATION COLIQUE
  Produit : ${prep.options[prep.selectedIndex]?.text || '—'}
  Modalité : ${getOptRow(prepQual) || '—'}
  Score de Boston : ${bt || '—'}

DÉROULEMENT
  ${getOptRow(intub) || '—'}
  Temps de retrait : ${retrait.value ? retrait.value + ' min' : '—'}

RÉSULTATS PAR SEGMENT
${segsText || '    Non renseigné'}

POLYPES / LÉSIONS
${polypsText}

COMPLICATIONS
  ${getOptRow(complic) || '—'}

CONCLUSION
  ${concl.value || '—'}

RECOMMANDATION
  ${suivi.options[suivi.selectedIndex]?.text || '—'}
══════════════════════════════════════════`;
  });
}

// ── FOGD ──────────────────────────────────────────────────────
function buildFogd() {
  const pat = buildPatientInfo('fg');

  formContent.appendChild(sectionTitle('Prémédication / Matériel'));
  const premed = makeSelect([
    ['','— choisir —'],['aucune','Sans prémédication'],
    ['midazo','Midazolam IV'],['propofol','Propofol (AG)'],['spray','Spray pharyngé (Xylocaïne)'],
  ]);
  formContent.appendChild(fieldGroup('Anesthésie / Analgésie', premed));
  const scope = makeSelect([
    ['','— choisir —'],['olympus_gif180','Olympus GIF-H180'],['olympus_gif190','Olympus GIF-H190'],
    ['fujinon_eg760','Fujinon EG-760'],['pentax_eg','Pentax EG-2990'],['autre','Autre'],
  ]);
  formContent.appendChild(fieldGroup('Vidéo-endoscope', scope));

  formContent.appendChild(sectionTitle('Oropharynx / Oesophage'));
  const oropharynx = makeInput('textarea', 'Aspect normal, anomalie…');
  formContent.appendChild(fieldGroup('Oropharynx', oropharynx, true, 'fg_oro'));

  const oe = makeInput('textarea', 'Muqueuse normale / oesophagite / métaplasie de Barrett…');
  formContent.appendChild(fieldGroup('Oesophage', oe, true, 'fg_oe'));

  const jog = optRow('jog', ['Jonction normale', 'Hernie hiatale par glissement', 'Hernie hiatale par roulement', 'Oesophage de Barrett court', 'Oesophage de Barrett long (≥3cm)']);
  const jogG = document.createElement('div');
  jogG.className = 'field-group';
  jogG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Jonction oeso-gastrique' }));
  jogG.appendChild(jog);
  formContent.appendChild(jogG);

  const logBreath = optRow('hp_test', ['CLO test positif', 'CLO test négatif', 'Non réalisé']);
  const logBreathG = document.createElement('div');
  logBreathG.className = 'field-group';
  logBreathG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Test CLO (Helicobacter pylori)' }));
  logBreathG.appendChild(logBreath);
  formContent.appendChild(logBreathG);

  formContent.appendChild(sectionTitle('Estomac'));
  const fundus = makeInput('textarea', 'Muqueuse gastrique du fundus…');
  formContent.appendChild(fieldGroup('Fundus / Grande courbure', fundus, true, 'fg_fundus'));

  const corpAntre = makeInput('textarea', 'Corps gastrique, antre, pylore…');
  formContent.appendChild(fieldGroup('Corps / Antre / Pylore', corpAntre, true, 'fg_corp'));

  const biopsiesHp = optRow('biopsy_hp', ['Biopsies antrales HP (×2)', 'Biopsies fundiques HP (×2)', 'Biopsies corps gastrique', 'Biopsies sur lésion', 'Aucune biopsie'], true);
  const biopsyG = document.createElement('div');
  biopsyG.className = 'field-group';
  biopsyG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Biopsies réalisées' }));
  biopsyG.appendChild(biopsiesHp);
  formContent.appendChild(biopsyG);

  formContent.appendChild(sectionTitle('Duodénum'));
  const duod = makeInput('textarea', 'D1, D2, muqueuse duodénale normale / villositaire…');
  formContent.appendChild(fieldGroup('Duodénum', duod, true, 'fg_duod'));

  formContent.appendChild(sectionTitle('Conclusion'));
  const concl = makeInput('textarea', 'Résumé…');
  formContent.appendChild(fieldGroup('Conclusion', concl, true, 'fg_concl'));
  const suivi = makeSelect([
    ['','— choisir —'],['3mois','Contrôle à 3 mois'],['6mois','Contrôle à 6 mois'],
    ['1an','Contrôle à 1 an'],['3ans','Contrôle à 3 ans'],
    ['normal','Aucune surveillance particulière'],['ipp','Traitement IPP + contrôle'],
    ['tri_hp','Trithérapie anti-Helicobacter pylori'],
  ]);
  formContent.appendChild(fieldGroup('Recommandation', suivi));

  appendActions(() =>
    `COMPTE RENDU DE GASTROSCOPIE (FOGD)
══════════════════════════════════════════
Patient  : ${$('fg_nom')?.value || '—'}${getAge(pat.dateNaiss, pat.dateExam)}
Date     : ${pat.dateExam.value || new Date().toLocaleDateString('fr-FR')}
Opérateur: ${$('fg_medecin')?.value || '—'}

INDICATION
  ${pat.indic.value || '—'}

PRÉMÉDICATION / MATÉRIEL
  Anesthésie : ${premed.options[premed.selectedIndex]?.text || '—'}
  Endoscope  : ${scope.options[scope.selectedIndex]?.text || '—'}

RÉSULTATS
  Oropharynx     : ${oropharynx.value || 'Normal'}
  Oesophage      : ${oe.value || 'Normal'}
  Jonction OG    : ${getOptRow(jog) || '—'}
  Fundus         : ${fundus.value || 'Normal'}
  Corps/Antre    : ${corpAntre.value || 'Normal'}
  Duodénum       : ${duod.value || 'Normal'}
  Test CLO HP    : ${getOptRow(logBreath) || '—'}
  Biopsies       : ${getOptRow(biopsiesHp) || '—'}

CONCLUSION
  ${concl.value || '—'}

RECOMMANDATION
  ${suivi.options[suivi.selectedIndex]?.text || '—'}
══════════════════════════════════════════`
  );
}

// ── CPRE ──────────────────────────────────────────────────────
function buildCpre() {
  const pat = buildPatientInfo('cp');

  formContent.appendChild(sectionTitle('Prémédication / Matériel'));
  const premed = makeSelect([
    ['','— choisir —'],['ag','Anesthésie générale (propofol)'],
    ['seda','Sédation profonde (midazolam + fentanyl)'],['autre','Autre'],
  ]);
  formContent.appendChild(fieldGroup('Anesthésie', premed));
  const scope = makeSelect([
    ['','— choisir —'],['olympus_tj','Olympus TJF-Q180'],['fujinon_ed760','Fujinon ED-760'],
    ['pentax_ed','Pentax ED-3490'],['autre','Autre (duodénoscope)'],
  ]);
  formContent.appendChild(fieldGroup('Duodénoscope', scope));

  formContent.appendChild(sectionTitle('Cathétérisme biliaire'));
  const papille = optRow('papille', ['Papille normale', 'Papille bombante', 'Papille infiltrée', 'Ampullome', 'Sphinctérotomie antérieure']);
  const papilleG = document.createElement('div');
  papilleG.className = 'field-group';
  papilleG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Aspect de la papille' }));
  papilleG.appendChild(papille);
  formContent.appendChild(papilleG);

  const cathet = optRow('cathet', ['Cathétérisme sélectif voie biliaire', 'Cathétérisme difficile', 'Prékoupé nécessaire', 'Voie pancréatique cannulée']);
  const cathetG = document.createElement('div');
  cathetG.className = 'field-group';
  cathetG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Cathétérisme' }));
  cathetG.appendChild(cathet);
  formContent.appendChild(cathetG);

  formContent.appendChild(sectionTitle('Voies biliaires'));
  const cbp = makeInput('number', 'mm');
  cbp.min = 1; cbp.max = 30;
  formContent.appendChild(fieldGroup('Diamètre de la VBP (mm)', cbp));

  const lithiase = optRow('lithiase', ['Pas de lithiase', 'Calcul unique', 'Calculs multiples', 'Calcul enclavé', 'Calculs extirpés', 'Calculs non extirpés (prothèse)']);
  const lithG = document.createElement('div');
  lithG.className = 'field-group';
  lithG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Lithiase biliaire' }));
  lithG.appendChild(lithiase);
  formContent.appendChild(lithG);

  const stricture = makeInput('textarea', 'Siège, longueur, aspect…');
  formContent.appendChild(fieldGroup('Sténose / Stricture', stricture, true, 'cp_strict'));

  formContent.appendChild(sectionTitle('Gestes thérapeutiques'));
  const gestes = optRow('gestes', [
    'Sphinctérotomie endoscopique', 'Dilatation au ballon',
    'Extraction de calculs (ballon)', 'Extraction de calculs (panier)',
    'Prothèse biliaire plastique', 'Prothèse métallique couverte',
    'Prothèse métallique non couverte', 'Drainage naso-biliaire',
    'Biopsies voies biliaires', 'Brossage cytologique',
  ], true);
  const gestesG = document.createElement('div');
  gestesG.className = 'field-group';
  gestesG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Gestes réalisés' }));
  gestesG.appendChild(gestes);
  formContent.appendChild(gestesG);

  const wirsungOpt = optRow('wirsung', ['Wirsung non opacifié', 'Wirsung normal', 'Dilatation Wirsung', 'Sténose Wirsung', 'Lithiase Wirsung']);
  const wirsungG = document.createElement('div');
  wirsungG.className = 'field-group';
  wirsungG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Canal de Wirsung' }));
  wirsungG.appendChild(wirsungOpt);
  formContent.appendChild(wirsungG);

  formContent.appendChild(sectionTitle('Complications'));
  const complic = optRow('co_comp', ['Aucune complication', 'Pancréatite post-CPRE', 'Saignement sphinctérotomie', 'Perforation', 'Cholangite'], true);
  const complicG = document.createElement('div');
  complicG.className = 'field-group';
  complicG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Complications' }));
  complicG.appendChild(complic);
  formContent.appendChild(complicG);

  formContent.appendChild(sectionTitle('Conclusion'));
  const concl = makeInput('textarea', 'Résumé…');
  formContent.appendChild(fieldGroup('Conclusion', concl, true, 'cp_concl'));

  appendActions(() =>
    `COMPTE RENDU DE CPRE
══════════════════════════════════════════
Patient  : ${$('cp_nom')?.value || '—'}${getAge(pat.dateNaiss, pat.dateExam)}
Date     : ${pat.dateExam.value || new Date().toLocaleDateString('fr-FR')}
Opérateur: ${$('cp_medecin')?.value || '—'}

INDICATION
  ${pat.indic.value || '—'}

PRÉMÉDICATION / MATÉRIEL
  Anesthésie : ${premed.options[premed.selectedIndex]?.text || '—'}
  Endoscope  : ${scope.options[scope.selectedIndex]?.text || '—'}

RÉSULTATS
  Papille         : ${getOptRow(papille) || '—'}
  Cathétérisme    : ${getOptRow(cathet) || '—'}
  VBP diamètre    : ${cbp.value ? cbp.value + ' mm' : '—'}
  Lithiase        : ${getOptRow(lithiase) || '—'}
  Sténose         : ${stricture.value || 'Aucune'}
  Wirsung         : ${getOptRow(wirsungOpt) || '—'}

GESTES RÉALISÉS
  ${getOptRow(gestes) || '—'}

COMPLICATIONS
  ${getOptRow(complic) || '—'}

CONCLUSION
  ${concl.value || '—'}
══════════════════════════════════════════`
  );
}

// ── VIDÉOCAPSULE ──────────────────────────────────────────────
function buildCapsule() {
  const pat = buildPatientInfo('vc');

  formContent.appendChild(sectionTitle('Type de capsule'));
  const typeCap = optRow('type_cap', ['Capsule intestin grêle (Pillcam SB)', 'Capsule colique (Pillcam Colon)', 'Capsule oesophage (Pillcam ESO)', 'Given Endocapsule', 'MiroCam', 'OMOM']);
  const typeCapG = document.createElement('div');
  typeCapG.className = 'field-group';
  typeCapG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Système utilisé' }));
  typeCapG.appendChild(typeCap);
  formContent.appendChild(typeCapG);

  formContent.appendChild(sectionTitle('Préparation'));
  const prepCap = optRow('prep_cap', ['PEG 2L', 'PEG 4L', 'Jeûne seul', 'Simethicone + prokinétique']);
  const prepCapG = document.createElement('div');
  prepCapG.className = 'field-group';
  prepCapG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Préparation' }));
  prepCapG.appendChild(prepCap);
  formContent.appendChild(prepCapG);

  const qualVis = optRow('qual_vis', ['Excellente', 'Bonne', 'Satisfaisante', 'Insuffisante']);
  const qualVisG = document.createElement('div');
  qualVisG.className = 'field-group';
  qualVisG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Qualité de visualisation' }));
  qualVisG.appendChild(qualVis);
  formContent.appendChild(qualVisG);

  formContent.appendChild(sectionTitle('Transit'));
  const tGastrique = makeInput('number', 'min');
  formContent.appendChild(fieldGroup('Temps de transit gastrique (min)', tGastrique));
  const tGrele = makeInput('number', 'min');
  formContent.appendChild(fieldGroup('Temps de transit intestin grêle (min)', tGrele));
  const excretion = optRow('excret', ['Excrétion dans les délais', 'Capsule non excrétée dans le délai', 'Rétention capsule']);
  const excretG = document.createElement('div');
  excretG.className = 'field-group';
  excretG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Excrétion' }));
  excretG.appendChild(excretion);
  formContent.appendChild(excretG);

  formContent.appendChild(sectionTitle('Résultats'));
  const oe = makeInput('textarea', 'Oesophage : aspect…');
  formContent.appendChild(fieldGroup('Oesophage', oe, true, 'vc_oe'));
  const estomac = makeInput('textarea', 'Estomac : aspect…');
  formContent.appendChild(fieldGroup('Estomac', estomac, true, 'vc_estomac'));

  const lesions = optRow('vc_lesions', [
    'Aucune lésion identifiée', 'Saignement actif', 'Angiectasies (angioectasies)',
    'Ulcérations', 'Érosions', 'Polype / tumeur', 'Diverticule de Meckel',
    'Maladie de Crohn (ulcérations aphtoïdes)', 'AINS-entéropathie', 'Lymphangiectasies',
  ], true);
  const lesionsG = document.createElement('div');
  lesionsG.className = 'field-group';
  lesionsG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Lésions identifiées' }));
  lesionsG.appendChild(lesions);
  formContent.appendChild(lesionsG);

  const localLesion = makeInput('textarea', 'Localisation, taille, aspect…');
  formContent.appendChild(fieldGroup('Détail des lésions', localLesion, true, 'vc_detail'));

  formContent.appendChild(sectionTitle('Scores'));
  const scoreType = optRow('score_type', ['Score de Lewis', 'CECDAI', 'Non calculé']);
  const scoreTypeG = document.createElement('div');
  scoreTypeG.className = 'field-group';
  scoreTypeG.appendChild(Object.assign(document.createElement('label'), { className: 'field-label', textContent: 'Score activité' }));
  scoreTypeG.appendChild(scoreType);
  formContent.appendChild(scoreTypeG);

  const scoreVal = makeInput('number', 'Valeur numérique');
  formContent.appendChild(fieldGroup('Valeur du score', scoreVal));

  formContent.appendChild(sectionTitle('Conclusion'));
  const concl = makeInput('textarea', 'Résumé…');
  formContent.appendChild(fieldGroup('Conclusion', concl, true, 'vc_concl'));

  appendActions(() =>
    `COMPTE RENDU DE VIDÉOCAPSULE ENDOSCOPIQUE
══════════════════════════════════════════
Patient  : ${$('vc_nom')?.value || '—'}${getAge(pat.dateNaiss, pat.dateExam)}
Date     : ${pat.dateExam.value || new Date().toLocaleDateString('fr-FR')}
Opérateur: ${$('vc_medecin')?.value || '—'}

INDICATION
  ${pat.indic.value || '—'}

TYPE DE CAPSULE
  ${getOptRow(typeCap) || '—'}

PRÉPARATION
  ${getOptRow(prepCap) || '—'}
  Qualité de visualisation : ${getOptRow(qualVis) || '—'}

TRANSIT
  Temps gastrique       : ${tGastrique.value ? tGastrique.value + ' min' : '—'}
  Temps intestin grêle  : ${tGrele.value ? tGrele.value + ' min' : '—'}
  Excrétion             : ${getOptRow(excretion) || '—'}

RÉSULTATS
  Oesophage  : ${oe.value || 'Normal'}
  Estomac    : ${estomac.value || 'Normal'}
  Lésions    : ${getOptRow(lesions) || '—'}
  Détail     : ${localLesion.value || '—'}

SCORE D'ACTIVITÉ
  ${getOptRow(scoreType) || '—'}${scoreVal.value ? ' : ' + scoreVal.value : ''}

CONCLUSION
  ${concl.value || '—'}
══════════════════════════════════════════`
  );
}

// ── Actions bar ───────────────────────────────────────────────
function appendActions(generateFn) {
  const div = document.createElement('div');
  div.className = 'actions';

  const btnGen = document.createElement('button');
  btnGen.type = 'button';
  btnGen.className = 'btn-primary';
  btnGen.innerHTML = '📄 Générer';
  btnGen.addEventListener('click', () => {
    const text = generateFn();
    reportOut.textContent = text;
    reportOut.classList.add('visible');
    reportOut.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const btnCopy = document.createElement('button');
  btnCopy.type = 'button';
  btnCopy.className = 'btn-secondary';
  btnCopy.innerHTML = '📋 Copier';
  btnCopy.addEventListener('click', () => {
    if (!reportOut.textContent) { const t = generateFn(); reportOut.textContent = t; reportOut.classList.add('visible'); }
    navigator.clipboard.writeText(reportOut.textContent).then(() => showToast('Copié dans le presse-papiers ✓'));
  });

  div.appendChild(btnGen);
  div.appendChild(btnCopy);
  formContent.appendChild(div);

  const btnShare = document.createElement('button');
  btnShare.type = 'button';
  btnShare.style.cssText = 'width:100%;padding:12px;margin-bottom:8px;border-radius:10px;border:none;background:#fff;color:var(--blue-dark);border:2px solid var(--blue-pale);font-size:0.9rem;font-weight:600;cursor:pointer;';
  btnShare.innerHTML = '📤 Partager (SMS / Email / Notes)';
  btnShare.addEventListener('click', () => {
    const text = reportOut.textContent || generateFn();
    if (!reportOut.textContent) { reportOut.textContent = text; reportOut.classList.add('visible'); }
    if (navigator.share) {
      navigator.share({ title: 'Compte rendu endoscopie', text }).catch(() => {});
    } else {
      showToast('Partage non disponible — utilisez Copier');
    }
  });
  formContent.appendChild(btnShare);
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Builders map ──────────────────────────────────────────────
const builders = { colo: buildColo, fogd: buildFogd, cpre: buildCpre, capsule: buildCapsule };

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSpeech();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
