import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import { AiFillCopy, AiOutlineDownload } from "react-icons/ai";

function Qrcode() {
  const currentTypeState = useSelector((state) => state.currentType);

  const [qr, setqr] = useState("");
  const [url, seturl] = useState("");
  const QrCodeDownload = async () => {
    const canvas = await (
      await html2canvas(document.getElementById("canvas"))
    ).toDataURL();

    if (canvas) {
      setqr(canvas);
      const a = document.createElement("a");
      a.download = "QrCode.png";
      a.href = canvas;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const QrCodeCopy = () => {
    navigator.clipboard.writeText(qr);
  };
  return (
    <div className="container mx-auto w-[320px] ">
      {currentTypeState.currentType === "Formateur" ? (
        <>
          <div class="mb-4">
            <p className="text-2xl">Générer QrCode</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm  mb-2">
              Saisir votre texte ici :
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => seturl(e.target.value)}
            />
          </div>
          <div id="canvas" className="border p-2 center ">
            <QRCodeCanvas
              value={url}
              size={300}
              bgColor={"#ffffff"}
              fgColor={"#051C51"}
              level={"H"}
              includeMargin={false}
              imageSettings={{
                src: "/logo.jpg",
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>
        </>
      ) : (
        <div className="alert alert-danger  text-center" role="alert">
          Vous n'avez pas l'autorisation d'accéder à cette page !
        </div>
      )}

      <div className="flex w-[300px] mt-4 p-4 space-x-2 items-center justify-center">
        {currentTypeState.currentType === "Formateur" ? (
          <button
            onClick={() => QrCodeDownload()}
            class="flex items-center justify-between bg-transparent hover:bg-[#0a75ad] text-[#0a75ad] font-semibold hover:text-white py-2 px-4 border border-[#0a75ad] hover:border-transparent rounded"
          >
            <AiOutlineDownload />
            Download
          </button>
        ) : null}

        {currentTypeState.currentType === "Formateur" ? (
          <button
            onClick={() => QrCodeCopy()}
            class="flex items-center  justify-between bg-transparent hover:bg-[#0a75ad] text-[#0a75ad] font-semibold hover:text-white py-2 px-4 border border-[#0a75ad] hover:border-transparent rounded"
          >
            <AiFillCopy />
            Copy
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Qrcode;
