import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import { version } from "../../package.json";
import SwaggerUI from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Urls Shortner API Docs",
      version,
    },
  },
  apis: ["/src/index.ts", "./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  app.use("/docs", SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));

  app.get("docs.json", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Docs in ${process.env.URL}/docs `);
}

export default swaggerDocs;
