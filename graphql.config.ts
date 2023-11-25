import { CodegenConfig } from "@graphql-codegen/cli";
import { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  projects: {
    client: {
      schema: "https://client.api.basta.ai/graphql",
      extensions: {
        codegen: {
          ignoreNoDocuments: true,
          generates: {
            "./src/services/basta/client/_generated/": {
              overwrite: true,
              documents: "./src/services/basta/**/*.client.ts",
              preset: "client",
              presetConfig: {
                fragmentMasking: { unmaskFunctionName: "getFragmentData" },
              },
              plugins: [],
            },
          },
        } as CodegenConfig,
      },
    },
    management: {
      schema: [
        {
          "https://management.api.basta.ai/graphql": {
            headers: {
              ["x-api-key"]: process.env.BASTA_API_KEY!,
              ["x-account-id"]: process.env.BASTA_ACCOUNT_ID!,
            },
          },
        },
      ],
      extensions: {
        codegen: {
          ignoreNoDocuments: true,
          generates: {
            "./src/services/basta/management/_generated/": {
              overwrite: true,
              documents: "./src/services/basta/**/*.management.ts",
              preset: "client",
              presetConfig: {
                fragmentMasking: { unmaskFunctionName: "getFragmentData" },
              },
              plugins: [],
            },
          },
        } as CodegenConfig,
      },
    },
  },
};

export default config;
