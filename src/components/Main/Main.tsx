import {useEffect, useState} from "react";

import trollFace from "../../assets/img/troll-face.png";

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
      imgUrl: randomUrl,
    }));
    setImageWidth(null);
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
  }

  const textWidth = imageWidth ? `${imageWidth * 0.8}px` : "80%";

  function handleSwitchText() {
    setMemeInformation((prev) => ({
      ...prev,
      topText: prev.bottomText,
      bottomText: prev.topText,
    }));
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
              maxLength={40}
              onChange={handleChange}
            />
          </label>

          <button
            className="my-2 sm:my-0 p-2 rounded-full bg-[var(--accent-color)] hover:bg-opacity-80 transition cursor-pointer
            hover:bg-[#609469]"
            onClick={handleSwitchText}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
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
              maxLength={40}
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          className="gradient-accent-combined rounded-3xl p-2 flex justify-center gap-3"
          onClick={handleGenerateMeme}>
          <img src={trollFace} className="w-10" />
          <p className="text-white font-bold text-2xl cursor-pointer">
            Erstelle jetzt dein Meme
          </p>
          <img
            src={trollFace}
            className="w-12 scale-x-[-1] xs:w-16"
            onLoad={handleImageLoad}
          />
        </button>
        <div className="flex gap-3 justify-center items-center">
          <p className=" text-[var(--accent-color)] text-shadow-lg text-2xl font-bold">
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
      </div>
      <div className="meme w-full max-w-[570px] min-w-[300px] my-5 relative">
        <img
          src={memeInformation.imgUrl}
          className="w-full max-h-[500px] object-contain"
          onLoad={handleImageLoad}
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
          className="absolute top-2 left-1/2 transform -translate-x-1/2 meme-text font-bold text-4xl text-shadow-lg-green break-words inline-block text-center">
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
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 meme-text font-bold text-4xl text-shadow-lg-green break-words inline-block text-center">
          {memeInformation.bottomText}
        </span>
      </div>
    </main>
  );
}
