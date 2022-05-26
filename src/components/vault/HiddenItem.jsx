import React, { useEffect, useState } from "react";
import cryptoUtils from "../cryptoUtils";

export function HiddenItem({ password }) {
  const [show, setShow] = useState(false);
  const [decrypted, setDecrypted] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const keydata = window.localStorage.getItem("derivedKey");
        const key = await cryptoUtils.importKey(keydata, "raw");

        const decryptedPass = await cryptoUtils.decrypt(key, password);

        //   return decryptedPass;
        setDecrypted(decryptedPass);
      } catch (err) {
        console.log(err);
      }
    })();
  });

  return (
    <>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          setShow(!show);
        }}
      >
        {/* {show ? password : "********"} */}
        {show ? decrypted : password}
      </span>
    </>
  );
}
