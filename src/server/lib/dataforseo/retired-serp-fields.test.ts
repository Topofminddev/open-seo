import { describe, expect, it } from "vitest";
import { stripRetiredSerpFields } from "@/server/lib/dataforseo/core";

describe("stripRetiredSerpFields", () => {
  it("drops the retired keys, including the SDK's default null", () => {
    const body = JSON.stringify([
      {
        keyword: "alpha",
        depth: 40,
        stop_crawl_on_match: null,
        find_targets_in: ["organic"],
        ignore_targets_in: undefined,
        target_search_mode: "all",
      },
    ]);
    const out = stripRetiredSerpFields(body);
    if (typeof out !== "string") throw new Error("expected a string body");
    expect(JSON.parse(out)).toEqual([{ keyword: "alpha", depth: 40 }]);
  });

  it("passes non-JSON and non-array bodies through untouched", () => {
    expect(stripRetiredSerpFields("not json")).toBe("not json");
    expect(stripRetiredSerpFields('{"a":1}')).toBe('{"a":1}');
    expect(stripRetiredSerpFields(undefined)).toBeUndefined();
  });
});
