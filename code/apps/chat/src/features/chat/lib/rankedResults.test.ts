import { describe, expect, it } from "vitest";
import { RankedResults } from "./rankedResults";
describe("bounded ranking", () => {
  it("matches full sorting after replacements and late title promotion", () => {
    const rank = (a: { score: number }, b: { score: number }) =>
      b.score - a.score;
    const retained = new RankedResults<{ id: string; score: number }>(50, rank);
    const all = new Map<string, { id: string; score: number }>();
    for (let i = 0; i < 2000; i++) {
      const value = { id: String(i), score: (i * 991) % 2003 };
      all.set(value.id, value);
      retained.add(value);
    }
    for (const id of ["0", "100", "1000"]) {
      const value = { id, score: 4000 + Number(id) };
      all.set(id, value);
      retained.add(value);
    }
    expect(retained.sorted()).toEqual(
      [...all.values()].sort(rank).slice(0, 50),
    );
  });
});
