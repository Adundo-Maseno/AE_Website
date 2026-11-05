const fs = require('fs');
const https = require('https');

const EN_PATH = 'messages/en.json';
const FR_PATH = 'messages/fr.json';
const CACHE_PATH = '.translation-cache.json';

// Utility to make requests to Google Translate Free API
async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string') return text;
  
  return new Promise((resolve, reject) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          let translated = '';
          if (parsed && parsed[0]) {
            parsed[0].forEach(item => {
              if (item[0]) translated += item[0];
            });
          }
          resolve(translated || text);
        } catch (e) {
          resolve(text); // Fallback
        }
      });
    }).on('error', (e) => {
      resolve(text); // Fallback
    });
  });
}

// Deep clone a JS object
const clone = (obj) => JSON.parse(JSON.stringify(obj));

async function main() {
  console.log('Starting auto-translation...');
  
  const enData = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));
  const frData = fs.existsSync(FR_PATH) ? JSON.parse(fs.readFileSync(FR_PATH, 'utf8')) : {};
  const cache = fs.existsSync(CACHE_PATH) ? JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) : {};
  
  let changesMade = false;

  async function traverseAndTranslate(enObj, frObj, cacheObj, path = '') {
    for (const key in enObj) {
      const currentPath = path ? `${path}.${key}` : key;
      const enValue = enObj[key];
      
      if (typeof enValue === 'object' && enValue !== null) {
        if (!frObj[key]) frObj[key] = {};
        if (!cacheObj[key]) cacheObj[key] = {};
        await traverseAndTranslate(enValue, frObj[key], cacheObj[key], currentPath);
      } else {
        // If it's a string, check if it changed or is missing
        const cachedValue = cacheObj[key];
        
        if (frObj[key] === undefined || cachedValue !== enValue) {
          console.log(`Translating: ${currentPath}`);
          try {
            const translated = await translateText(enValue, 'fr');
            frObj[key] = translated;
            cacheObj[key] = enValue;
            changesMade = true;
            // Sleep to avoid rate limiting
            await new Promise(r => setTimeout(r, 200));
          } catch (e) {
            console.error(`Failed to translate ${currentPath}`);
          }
        }
      }
    }
  }

  await traverseAndTranslate(enData, frData, cache);

  if (changesMade) {
    fs.writeFileSync(FR_PATH, JSON.stringify(frData, null, 2));
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
    console.log('Translations updated successfully!');
  } else {
    console.log('No changes needed. Translations are up to date.');
  }
}

main().catch(console.error);
