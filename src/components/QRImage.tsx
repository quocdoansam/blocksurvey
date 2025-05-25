import QRCode from "qrcode";
import { useState, useEffect } from "react";

const QRImage = ({ value }: { value: string }) => {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(value).then(setImgUrl).catch(console.error);
  }, [value]);

  return imgUrl ? (
    <img
      src={imgUrl}
      alt='QR Code'
      className='w-full aspect-square rounded-xl'
    />
  ) : (
    <p>Generating QR...</p>
  );
};

export default QRImage;
