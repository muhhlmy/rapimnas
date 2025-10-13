const stringSimilarity = require("string-similarity");

const normalizeText = (text) =>
  text
    ?.normalize("NFKD")
    .replace(/[�\uFFFD]/g, "")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();

const checkMatchOfName = (bodyName, tempName, next) => {
  try {
    
    const a = normalizeText(bodyName);
    const b = normalizeText(tempName);
    const status = false

    // 1️⃣ kalau sama persis → cocok
    if (a === b) status = !status;

    // 2️⃣ kalau ada di dalam → cocok
    if (a.includes(b) || b.includes(a)) status = !status;

    // 3️⃣ terakhir, fuzzy → untuk typo dan variasi
    const score = stringSimilarity.compareTwoStrings(a, b);
    if (score >= 0.7) status = !status;
    console.log(bodyName, tempName, score, status,'ini score dan statusnya');
    return status;
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = { checkMatchOfName };
