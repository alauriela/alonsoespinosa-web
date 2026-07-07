(function () {
  var GA_ID = 'G-JDTCDRWJB4';
  var STORAGE_KEY = 'ae_cookie_analytics';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  function cargarGoogleAnalytics() {
    if (window.gaCargado) return;
    window.gaCargado = true;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GA_ID, {
      anonymize_ip: true
    });
  }

  function crearBannerCookies() {
    if (document.getElementById('cookie-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.style.position = 'fixed';
    banner.style.left = '20px';
    banner.style.right = '20px';
    banner.style.bottom = '20px';
    banner.style.zIndex = '9999';
    banner.style.background = '#ffffff';
    banner.style.border = '1px solid #dfe6e9';
    banner.style.borderRadius = '16px';
    banner.style.padding = '18px';
    banner.style.boxShadow = '0 10px 30px rgba(0,0,0,.12)';
    banner.style.maxWidth = '720px';
    banner.style.margin = 'auto';

    banner.innerHTML =
      '<p style="margin:0 0 12px;color:#1a1a1a;font-size:14px;line-height:1.5;">' +
      'Utilizamos cookies técnicas necesarias y, solo si nos das permiso, cookies analíticas para conocer el uso de la web y mejorar nuestros contenidos.' +
      '</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;">' +
      '<button id="accept-analytics" type="button" style="background:#2E4A5A;color:#fff;border:0;border-radius:999px;padding:10px 16px;font-weight:700;cursor:pointer;">Aceptar analíticas</button>' +
      '<button id="reject-analytics" type="button" style="background:#eef3fd;color:#2E4A5A;border:0;border-radius:999px;padding:10px 16px;font-weight:700;cursor:pointer;">Rechazar</button>' +
      '<a href="/cookies/" style="color:#2E4A5A;font-weight:700;padding:10px 0;text-decoration:none;">Más información</a>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById('accept-analytics').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      banner.remove();
      cargarGoogleAnalytics();
    });

    document.getElementById('reject-analytics').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'rejected');
      banner.remove();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var consent = localStorage.getItem(STORAGE_KEY);

    if (consent === 'accepted') {
      cargarGoogleAnalytics();
      return;
    }

    if (consent === 'rejected') {
      return;
    }

    crearBannerCookies();
  });
})();