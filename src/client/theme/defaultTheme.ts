export const theme = {
  color: {
    background: "#FFF",
    focus: "blue",
    white: "#FFF",
    whiteHover: "#f0f0f0",
    whiteContrast: "#000",
    black: "#000",
    blackContrast: "#fff",
    primary: "rgb(241, 194, 49)",
    primaryContrast: "#000",
    primaryHover: "rgb(255, 191, 0)",
    primaryHoverContrast: "#000",
    lightGray: "#cecece",
    button: "blue",
    buttonContrast: "#fff",
    buttonHover: "navy",
    buttonHoverContrast: "#fff",
    buttonDisabled: "#cecece",
    buttonDisabledContrast: "#000",
    disabled: "#929292",
    error: "#FF4924",
    success: "#008000",
  },
  spacing: {
    none: 0,
    xxsmall: "4px",
    xsmall: "8px",
    small: "16px",
    medium: "24px",
    large: "32px",
    xlarge: "48px",
  },
  mq: {
    small: "576px",
    medium: "768px",
    large: "1025px",
    bigScreens: "1400px",
  },

  border: {
    radius: {
      xsmall: "4px",
      small: "8px",
      medium: "16px",
      large: "24px",
      xlarge: "32px",
    },
  },
  typography: {
    fontFamily: "sans-serif",
    h1: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "16px",
      fontWeight: "normal",
    },
    caption: {
      fontSize: "12px",
      fontWeight: "normal",
    },
    label: {
      fontSize: "16px",
      fontWeight: "normal",
    },
  },
} as const;

export type Theme = typeof theme;
