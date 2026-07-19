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
      data: { submissions },
    };

    const { data } = await axios.request(options);

    return data.submissions || data;
}

export async function pollBatchResults(tokens: string[]) {
    const maxAttempts = 30;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const options = {
          method: "GET",
          maxBodyLength: Infinity,
          url: `${codeBoxBaseUrl}/submissions/batch?tokens=${tokens.join(",")}`,
          headers: {
            "Accept": "application/json",
            "X-Auth-Token": process.env.CODEBOX_TOKEN,
          },
        };

        const { data } = await axios.request(options);
        const results = data.submissions;

        const isAllDone = results.every((r: any) => r.status.id !== 1 && r.status.id !== 2);

        if (isAllDone) return results;

        await sleep(1000);
    }

    throw new Error("Polling timed out after 30 seconds");
}

    export const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
