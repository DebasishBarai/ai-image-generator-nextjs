'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalButton = () => {
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Only load the script once
    if (scriptLoaded.current) return;

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=BAA_ivABVOC28Gmw3rlvAayKO1TG_sOGyziu8vGBouuJIjAKmTS5f4djn7lSEwHeqNht5S4tC_cXH8AaaI&components=hosted-buttons&disable-funding=venmo&currency=USD';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      if (window.paypal && paypalContainerRef.current) {
        window.paypal.HostedButtons({
          hostedButtonId: "HT8XFJ9BTQ37U"
        })
        .render(paypalContainerRef.current);
      }
    };

    document.body.appendChild(script);
    scriptLoaded.current = true;

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <div ref={paypalContainerRef} id="paypal-container-HT8XFJ9BTQ37U"></div>;
};

export default PayPalButton; 