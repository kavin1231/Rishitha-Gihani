import WeddingPage from "./WeddingPage";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <WeddingPage />
    </ErrorBoundary>
  );
}

export default App;
