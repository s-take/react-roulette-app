import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import OrderingPage from "./pages/Ordering";

const theme = createTheme({
  typography: {
    fontFamily: `"Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN", "Hiragino Sans", "ヒラギノ角ゴシック", "Meiryo", "メイリオ", sans-serif`,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="lg">
        <OrderingPage />
      </Container>
    </ThemeProvider>
  );
}

export default App;
