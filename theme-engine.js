// Full Stage 6 theme engine (kept from Stage 5) — used by script.js

const defaultTheme = {
  name: 'Rabbit',
  dark: {
    '--primary-color': '#ff7043',
    '--secondary-color': '#ff7043',
    '--bg-color': '#000000',
    '--header-bg-color': '#000000',
    '--item-bg': '#1c1c1c',
    '--item-bg-hover': '#2c2c2c',
    '--border-color': '#2a2a2a',
    '--font-color': '#e0e0e0',
    '--icon-color': '#7a7a7a',
    '--button-font-color': '#FFFFFF'
  },
  light: {
    '--primary-color': '#ff7043',
    '--secondary-color': '#ff7043',
    '--bg-color': '#f9f9f9',
    '--header-bg-color': '#f9f9f9',
    '--item-bg': '#ffffff',
    '--item-bg-hover': '#f0f0f0',
    '--border-color': '#e0e0e0',
    '--font-color': '#1c1c1c',
    '--icon-color': '#5c5c5c',
    '--button-font-color': '#FFFFFF'
  }
};

function colorNameToRgb(input) {
  if (!input) return null;
  if (Array.isArray(input) && input.length === 3) return input.map(v => Math.round(v));
  const s = String(input).trim();
  if (s[0] === '#') {
    let hex = s.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length !== 6) return null;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return [r, g, b];
  }
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = s;
    const v = ctx.fillStyle;
    if (v[0] === '#') return colorNameToRgb(v);
    const m = v.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (m) return [parseInt(m[1],10), parseInt(m[2],10), parseInt(m[3],10)];
  } catch (e) {}
  return null;
}

function rgbToHsl(r, g, b) {
  r/=255; g/=255; b/=255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h=0, s=0, l=(max+min)/2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h*360), +(s*100).toFixed(1), +(l*100).toFixed(1)];
}

function hslToRgb(h, s, l) {
  h = h/360; s = s/100; l = l/100;
  if (s === 0) {
    const v = Math.round(l*255);
    return [v,v,v];
  }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue2rgb(p,q,h + 1/3) * 255);
  const g = Math.round(hue2rgb(p,q,h) * 255);
  const b = Math.round(hue2rgb(p,q,h - 1/3) * 255);
  return [r,g,b];
}

function applyModifierToHsl([h,s,l], modifier) {
  if (!modifier) return [h,s,l];
  switch(modifier) {
    case 'vibrant': s = Math.min(100, s * 1.25); l = Math.max(10, l * 0.95); break;
    case 'pastel': s = Math.max(10, s * 0.6); l = Math.min(95, l * 1.08); break;
    case 'neon': s = Math.min(100, s * 1.6); l = Math.min(70, l * 1.05); break;
    case 'bold': s = Math.min(100, s * 1.4); l = Math.max(8, l * 0.9); break;
    default: break;
  }
  return [Math.round(h), +s.toFixed(1), +l.toFixed(1)];
}

function getLuminance([r,g,b]) {
  const srgb = [r/255, g/255, b/255].map(c => {
    return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function getContrast(rgb1, rgb2) {
  const L1 = getLuminance(rgb1) + 0.05;
  const L2 = getLuminance(rgb2) + 0.05;
  return Math.max(L1, L2) / Math.min(L1, L2);
}

function generatePaletteFromRgb(rgb, mode = 'dark', modifier = null) {
  if (!rgb || rgb.length !== 3) return null;
  let [h,s,l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  [h,s,l] = applyModifierToHsl([h,s,l], modifier);
  const primaryRgb = hslToRgb(h, s, l);
  let bgRgb = mode === 'light' ? [250,250,250] : [8,8,8];
  const itemRgb = mode === 'light' ? [255,255,255] : hslToRgb(h, Math.max(6, s*0.12), Math.min(18, l*0.6));
  const hoverRgb = mode === 'light' ? [245,245,245] : hslToRgb(h, Math.max(6, s*0.15), Math.min(28, l*0.75));
  const fontRgb = getContrast(primaryRgb, bgRgb) > 3.5 ? [230,230,230] : (mode === 'light' ? [28,28,28] : [230,230,230]);
  const borderRgb = mode === 'light' ? [224,224,224] : [34,34,34];
  const iconRgb = mode === 'light' ? [92,92,92] : [122,122,122];

  const toHex = (a) => '#'+a.map(v => v.toString(16).padStart(2,'0')).join('');
  return {
    '--primary-color': toHex(primaryRgb.map(v=>Math.round(v))),
    '--secondary-color': toHex(primaryRgb.map(v=>Math.round(Math.max(0, Math.min(255, v*0.85))))),
    '--bg-color': toHex(bgRgb),
    '--header-bg-color': toHex(bgRgb),
    '--item-bg': toHex(itemRgb.map(v=>Math.round(v))),
    '--item-bg-hover': toHex(hoverRgb.map(v=>Math.round(v))),
    '--border-color': toHex(borderRgb),
    '--font-color': toHex(fontRgb),
    '--icon-color': toHex(iconRgb),
    '--button-font-color': '#ffffff'
  };
}