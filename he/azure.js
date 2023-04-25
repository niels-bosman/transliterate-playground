import {lastNames} from "./names.js";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config()

const BASE_URL = 'https://api.cognitive.microsofttranslator.com/transliterate?api-version=3.0&language=he&fromScript=Hebr&toScript=Latn';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': process.env.AZURE_KEY,
    'Ocp-Apim-Subscription-Region': 'westeurope',
  }
});

const names = [...lastNames];
let correct = 0;

for (const [key, value] of names) {
  const transliterated = await api.post(null, [{Text: key}])

  if (transliterated.data[0].text.toLowerCase() === value.toLowerCase()) {
    correct++;
  } else {
    console.log(`${key} was translated to ${transliterated.data[0].text}, should be: ${value}`);
  }
}

// 10/48
console.log(`Correct: ${correct}/${names.length}`);
