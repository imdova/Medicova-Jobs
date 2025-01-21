"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

// Define the custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#50BF73", // Your primary button color
    },
    // secondary: {
    //   main: "#134834", // Your secondary button color
    // },
  },
  typography: {
    // Apply the font globally to all typography variants
    fontFamily: "var(--font-poppins), sans-serif",
    fontSize: 14,
    // add for h3
    h3: {
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "50px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--light-primary)", // Focused border color
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "red", // Error border color
          },
          borderRadius: "10px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "black", // Set the label color when focused
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: "10px",
          "&:hover": {
            background: "var(--primary-900)",
          },
          "&:disabled": {
            opacity: 0.6,
            color: "var(--primary-foreground)",
          },
        },
        root: {
          textTransform: "none", // Disable uppercase text
          fontWeight: "bold", // Bold text
          padding: "8px 16px", // Custom padding
          borderRadius: "10px", // Add border radius
        },
        contained: {
          boxShadow: "none", // Remove shadow from contained buttons
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow on hover
          },
        },
        outlined: {
          borderColor: "var(--primary)",
          borderRadius: "10px",
          color: "var(--primary)",
          "&:hover": {
            borderColor: "var(--primary)",
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          },
        },
      },
    },
  },
});

export default function ThemeProviderClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
