import { readFile } from "fs/promises";
import path from "path";

const mapping: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const run = async () => {
  const dataPath = path.resolve(__dirname, "../data/1.txt");
  const data = await readFile(dataPath, "utf-8");
  const value = data
    .split("\n")
    .map((line: string): string => {
      const matches = line.matchAll(
        /(?=(\d|zero|one|two|three|four|five|six|seven|eight|nine))/g
      );

      if (matches === null) {
        throw new Error("Invalid line contains no numbers");
      }

      const first = matches.next().value[1];
      let last = first;

      while (true) {
        let match = matches.next()?.value?.[1];
        if (!match) {
          break;
        }
        last = match;
      }

      const firstAsNum = mapping[first] || first;
      const lastAsNum = mapping[last] || last;
      const val = firstAsNum + lastAsNum;

      return val;
    })
    .reduce((acc, curr) => acc + parseInt(curr, 10), 0);

  console.log(value);
  process.exit();
};

run();
