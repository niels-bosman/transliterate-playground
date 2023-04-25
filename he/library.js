import {transliterate} from "transliteration";
import {lastNames} from "./names.js";

const names = [...lastNames];

let correct = 0;

for (const [key, value] of names) {
  const transliterated = transliterate(key);

  if (transliterated.toLowerCase() !== value.toLowerCase()) {
    console.log(`${key} was translated to ${transliterated}, should be: ${value}`);
  } else {
    correct++;
  }
}

// 3 / 48
console.log(`Correct: ${correct}/${names.length}`);