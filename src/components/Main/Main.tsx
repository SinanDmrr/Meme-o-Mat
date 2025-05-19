import {useEffect, useState, useRef} from "react";
import html2canvas from "html2canvas";

import trollFace from "../../assets/img/troll-face.png";
import saveIcon from "../../assets/img/save.png";
import switchIcon from "../../assets/img/switch.png";

interface IMemeInformation {
  imgUrl: string;
  topText: string;
  bottomText: string;
}

interface MainProps {
  memeUrlArray: string[];
}

export default function Main({memeUrlArray}: MainProps) {
  const [textColor, setTextColor] = useState("white");
  const [memeInformation, setMemeInformation] = useState<IMemeInformation>({
    imgUrl: "",
    topText: "",
    bottomText: "",
  });
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const memeRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (memeUrlArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * memeUrlArray.length);
      const randomUrl = memeUrlArray[randomIndex];
      setMemeInformation((prev) => ({
        ...prev,
        imgUrl: randomUrl,
      }));
    }
  }, [memeUrlArray]);

  function handleGenerateMeme() {
    if (memeUrlArray.length === 0) return;
    const randomIndex = Math.floor(Math.random() * memeUrlArray.length);
    const randomUrl = memeUrlArray[randomIndex];
    setMemeInformation((prev) => ({
      ...prev,
      topText: "",
      bottomText: "",
      imgUrl: randomUrl,
    }));

    setImageWidth(null);
    setImageHeight(null);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.currentTarget;
    if (name === "topText" || name === "bottomText") {
      setMemeInformation((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleImageLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    const img = event.currentTarget;
    setImageWidth(img.clientWidth);
    setImageHeight(img.clientHeight);
  }

  const textWidth = imageWidth ? `${imageWidth * 0.8}px` : "80%";

  function handleSwitchText() {
    setMemeInformation((prev) => ({
      ...prev,
      topText: prev.bottomText,
      bottomText: prev.topText,
    }));
  }

  async function handleSaveMeme() {
    if (!memeRef.current) {
      console.error("Meme-Container nicht gefunden!");
      return;
    }

    try {
      const canvas = await html2canvas(memeRef.current, {
        useCORS: true,
        backgroundColor: null,
        logging: true,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "dein-meme.png";
      link.click();
      console.log("Download gestartet!");
    } catch (error) {
      console.error("Fehler beim Speichern des Memes:", error);
      alert(
        "Fehler beim Speichern des Memes. Überprüfe die Konsole für Details."
      );
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-start w-full px-5">
      <div className="form flex flex-col w-full max-w-[570px] min-w-[300px] gap-5">
        <div className="flex flex-col items-center w-full sm:flex-row sm:justify-between mt-3">
          <label className="flex flex-col text-center w-full sm:w-[45%]">
            <p className="font-bold text-3xl mb-3 text-[var(--accent-color)] text-shadow-lg">
              Oberer Text
            </p>
            <input
              type="text"
              placeholder="Oberer Text"
              name="topText"
              className="bg-white rounded-lg p-1 outline-none"
              maxLength={50}
              value={memeInformation.topText}
              onChange={handleChange}
            />
          </label>

          <button
            className="my-2 sm:my-0 p-2 rounded-full bg-[var(--accent-color)] hover:bg-opacity-80 transition cursor-pointer hover:bg-[#609469]"
            onClick={handleSwitchText}>
            <img src={switchIcon} alt="switch icon" className="h-7" />
          </button>

          <label className="flex flex-col text-center w-full sm:w-[45%]">
            <p className="font-bold text-3xl mb-3 text-[var(--accent-color)] text-shadow-lg">
              Unterer Text
            </p>
            <input
              type="text"
              placeholder="Unterer Text"
              name="bottomText"
              className="bg-white rounded-lg p-1 outline-none"
              maxLength={50}
              value={memeInformation.bottomText}
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          className="gradient-accent-combined rounded-3xl p-2 flex justify-center gap-3"
          onClick={handleGenerateMeme}>
          <img src={trollFace} className="w-8 h-8 scale-x-[-1] xs:w-16" />
          <p className="text-white font-bold text-2xl cursor-pointer">
            Neues Meme
          </p>
          <img src={trollFace} className="w-8 h-8 scale-x-[-1] xs:w-16" />
        </button>
        <div className="flex gap-3 justify-center items-center">
          <p className="text-[var(--accent-color)] text-shadow-lg text-2xl font-bold">
            Textfarbe:
          </p>

          <button
            className="bg-white text-black px-4 py-2 rounded cursor-pointer"
            onClick={() => setTextColor("white")}>
            Weiß
          </button>

          <button
            className="bg-black text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => setTextColor("black")}>
            Schwarz
          </button>
        </div>
        <button
          className="flex gradient-accent-combined rounded-3xl p-2 justify-center gap-3"
          onClick={handleSaveMeme}>
          <p className="text-white font-bold text-2xl cursor-pointer">
            Speichern
          </p>
          <img
            src={saveIcon}
            className="w-5 h-5 scale-x-[-1] xs:w-16 items-center justify-center mt-2"
          />
        </button>
      </div>
      <div
        className="meme w-full max-w-[450px] min-w-[300px] my-5 relative"
        ref={memeRef}
        style={{height: imageHeight ? `${imageHeight}px` : "auto"}}>
        <img
          ref={imgRef}
          src={memeInformation.imgUrl}
          className="w-full max-h-[450px] object-contain"
          onLoad={handleImageLoad}
          crossOrigin="anonymous"
        />

        <span
          style={{
            color: textColor,
            width: textWidth,
            textShadow:
              textColor === "white"
                ? "0 0 10px rgba(0, 0, 0, 0.8)"
                : "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 meme-text font-bold text-3xl text-shadow-lg-green break-words inline-block text-center">
          {memeInformation.topText}
        </span>

        <span
          style={{
            color: textColor,
            width: textWidth,
            textShadow:
              textColor === "white"
                ? "0 0 10px rgba(0, 0, 0, 0.8)"
                : "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 meme-text font-bold text-3xl text-shadow-lg-green break-words inline-block text-center">
          {memeInformation.bottomText}
        </span>
      </div>
    </main>
  );
}
