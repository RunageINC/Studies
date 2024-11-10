import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"


function App() {

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        {/* Your app components */}
      </ThemeProvider>
    </>
  )
}

export default App
