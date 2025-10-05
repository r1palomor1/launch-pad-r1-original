// Robust vendor fetcher updated to try creations-sdk/plugin-demo raw paths first,
// then other repo locations, then local sibling clones.

const https = require('https');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'vendor');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const ORG = 'rabbit-hmi-oss';
const REPOS = [
  'creations-sdk',
  'rabbit-hmi-oss',
  'community-wiki',
  'firmware'
];

// Candidate raw locations to try (ordered)
const RAW_BASE = name => [
  // explicit plugin-demo location you mentioned (creations-sdk/plugin-demo)
  `https://raw.githubusercontent.com/${ORG}/creations-sdk/main/plugin-demo/${name}`,
  `https://raw.githubusercontent.com/${ORG}/creations-sdk/main/plugin-demo/dist/${name}`,
  `https://raw.githubusercontent.com/${ORG}/creations-sdk/main/plugin-demo/build/${name}`,
  // general creations-sdk top-level
  `https://raw.githubusercontent.com/${ORG}/creations-sdk/main/${name}`,
  `https://raw.githubusercontent.com/${ORG}/creations-sdk/main/dist/${name}`,
  // rabbit-hmi-oss repo
  `https://raw.githubusercontent.com/${ORG}/rabbit-hmi-oss/main/${name}`,
  `https://raw.githubusercontent.com/${ORG}/rabbit-hmi-oss/main/dist/${name}`,
  `https://raw.githubusercontent.com/${ORG}/rabbit-hmi-oss/main/build/${name}`
];

// Local sibling candidate paths (relative to project)
const LOCAL_CANDIDATES = {
  'hmi.js': [
    path.join('..', 'rabbit-hmi-oss', 'hmi.js'),
    path.join('..', 'rabbit-hmi-oss', 'dist', 'hmi.js'),
    path.join('..', 'rabbit-hmi-oss', 'build', 'hmi.js')
  ],
  'hmi.css': [
    path.join('..', 'rabbit-hmi-oss', 'hmi.css'),
    path.join('..', 'rabbit-hmi-oss', 'dist', 'hmi.css')
  ],
  'logo.svg': [
    path.join('..', 'rabbit-hmi-oss', 'logo.svg'),
    path.join('..', 'rabbit-hmi-oss', 'assets', 'logo.svg')
  ],
  'sdk.js': [
    path.join('..', 'creations-sdk', 'plugin-demo', 'sdk.js'),
    path.join('..', 'creations-sdk', 'sdk.js'),
    path.join('..', 'creations-sdk', 'dist', 'sdk.js')
  ],
  'sdk.css': [
    path.join('..', 'creations-sdk', 'plugin-demo', 'sdk.css'),
    path.join('..', 'creations-sdk', 'sdk.css'),
    path.join('..', 'creations-sdk', 'dist', 'sdk.css')
  ]
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(dest); } catch {}
        return reject(new Error(`status:${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      try { fs.unlinkSync(dest); } catch {}
      reject(err);
    });
  });
}

async function tryRawList(name) {
  const urls = RAW_BASE(name);
  for (const url of urls) {
    try {
      await download(url, path.join(outDir, name));
      console.log(`Fetched ${name} from ${url}`);
      return true;
    } catch (e) {
      // continue
    }
  }
  return false;
}

function tryLocal(name) {
  const list = LOCAL_CANDIDATES[name] || [];
  for (const rel of list) {
    const src = path.join(__dirname, '..', rel);
    if (fs.existsSync(src)) {
      try {
        fs.copyFileSync(src, path.join(outDir, name));
        console.log(`Copied ${name} from local ${src}`);
        return true;
      } catch (e) {
        // continue
      }
    }
  }
  return false;
}

(async () => {
  console.log('Fetching vendor files into', outDir);
  const needed = ['hmi.js','hmi.css','sdk.js','sdk.css','logo.svg'];
  for (const name of needed) {
    const dest = path.join(outDir, name);
    try { if (fs.existsSync(dest)) fs.unlinkSync(dest); } catch {}
    let ok = false;
    try { ok = await tryRawList(name); } catch(e){ ok = false; }
    if (!ok) ok = tryLocal(name);
    if (!ok) console.warn(`Could not obtain ${name}; please copy it into ${outDir} manually.`);
  }
  console.log('Done. Verify vendor/ contains hmi.js hmi.css sdk.js sdk.css logo.svg');
})();