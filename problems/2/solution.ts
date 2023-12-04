import { readFile } from "fs/promises";
import path from "path";

const proposedBag: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const part1 = async () => {
  const data: [string, string[][][]][] = (
    await readFile(path.join(__dirname, "data.txt"), "utf-8")
  )
    .split("\n")
    .map((line) => {
      const [gameDescription, draws] = line.split(":");
      const [, gameId] = gameDescription.split(" ");
      const splitDraws = draws.split(";");

      const drawScores = splitDraws.map((draw): string[][] =>
        draw.split(",").map((value) => value.split(" ").slice(1))
      );
      return [gameId, drawScores] as const;
    });

  const result = data
    .map(([id, drawScores]) => {
      return [
        id,
        drawScores.some((values) => {
          const result = values.some(([count, color]) => {
            return (
              proposedBag[color] === undefined ||
              proposedBag[color] < parseInt(count, 10)
            );
          });
          return result;
        }),
      ] as const;
    })
    .filter(([, isImpossible]) => !isImpossible)
    .reduce((acc, [id]) => acc + parseInt(id, 10), 0);

  console.log(result);
  process.exit();
};

const part2 = async () => {
  const data: [string, string[][][]][] = (
    await readFile(path.join(__dirname, "data.txt"), "utf-8")
  )
    .split("\n")
    .map((line) => {
      const [gameDescription, draws] = line.split(":");
      const [, gameId] = gameDescription.split(" ");
      const splitDraws = draws.split(";");

      const drawScores = splitDraws.map((draw): string[][] =>
        draw.split(",").map((value) => value.split(" ").slice(1))
      );
      return [gameId, drawScores] as const;
    });

  const result = data
    .map(([id, drawScores]) => {
      const minPossible: Record<string, number> = {};
      drawScores.forEach((values) => {
        values.forEach(([count, color]) => {
          if (
            minPossible[color] === undefined ||
            minPossible[color] < parseInt(count, 10)
          ) {
            minPossible[color] = parseInt(count, 10);
          }
        });
      });

      return Object.entries(minPossible).reduce(
        (acc, curr) => acc * curr[1],
        1
      );
    })
    .reduce((acc, curr) => acc + curr, 0);

  console.log(result);
  process.exit();
};

part2();
