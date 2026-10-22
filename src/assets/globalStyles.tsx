import React from "react";
import { css, Global } from "@emotion/react";

export const GlobalStyles = () => (
  <Global styles={css`
    :root {
        --purple: #7c3aed;
        --purple-dark: #6d28d9;
        --violet: #5b21b6;
        --lavender: #ede9fe;
        --page: #ffffff;
        --surface: #f9fafb;
        --body: #4b5563;
        --muted: #6b7280;
        --ink: #1f2937;
        --success: #10b981;
        --warning: #f59e0b;
        --border: #e5e7eb;
        --shadow: 0 12px 34px rgba(91, 33, 182, 0.09);
    }

    * { box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body { 
        margin: 0; 
        background: var(--page); 
        min-width: 320px; 
        color: var(--body);
        font-family: 'Inter', sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    button, input { font: inherit; }
    button { cursor: pointer; }
      
    h1, h2, h3, p { margin: 0; }
      
    h1, h2 { 
        color: var(--violet); 
        font-family: 'Plus Jakarta Sans', sans-serif; 
        letter-spacing: -.035em; 
    }
      
    h3 { color: var(--ink); }
    svg { display: block; }
  `} />
);