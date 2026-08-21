(() => {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const toggle = nav.querySelector('.nav-toggle');
  const links = nav.querySelector('.nav-links');

  if (toggle && links) {
    if (!links.id) {
      links.id = 'site-nav-links';
    }
    toggle.setAttribute('aria-controls', links.id);

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-open', isOpen);
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
  }

  const onScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* Google Ads base tag + conversion tracking (Studio 4e) */ (function(){var gs=document.createElement('script');gs.async=true;gs.src='https://www.googletagmanager.com/gtag/js?id=AW-960404172';document.head.appendChild(gs);window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config','AW-960404172');function fireConversion(s,x){gtag('event','conversion',Object.assign({send_to:s},x||{}));}document.addEventListener('click',function(e){var t=e.target;var wa=t&&t.closest&&t.closest('a[href*="wa.me"]');if(wa){fireConversion('AW-960404172/3zUGCL_QjuUcEMy1-skD');return;}var tel=t&&t.closest&&t.closest('a[href^="tel:"]');if(tel){fireConversion('AW-960404172/pglBCLrRjuUcEMy1-skD',{value:1.0,currency:'EUR'});}},true);})();
