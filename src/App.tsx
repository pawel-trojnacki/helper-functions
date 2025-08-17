import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { EmailConverter } from "./views/EmailConverter.tsx";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <EmailConverter />
      </main>
    </ThemeProvider>
  )
}
