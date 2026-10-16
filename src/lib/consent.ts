// Runs before GTM: sets denied defaults, then re-applies a previously saved
// choice so returning visitors who accepted are tracked again.
export const CONSENT_DEFAULT_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied'
  });

  try {
    if (localStorage.getItem('cookie-consent') === 'full') {
      gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
  } catch (e) {}
`;
