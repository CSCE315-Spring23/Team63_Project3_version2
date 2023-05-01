import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Load Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Google Translate widget initialization function
    const googleTranslateElementInit = () => {
      // @ts-ignore
      new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'en,es', layout: google.translate.TranslateElement.InlineLayout.VERTICAL }, 'google_translate_element');
    };
    window.googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div id="google_translate_element"></div>
      <Component {...pageProps} />
    </>
  );
};

export default App;


// import '@/styles/globals.css';
// import type { AppProps } from 'next/app';
// import { useEffect } from 'react';
// import Layout from '@/components/Layout';

// declare global {
//   interface Window {
//     googleTranslateElementInit: () => void;
//   }
// }

// const App = ({ Component, pageProps }: AppProps) => {
//   useEffect(() => {
//     // Load Google Translate script
//     const script = document.createElement('script');
//     script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//     script.async = true;
//     document.body.appendChild(script);

//     // Google Translate widget initialization function
//     const googleTranslateElementInit = () => {
//       // @ts-ignore
//       new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'en,es', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
//     };
//     window.googleTranslateElementInit = googleTranslateElementInit;

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// };

// export default App;
