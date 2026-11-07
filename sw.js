// This app no longer uses an offline worker. If an older copy is still installed
// on a phone, this version removes itself and its saved files, then reloads the page.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const wins = await self.clients.matchAll({ type: 'window' });
    wins.forEach(w => { try { w.navigate(w.url); } catch (err) {} });
  })());
});
