import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

export default function App() {
  return (
    <div className="flex flex-col items-center w-full h-screen bg-[#a3b18a]">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
