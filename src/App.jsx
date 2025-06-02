import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
      <Header />
        <main>
            <Meals />
            <Cart />
            <Checkout />
        </main>
    </>
  );
}

export default App;
