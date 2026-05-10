// Configuration for wedding website
// Sensitive URLs are loaded from environment variables for security

export const config = {
  // Contact & RSVP
  rsvpFormUrl:
    import.meta.env.VITE_RSVP_FORM_URL ||
    "https://docs.google.com/forms/d/e/1FAIpQLSd5SC31tZzlzRKC7bJ6_8TX7mTOZU26mXNrd7l4cpNc0Q8F-Q/viewform?usp=publish-editor",
  googleMapsLocation:
    import.meta.env.VITE_GOOGLE_MAPS_LOCATION ||
    "https://maps.app.goo.gl/k5Bjt9T52PRJZjfV6",

  // Contact Information
  contactPhone1: import.meta.env.VITE_CONTACT_PHONE_1 || "0715217746",
  contactPhone2: import.meta.env.VITE_CONTACT_PHONE_2 || "0702808136",
  contactName1: import.meta.env.VITE_CONTACT_NAME_1 || "Deepal",
  contactName2: import.meta.env.VITE_CONTACT_NAME_2 || "Saman",

  // Wedding Details
  weddingDate: import.meta.env.VITE_WEDDING_DATE || "Thursday, 25th June 2026",
  ceremonyTime:
    import.meta.env.VITE_CEREMONY_TIME || "Poruwa Ceremony Begins at 10.00 AM",
  venueName: import.meta.env.VITE_VENUE_NAME || "Tangerine Beach Hotel",
  venueAddress:
    import.meta.env.VITE_VENUE_ADDRESS || "De Abrew Road, Waskaduwa",

  // Bride & Groom Names
  brideName: import.meta.env.VITE_BRIDE_NAME || "Rishitha",
  groomName: import.meta.env.VITE_GROOM_NAME || "Gihani",
};

// Security: Validate external URLs
export const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    // Only allow https for external links
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
};

// Performance: Memoize expensive operations
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
