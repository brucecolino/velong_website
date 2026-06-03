/* ===========================================================================
   VÉLONG · COLOR FINDER
   Camera → Canvas → CIE Lab color matching → 3 product recommendations
   Zero dependencies. Privacy-first (all processing in-browser).
   =========================================================================== */

(function () {
  'use strict';

  var IMG_BASE = 'colors/';

  var VELONG_PALETTE = [
    { name: 'Nero Profondo',    hex: '#1A1410', slug: 'nero-profondo',    image: IMG_BASE + 'nero-profondo.png' },
    { name: 'Castano Scuro',    hex: '#2A1A10', slug: 'castano-scuro',    image: IMG_BASE + 'castano-scuro.png' },
    { name: 'Castano Caldo',    hex: '#5C3826', slug: 'castano-caldo',    image: IMG_BASE + 'castano-caldo.png' },
    { name: 'Castano Miele',    hex: '#7A4E2E', slug: 'castano-miele',    image: IMG_BASE + 'castano-miele.png' },
    { name: 'Caramello',        hex: '#9A6B3E', slug: 'caramello',        image: IMG_BASE + 'caramello.png' },
    { name: 'Bronzo',           hex: '#B8814A', slug: 'bronzo',           image: IMG_BASE + 'bronzo.png' },
    { name: 'Biondo Miele',     hex: '#C9A258', slug: 'biondo-miele',     image: IMG_BASE + 'biondo-miele.png' },
    { name: 'Biondo Champagne', hex: '#D4BC8E', slug: 'biondo-champagne', image: IMG_BASE + 'biondo-champagne.png' },
    { name: 'Biondo Platino',   hex: '#E8DAB8', slug: 'biondo-platino',   image: IMG_BASE + 'biondo-platino.png' },
    { name: 'Rosso Rame',       hex: '#9B4A2A', slug: 'rosso-rame',       image: IMG_BASE + 'rosso-rame.png' },
    { name: 'Mogano',           hex: '#6F3325', slug: 'mogano',           image: IMG_BASE + 'mogano.png' }
  ];

  function hexToRgb(hex) {
    var h = hex.replace('#', '');
    return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
  }
  function rgbToHex(r, g, b) {
    function h(v) { return Math.round(v).toString(16).padStart(2,'0'); }
    return '#' + h(r) + h(g) + h(b);
  }
  function rgbToLab(r, g, b) {
    function lin(c) { c /= 255; return c > 0.04045 ? Math.pow((c+0.055)/1.055, 2.4) : c/12.92; }
    var R = lin(r), G = lin(g), B = lin(b);
    var x = (R*0.4124564 + G*0.3575761 + B*0.1804375) / 0.95047;
    var y = (R*0.2126729 + G*0.7151522 + B*0.0721750) / 1.00000;
    var z = (R*0.0193339 + G*0.1191920 + B*0.9503041) / 1.08883;
    function f(t) { return t > 0.008856 ? Math.cbrt(t) : 7.787*t + 16/116; }
    var fx=f(x), fy=f(y), fz=f(z);
    return { L: 116*fy-16, a: 500*(fx-fy), b: 200*(fy-fz) };
  }
  function labDistance(a, b) {
    return Math.sqrt(Math.pow(a.L-b.L,2) + Math.pow(a.a-b.a,2) + Math.pow(a.b-b.b,2));
  }

  var paletteLab = VELONG_PALETTE.map(function (c) {
    var rgb = hexToRgb(c.hex);
    return Object.assign({}, c, { rgb: rgb, lab: rgbToLab(rgb.r, rgb.g, rgb.b) });
  });

  function extractDominantColor(canvas) {
    var ctx = canvas.getContext('2d', { willReadFrequently: true });
    var w = canvas.width, h = canvas.height;
    var sx = Math.floor(w*.2), sy = Math.floor(h*.15);
    var sw = Math.floor(w*.6), sh = Math.floor(h*.55);
    var data = ctx.getImageData(sx, sy, sw, sh).data;
    var buckets = {};
    for (var i = 0; i < data.length; i += 4*6) {
      var r=data[i], g=data[i+1], b=data[i+2], a=data[i+3];
      if (a < 200) continue;
      var lum = 0.299*r + 0.587*g + 0.114*b;
      if (lum > 220 || lum < 15) continue;
      if (r>g && g>b && (r-b)<60 && r>150 && r<230) continue;
      var key = (r>>3)+','+(g>>3)+','+(b>>3);
      if (!buckets[key]) buckets[key] = { sumR:0,sumG:0,sumB:0,count:0 };
      buckets[key].sumR+=r; buckets[key].sumG+=g; buckets[key].sumB+=b; buckets[key].count++;
    }
    var top=null, topC=0;
    Object.keys(buckets).forEach(function(k){
      if (buckets[k].count > topC) { topC=buckets[k].count; top=buckets[k]; }
    });
    if (!top) return { r:92, g:56, b:38 };
    return { r:top.sumR/top.count, g:top.sumG/top.count, b:top.sumB/top.count };
  }

  function findTopMatches(rgb, n) {
    var lab = rgbToLab(rgb.r, rgb.g, rgb.b);
    var scored = paletteLab.map(function(c){ return Object.assign({},c,{distance:labDistance(lab,c.lab)}); });
    scored.sort(function(a,b){ return a.distance-b.distance; });
    var maxD = 60;
    return scored.slice(0, n||3).map(function(c){
      return Object.assign({},c,{similarity: Math.round(Math.max(0,Math.min(100,100-(c.distance/maxD)*100)))});
    });
  }

  function init() {
    var root = document.querySelector('[data-velong-cf]');
    if (!root) return;

    var video      = root.querySelector('[data-velong-cf-video]');
    var canvas     = root.querySelector('[data-velong-cf-canvas]');
    var resultImg  = root.querySelector('[data-velong-cf-result-img]');
    var startBtn   = root.querySelector('[data-velong-cf-start]');
    var captureBtn = root.querySelector('[data-velong-cf-capture]');
    var retryBtn   = root.querySelector('[data-velong-cf-retry]');
    var fileInput  = root.querySelector('[data-velong-cf-file]');
    var detectedSw = root.querySelector('[data-velong-cf-detected-swatch]');
    var detectedHex= root.querySelector('[data-velong-cf-detected-hex]');
    var matchesGrid= root.querySelector('[data-velong-cf-matches]');
    var errorBox   = root.querySelector('[data-velong-cf-error]');
    var stage      = root.querySelector('.velong-cf__stage');

    var stream = null;

    function showError(msg) { if (errorBox) errorBox.textContent=msg; root.classList.add('has-error'); }
    function clearError()   { root.classList.remove('has-error'); if (errorBox) errorBox.textContent=''; }

    function stopStream() {
      if (stream) { stream.getTracks().forEach(function(t){t.stop();}); stream=null; }
      root.classList.remove('is-streaming');
      if (stage) stage.hidden = true;
    }
    function reset() {
      stopStream();
      root.classList.remove('is-result','has-error');
      if (matchesGrid) matchesGrid.innerHTML='';
    }

    function processCanvas() {
      var rgb = extractDominantColor(canvas);
      var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      if (detectedSw)  detectedSw.style.setProperty('--detected-color', hex);
      if (detectedHex) detectedHex.textContent = hex.toUpperCase();
      var matches = findTopMatches(rgb, 3);
      if (matchesGrid) {
        var rankLabels = ['Best Match', '2° Match', '3° Match'];
        matchesGrid.innerHTML = matches.map(function(m,i){
          return [
            '<a class="velong-cf__match' + (i===0 ? ' velong-cf__match--best' : '') + '" href="index.php?route=product/search&search=' + encodeURIComponent(m.slug) + '">',
              '<span class="velong-cf__match-rank">' + rankLabels[i] + '</span>',
              '<img class="velong-cf__match-image" src="' + m.image + '" alt="' + m.name + '" loading="lazy">',
              '<p class="velong-cf__match-name">' + m.name + '</p>',
              '<span class="velong-cf__match-similarity">' + m.similarity + '% similarità</span>',
              '<span class="velong-cf__match-cta">Acquista</span>',
            '</a>'
          ].join('');
        }).join('');
      }
      if (resultImg) resultImg.src = canvas.toDataURL('image/jpeg', 0.85);
      stopStream();
      root.classList.add('is-result');
    }

    if (startBtn) {
      startBtn.addEventListener('click', function () {
        clearError();
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          showError('La fotocamera non è disponibile. Usa "Carica una foto".');
          return;
        }
        navigator.mediaDevices.getUserMedia({ video:{facingMode:'user',width:{ideal:1280},height:{ideal:960}}, audio:false })
          .then(function(s){ stream=s; video.srcObject=s; video.play(); root.classList.add('is-streaming'); root.classList.remove('is-result'); if(stage) stage.hidden=false; })
          .catch(function(){ showError('Accesso fotocamera negato. Puoi caricare una foto invece.'); });
      });
    }

    if (captureBtn) {
      captureBtn.addEventListener('click', function(){
        if (!video.videoWidth) return;
        canvas.width=video.videoWidth; canvas.height=video.videoHeight;
        canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);
        processCanvas();
      });
    }

    if (retryBtn) retryBtn.addEventListener('click', reset);

    if (fileInput) {
      fileInput.addEventListener('change', function(e){
        clearError();
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        var img = new Image();
        img.onload = function(){
          canvas.width=img.naturalWidth; canvas.height=img.naturalHeight;
          canvas.getContext('2d').drawImage(img,0,0);
          processCanvas();
        };
        img.onerror = function(){ showError('Impossibile caricare l\'immagine.'); };
        img.src = URL.createObjectURL(file);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.VelongColorFinder = { palette: VELONG_PALETTE, paletteLab: paletteLab };
})();

