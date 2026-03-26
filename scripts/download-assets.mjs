import { writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';

const BASE = 'public';

const assets = {
  images: [
    { url: 'https://framerusercontent.com/images/AuVIGpFzzBAoBiybNZrhTerw9Q.png', name: 'hero-canvas.png' },
    { url: 'https://framerusercontent.com/images/112QIEjU8gGF6cZR9LStXSFo9No.png', name: 'icon-small-1.png' },
    { url: 'https://framerusercontent.com/images/LaQ6HFt6vou1m4B0lxuFvMrjejI.png', name: 'icon-small-2.png' },
    { url: 'https://framerusercontent.com/images/FbK4skNVaLbFOBb9o3fZwvGg.png', name: 'icon-avatar.png' },
    { url: 'https://framerusercontent.com/images/efzm9M2bCUbzflNf30Pae0Zok.png', name: 'compliance-badge-1.png' },
    { url: 'https://framerusercontent.com/images/0JaQt1nJIe9Q9gb36FI5FCL6294.png', name: 'compliance-badge-2.png' },
    { url: 'https://framerusercontent.com/images/JzAtye6KqSq5YZSsP004hXgBSY.png', name: 'compliance-badge-3.png' },
  ],
  videos: [
    { url: 'https://framerusercontent.com/assets/chRFmBq9ayObGUcObGO5vqKAVQ.mp4', name: 'hero-video.mp4' },
  ],
  fonts: [
    { url: 'https://framerusercontent.com/assets/sBy4myG53smtCDd31r7wiZCSqX8.woff2', name: 'EmilioLight.woff2' },
    { url: 'https://framerusercontent.com/assets/xc09FYbZCwJGTgSkkYF85XO6LVQ.woff2', name: 'EmilioRegular.woff2' },
    { url: 'https://framerusercontent.com/assets/31g1ax61IR5fvCayTwXQyq69EZc.woff2', name: 'EmilioSemibold.woff2' },
    { url: 'https://framerusercontent.com/assets/5gyh90sizT7zuGcWB8UHjZXd3c.woff', name: 'EmilioLight.woff' },
    { url: 'https://framerusercontent.com/assets/Ipw7oud9mVSfmkh7kHGMm892Q4.woff', name: 'EmilioRegular.woff' },
  ],
  favicons: [
    { url: 'https://framerusercontent.com/images/6DMMmv1qq90IndBZJRLHvvJHmE.png', name: 'favicon.png' },
    { url: 'https://framerusercontent.com/images/ZDkGj2vNNwQw0ZrzWrnGeDg.png', name: 'favicon-alt.png' },
    { url: 'https://framerusercontent.com/images/A0yYH5sFzbWdsYme1utMvbVQow.png', name: 'og-image.png' },
  ],
};

async function download(url, filePath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const dir = dirname(filePath);
    await mkdir(dir, { recursive: true });
    await writeFile(filePath, buffer);
    console.log(`✓ ${filePath}`);
  } catch (e) {
    console.error(`✗ ${url}: ${e.message}`);
  }
}

async function run() {
  const tasks = [];

  for (const img of assets.images) {
    tasks.push(download(img.url, join(BASE, 'images', img.name)));
  }
  for (const vid of assets.videos) {
    tasks.push(download(vid.url, join(BASE, 'videos', vid.name)));
  }
  for (const font of assets.fonts) {
    tasks.push(download(font.url, join(BASE, 'fonts', font.name)));
  }
  for (const fav of assets.favicons) {
    tasks.push(download(fav.url, join(BASE, 'seo', fav.name)));
  }

  // Process 4 at a time
  for (let i = 0; i < tasks.length; i += 4) {
    await Promise.all(tasks.slice(i, i + 4));
  }

  console.log('\nDone!');
}

run();
