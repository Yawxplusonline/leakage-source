import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * Global responsive HTML template for mobile, tablet, and desktop viewports.
 * Forces hardware-accelerated text rendering, proper touch handling, and full responsive scaling.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#0B0F19" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <title>LEAKAGE SOURCE — Ghana BECE & WASSCE Prep</title>

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              box-sizing: border-box;
              -webkit-tap-highlight-color: transparent;
            }
            html, body {
              height: 100%;
              width: 100%;
              margin: 0;
              padding: 0;
              background-color: #0B0F19;
              overflow-x: hidden;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
            #root {
              display: flex;
              height: 100%;
              width: 100%;
              flex: 1;
              flex-direction: column;
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
