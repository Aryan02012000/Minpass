function stringToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function arrayBufferToString(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export function generateRSAKeyPair() {
  return new Promise((resolve, reject) => {
    window.crypto.subtle
      .generateKey(
        {
          modulusLength: 2048,
          name: "RSA-OAEP",
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      )
      .then(resolve)
      .catch(reject);
  });
}

export function encrypt(publicKey, data, toString = true) {
  return new Promise((resolve, reject) => {
    window.crypto.subtle
      .encrypt(
        {
          name: "RSA-OAEP",
        },
        publicKey,
        stringToArrayBuffer(data)
      )
      .then((encData) =>
        resolve(toString ? arrayBufferToString(encData) : encData)
      )
      .catch(reject);
  });
}

export function decrypt(privateKey, data) {
  return new Promise((resolve, reject) => {
    window.crypto.subtle
      .decrypt(
        {
          name: "RSA-OAEP",
        },
        privateKey,
        data instanceof ArrayBuffer ? data : stringToArrayBuffer(data)
      )
      .then((d) => resolve(arrayBufferToString(d)))
      .catch(reject);
  });
}

export function PBKDF2(password, salt, iterations = 100001) {
  return new Promise((resolve, reject) => {
    window.crypto.subtle
      .importKey("raw", stringToArrayBuffer(password), "PBKDF2", false, [
        "deriveKey",
      ])
      .then((key) => {
        window.crypto.subtle
          .deriveKey(
            {
              name: "PBKDF2",
              hash: "SHA-512",
              salt: stringToArrayBuffer(salt),
              iterations,
            },
            key,
            {
              name: "AES-CBC",
              length: 256,
            },
            true,
            ["encrypt", "decrypt"]
          )
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
}

const cryptoUtils = {
  generateRSAKeyPair,
  encrypt,
  decrypt,
  PBKDF2,
};

export default cryptoUtils;
