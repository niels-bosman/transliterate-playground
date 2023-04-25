import {transliterate} from "transliteration";
import {popularFamilyNames, popularBabyNames} from "./names.js";

const names = [...popularFamilyNames, ...popularBabyNames];

let correct = 0;

for (const [key, value] of names) {
  const transliterated = transliterate(key);

  if (transliterated.toLowerCase() !== value.toLowerCase()) {
    console.log(`${key} was translated to ${transliterated}, should be: ${value}`);
  } else {
    correct++;
  }
}

// 40/71
console.log(`Correct: ${correct}/${names.length}`);