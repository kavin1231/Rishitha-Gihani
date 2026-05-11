// Configuration for wedding website
// Sensitive URLs are loaded from environment variables for security

export const config = {
  // Cloudinary media
  media: {
    introVideo:
      "https://res.cloudinary.com/dagiis3pz/video/upload/f_auto,q_auto:eco,w_960/v1778466763/counting2_jdd8ed.mp4",
    backgroundMusic:
      "https://res.cloudinary.com/dagiis3pz/video/upload/v1778466790/alex-warren-ordinary_lkr069.mp3",
    heroVideo:
      "https://res.cloudinary.com/dagiis3pz/video/upload/f_auto,q_auto:good,dpr_auto,w_1600/v1778492568/heroupdate_tbsnre.mp4",
    heroVideoMobile:
      "https://res.cloudinary.com/dagiis3pz/video/upload/f_auto,q_auto:good,dpr_auto,w_1080,c_fill,ar_9:16,g_auto/v1778492568/heroupdate_tbsnre.mp4",
    momentsVideo1:
      "https://res.cloudinary.com/dagiis3pz/video/upload/f_auto,q_auto:eco,w_960/v1778466617/add1_mnuwep.mp4",
    momentsVideo2:
      "https://res.cloudinary.com/dagiis3pz/video/upload/f_auto,q_auto:eco,w_960/v1778466605/add2_u2sarl.mp4",
    backgroundImage:
      "https://res.cloudinary.com/dagiis3pz/image/upload/v1778466823/back1_hrkdzo.jpg",
    gallery1:
      "https://res.cloudinary.com/dagiis3pz/image/upload/v1778466824/g1_no5e5r.jpg",
    gallery2:
      "https://res.cloudinary.com/dagiis3pz/image/upload/v1778466825/g2_nlicrr.jpg",
    gallery3:
      "https://res.cloudinary.com/dagiis3pz/image/upload/v1778466826/g3_lstxuc.jpg",
    gallery4:
      "https://res.cloudinary.com/dagiis3pz/image/upload/v1778466822/g4_hocmy9.jpg",
  },

  // Contact & RSVP
  rsvpFormUrl:
    import.meta.env.VITE_RSVP_FORM_URL ||
    "https://docs.google.com/forms/d/e/1FAIpQLSe7yZ55Ds41e3HdZAcbcaLk0rwGmRCzj7ErtAuEPk_KEhSEQA/viewform?usp=publish-editor",
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
