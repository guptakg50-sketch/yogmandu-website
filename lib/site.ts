// Single source of truth for the studio's Google Maps links.
// The old links queried the address only (?q=31 Miteri Marg...), which Google
// geocodes to a street and shows a chooser instead of the Yogmandu listing.
// Including the business name resolves straight to the pin.
//
// If Google still isn't exact, paste the Google Maps "Share" link
// (maps.app.goo.gl/…) into MAP_LINK below.

const MAP_QUERY = "Yogmandu, Miteri Marg, Mid-Baneshwor, Kathmandu";

export const MAP_LINK  = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
export const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
