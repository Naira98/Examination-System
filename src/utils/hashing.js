const algorithm = "SHA-256";

export async function generateHash(data) {
  const encodedData = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest(algorithm, encodedData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export async function compareHashes(data, hashToCompare) {
  const generatedHash = await generateHash(data, algorithm);
  return generatedHash === hashToCompare;
}
