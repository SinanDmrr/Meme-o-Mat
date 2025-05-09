export default function Main() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center w-full">
      <div className="form flex flex-col">
        <div
          className="flex flex-col items-center min-w-[320px] w-[500px] justify-center
        sm:flex-row ">
          <label
            className="flex flex-col text-center w-full
          sm:w-[45%]">
            <p
              className="font-bold text-3xl mb-3 text-[var(--accent-color)] text-shadow-lg
            ">
              Oberer Text
            </p>
            <input
              type="text"
              placeholder="Montagmorgen:"
              name="topText"
              className="bg-white rounded-lg p-1 outline-none"
            />
          </label>

          <label
            className="flex flex-col text-center w-full
          sm:w-[45%]">
            <p
              className="font-bold text-3xl mb-3 text-[var(--accent-color)] text-shadow-lg
            ">
              Unterer Text
            </p>
            <input
              type="text"
              placeholder="Ich bin wach, aber mein Wille nicht."
              name="bottomText"
              className="bg-white rounded-lg p-1 outline-none"
            />
          </label>
        </div>
        <button>🤖 Erstelle jetzt dein Meme 🤖</button>
      </div>
      <div className="meme">
        <img src="http://i.imgflip.com/1bij.jpg" />
        <span className="top">One does not simply</span>
        <span className="bottom">Walk into Mordor</span>
      </div>
    </main>
  );
}
