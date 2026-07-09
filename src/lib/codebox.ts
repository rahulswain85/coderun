import axios from "axios";
import { codeBoxBaseUrl } from "./constants";

export function getCodeBoxLanguageId(language:string) {
    const languageMap = {
        "PYTHON": 71,
        "JAVASCRIPT": 63,
        "JAVA": 62,
        "C": 50,
        "C++": 54
    }

    return languageMap[language.toUpperCase() as keyof typeof languageMap];
}

export async function submitBatch(submissions: any) {


    const options = {
      method: "POST",
      url: `${codeBoxBaseUrl}/submissions/batch`,
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": process.env.CODEBOX_TOKEN,
      },
      body: submissions,
    };

    const { data } = await axios.request(options);

    return data;
}

export async function pollBatchResults(tokens: string[]) {
    
    while (true) {
        const options = {
          method: "GET",
          maxBodyLength: Infinity,
          url: `${codeBoxBaseUrl}/submissions/${tokens.join(",")}`,
          headers: {
            "Accept": "application/json",
            "X-Auth-Token": process.env.CODEBOX_TOKEN,
          },
        };

        const { data } = await axios.request(options);
        const results = data.submissions;

        const isAllDone = results.every((r: any) => r.status.id !== 22 && r.status.id !== 1);

        if (isAllDone) return results;

        await sleep(1000);

    }
}

    export const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
