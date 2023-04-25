import {chineseGirlFirstNames, popularChineseFamilyNames} from "./names.js";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config()

const BASE_URL = 'https://api.cognitive.microsofttranslator.com/transliterate?api-version=3.0&language=zh&fromScript=Hans&toScript=Latn';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': process.env.AZURE_KEY,
    'Ocp-Apim-Subscription-Region': 'westeurope',
  },
});

const names = [...popularChineseFamilyNames, ...chineseGirlFirstNames];
let correct = 0;

for (const [key, value] of names) {
  const transliterated = await api.post(null, [{Text: key}])

  // Spaces don't really matter in names in chinese names.
  if (transliterated.data[0].text.toLowerCase().replace(/\s+/g, '') === value.toLowerCase().replace(/\s+/g, '')) {
    correct++;
  } else {
    console.log(`${key} was translated to ${transliterated.data[0].text}, should be: ${value}`);
  }
}

// 107/123
console.log(`Correct: ${correct}/${names.length}`);