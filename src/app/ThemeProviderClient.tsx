"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

// Define the custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2ba149", // Your primary button color
    },
    secondary: {
      main: "#6d6c80", // Your secondary button color
    },
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
          height: "42px",
          "& .MuiOutlinedInput-input": {
            padding: "9px 14px", // Reduce input padding
            height: "24px", // Adjust input element height
          },
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
          fontSize: "14px", // Custom font size
          top: "-5px", // Adjust label position when not focused
          "&.Mui-focused": {
            color: "black", // Set the label color when focused
          },
        },
        shrink: {
          top: "0px", // Adjust position when label shrinks
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: "var(--primary-foreground)",
        },
        outlinedPrimary: {
          color: "var(--text-secondary)",
          borderColor: "var(--text-secondary)"
        },
        root: {
          borderRadius: "10px",
          padding: "8px 16px", // Custom padding
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
