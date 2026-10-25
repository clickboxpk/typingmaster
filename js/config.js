/* ============================================================
   PSDC Typing Master - SETTINGS (yahan sirf apni values bharni hain)
   ============================================================ */
window.PSDC_CONFIG = {

  /* Aapki site ka asli link (sitemap, share card aur SEO ke liye) */
  siteUrl: "https://clickboxpk.github.io/typingmaster/",

  /* Firebase (free) - Online Arena ke liye. Setup README.md me likha hai.
     Khali chhorenge to Arena me sirf "Practice vs Bots" chalega. */
  firebase: {
    apiKey: "AIzaSyCN4MwLKeuEEHhfL4tYq08rwvJ3XiB6guA",
    authDomain: "typingmasterfree.firebaseapp.com",
    databaseURL: "https://typingmasterfree-default-rtdb.firebaseio.com",
    projectId: "typingmasterfree",
    appId: "1:183298628148:web:9349e497bfcc20ce8f0861"
  },

  /* Adsterra: dashboard se "Get Code" karke key aur script link yahan paste karein.
     enabled:true karte hi ads lag jayenge. */
  ads: {
    enabled: false,
    /* Banner 728x90 (desktop) - Adsterra "Banner" format */
    banner728: { key: "", src: "" },   /* src example: "https://www.highperformanceformat.com/KEY/invoke.js" */
    /* Banner 320x50 (mobile) */
    banner320: { key: "", src: "" },
    /* Optional: Social Bar / Popunder jaisa single script link (Adsterra code me jo src ho) */
    socialBar: ""
  }
};
