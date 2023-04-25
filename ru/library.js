import {transliterate} from "transliteration";
import {firstNames, lastNames} from "./names.js";

const names = [...firstNames, ...lastNames];

let correct = 0;

for (const [value, key] of names) {
  const transliterated = transliterate(key);

  if (transliterated.toLowerCase() !== value.toLowerCase()) {
    console.log(`${key} was translated to ${transliterated}, should be: ${value}`);
  } else {
    correct++;
  }
}

console.log(`Correct: ${correct}/${names.length}`);