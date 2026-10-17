/*
 * config.js — Fix My Itch, USA edition
 * -------------------------------------
 * Connects the "Share your itch" form to a Supabase table so submissions
 * are saved and shown to everyone, instead of living only in the
 * submitter's browser.
 *
 * Leave these blank and the site still works: the form falls back to a
 * local preview that plainly tells the submitter it was not sent anywhere.
 *
 * BOTH VALUES BELOW ARE PUBLIC BY DESIGN. The anon key is meant to ship in
 * client code; row-level security (see README) is what actually restricts
 * what it can do. NEVER put the service_role key here — it bypasses every
 * policy and this file is served to every visitor.
 *
 * Setup instructions and the SQL to run are in README.md.
 */
window.FMI_CONFIG = {
  // e.g. "https://abcdefghijklm.supabase.co"
  SUPABASE_URL: "",

  // The "anon public" key from Settings -> API Keys
  SUPABASE_ANON_KEY: "",

  // Table holding community submissions.
  TABLE: "itches"
};
