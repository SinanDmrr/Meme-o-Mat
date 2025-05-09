import React, {useState, useEffect, useRef} from "react";

const Footer: React.FC = () => {
  const [showImprint, setShowImprint] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const imprintRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        imprintRef.current &&
        !imprintRef.current.contains(event.target as Node)
      ) {
        setShowImprint(false);
      }
      if (
        contactRef.current &&
        !contactRef.current.contains(event.target as Node)
      ) {
        setShowContact(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer className="bg-[var(--accent-color)] p-5 text-center text-[var(--font-color)] font-sans w-full">
      <div className="flex justify-center gap-10">
        <div className="my-2.5">
          <h3
            className="text-lg font-bold cursor-pointer transition-colors hover:text-white"
            onClick={() => setShowImprint(!showImprint)}>
            Impressum
          </h3>
        </div>
        <div className="my-2.5">
          <h3
            className="text-lg font-bold cursor-pointer transition-colors hover:text-white"
            onClick={() => setShowContact(!showContact)}>
            Kontakt
          </h3>
        </div>
      </div>

      {showImprint && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div
            className="bg-[var(--accent-color)] p-5 rounded-lg max-w-md text-center shadow-lg"
            ref={imprintRef}>
            <h3 className="text-xl mb-3.75">Impressum</h3>
            <p className="text-base my-2.5">Sinan Demir</p>
            <p className="text-base my-2.5">Am Südhang 18</p>
            <p className="text-base my-2.5">53844 Troisdorf</p>
          </div>
        </div>
      )}

      {showContact && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div
            className="bg-[var(--accent-color)] p-5 rounded-lg max-w-md text-center shadow-lg"
            ref={contactRef}>
            <h3 className="text-xl mb-3.75">Kontakt</h3>
            <p className="text-base my-2.5">
              E-Mail:{" "}
              <a
                href="mailto:info@developerdemir.com"
                className="text-[var(--font-color)] hover:underline hover:text-white">
                info@developerdemir.com
              </a>
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
