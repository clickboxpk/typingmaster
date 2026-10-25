# PSDC Typing Master - Setup Guide (Roman Urdu)

## Files
- `index.html` - sirf structure + SEO
- `css/style.css`, `css/arena.css` - styling
- `js/app.js` - lessons + games, `js/multiplayer.js` - Online Arena, `js/ads.js` - Adsterra
- `js/config.js` - **yahan apni settings bharni hain** (link, Firebase, Adsterra)
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `assets/` - SEO files
- `database.rules.json` - Firebase security rules

## 1) Site ka link badlein (zaroori)
`YOUR-USERNAME.github.io/YOUR-REPO/` ko apne asli link se in files me replace karein:
`index.html` (canonical, og:url, og:image, JSON-LD), `robots.txt`, `sitemap.xml`, `js/config.js` (siteUrl).
(VS Code me Ctrl+Shift+H se sab jagah ek sath replace ho jata hai.)

## 2) Online Arena ke liye Firebase (free, 10 minute)
1. https://console.firebase.google.com par project banayein.
2. **Build > Authentication > Sign-in method > Anonymous** enable karein.
3. **Build > Realtime Database > Create database** (koi bhi location).
4. Realtime Database ke **Rules** tab me `database.rules.json` ka content paste karke Publish karein.
5. **Project settings > General > Your apps > Web (</>)** me app banayein; jo `firebaseConfig` mile uski values `js/config.js` ke `firebase` section me paste karein (`databaseURL` zaroor).
6. Authentication > Settings > Authorized domains me `YOUR-USERNAME.github.io` add karein.

Firebase config key public hoti hai (yeh normal hai) - security rules se mehfooz rehta hai.
Free plan (Spark) chhoti class/centre ke liye kaafi hai.

## 3) Adsterra ads
1. Adsterra publisher account me apni site add karein aur approve hone dein.
2. **Banner 728x90** aur **Banner 320x50** ke code lein. Code me `key` aur `invoke.js` ka link hota hai.
3. `js/config.js` me `ads.enabled:true` karein aur key/src paste karein.
4. Social Bar chahiye to uska script link `socialBar` me daalein.

Ads sirf page ke upar aur neeche aati hain, game/race ke beech me nahi (user experience aur policy dono ke liye behtar).
Khud apni ads par click na karein - account ban ho sakta hai.

## 4) SEO ke baad ke kaam
- Google Search Console me site add karein aur `sitemap.xml` submit karein.
- Bing Webmaster Tools me bhi yahi karein.
- Site ka link WhatsApp groups, school/centre pages aur social media par share karein (backlinks se ranking behtar hoti hai).
- GitHub me custom domain (jaise `psdctyping.com`) lagane se ranking aur bharosa dono behtar hote hain.

## Note: security
Browser me chalne wala HTML/CSS/JS hamesha dekha ja sakta hai; files alag karne se woh chhupta nahi, bas organized aur fast load hota hai.
Asli hifazat server-side rules se hoti hai (Firebase rules). Chaho to deploy se pehle JS ko minify kar sakte ho (`npx terser js/app.js -c -m -o js/app.min.js`).
