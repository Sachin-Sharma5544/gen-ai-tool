import { json, urlencoded } from "body-parser";
import express, { type Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req: Request, res:Response) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (req: Request, res: Response) => {
      return res.json({ ok: true });
    })
    .post("/chat", async (req: Request, res: Response) => {
      try {
        const { message } = req.body;

        const response = await openai.chat.completions.create({
          model: "gpt-4.1-mini",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        });

        return res.json({
          success: true,
          data: response.choices[0].message.content,
        });
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    });

  return app;
};