import {useEffect, useState} from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

export default function App() {
  const [memeUrlArray, setmemeUrlArray] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const urls = data.data.memes.map((meme: {url: string}) => meme.url);
        setmemeUrlArray(urls);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen bg-[#a3b18a]">
      <Header />
      <Main memeUrlArray={memeUrlArray} />
      <Footer />
    </div>
  );
}
