import {
  StyledEngineProvider,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";
import { AuthProvider } from "contexts/authContext";
import { HistoryProvider } from "contexts/historyContext";
import useNProgress from "hooks/useNProgress";
import type { AppProps } from "next/app";
import React, { useEffect, useMemo } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      extendTheme({
        colorSchemes: {
          light: {
            palette: {},
          },
          dark: {
            palette: {},
          },
        },
      }),
    [prefersDarkMode]
  );
  useNProgress();
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme}>
        <MuiCssVarsProvider>
          <HistoryProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </HistoryProvider>
        </MuiCssVarsProvider>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}

const MuiCssVarsProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { setMode } = useColorScheme();
  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [setMode, prefersDarkMode]);
  return <>{children}</>;
};

export default MyApp;
