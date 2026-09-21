import { tools } from "@light-tools/shared";

const serverTools = tools.filter((tool) => tool.processMode === "server");

console.log("LightTools worker placeholder");
console.log(`Planned server tools: ${serverTools.map((tool) => tool.id).join(", ") || "none"}`);
