import { resolveExampleRegistryPath, runMvpFromRegistryPath } from "./engine.ts";

const registryPath = resolveExampleRegistryPath();
const result = await runMvpFromRegistryPath(registryPath);

console.log(
  JSON.stringify(
    {
      request: result.request,
      response: result.response,
    },
    null,
    2,
  ),
);
