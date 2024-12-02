"use client";

import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: [
      "var(--font-noto-sans-thai)",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
  },
});

function ThemeWrapper({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body
        className={`${notoSansThai.variable} ${notoSansThai.className} antialiased`}
      >
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
