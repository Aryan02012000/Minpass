import axios from "axios";

export function checkBreach(password) {
  return new Promise((resolve, reject) => {
    const passwordBuffer = new TextEncoder().encode(password);
    window.crypto.subtle.digest("SHA-1", passwordBuffer).then((hashBuffer) => {
      const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      // console.log(hashHex);
      axios
        .get("https://api.pwnedpasswords.com/range/" + hashHex.slice(0, 5))
        .then((res) => {
          if (res.status == 200) {
            const r = new RegExp(hashHex.slice(5), "i");
            resolve(r.test(res.data));
          } else {
            resolve(false);
          }
        })
        .catch(reject);
    });
  });
}
