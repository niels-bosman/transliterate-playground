import {transliterate} from "transliteration";
import {chineseGirlFirstNames, popularChineseFamilyNames} from "./names.js";

const names = [...popularChineseFamilyNames, ...chineseGirlFirstNames];

let correct = 0;

for (const [key, value] of names) {
  const transliterated = transliterate(key);

  if (transliterated.toLowerCase() === value.toLowerCase()) {
    correct++;
  } else {
    console.log(`${key} was translated to ${transliterated}, should be: ${value}`);
  }
}

// 13/123
console.log(`Correct: ${correct}/${names.length}`);