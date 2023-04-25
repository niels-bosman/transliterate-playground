import {firstNames, lastNames} from "./names.js";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config()

const BASE_URL = 'https://api.cognitive.microsofttranslator.com/transliterate?api-version=3.0&language=ru&fromScript=Cyrl&toScript=Latn';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': process.env.AZURE_KEY,
    'Ocp-Apim-Subscription-Region': 'westeurope',
  },
});

const names = [...firstNames, ...lastNames];

let correct = 0;

for (const [value, key] of names) {
  const transliterated = await api.post(null, [{Text: key}])

  // Spaces don't really matter in names in chinese names.
  if (transliterated.data[0].text.toLowerCase().replace(/\s+/g, '') === value.toLowerCase().replace(/\s+/g, '')) {
    correct++;
  } else {
    console.log(`${key} was translated to ${transliterated.data[0].text}, should be: ${value}`);
  }
}

// 41/71
console.log(`Correct: ${correct}/${names.length}`);