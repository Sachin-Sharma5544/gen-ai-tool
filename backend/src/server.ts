import { json, urlencoded } from "body-parser";
import express, { type Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import {GoogleGenerativeAI} from '@google/generative-ai'

dotenv.config()


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY as string
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
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

         const result = await model.generateContent(message);

        const response = result.response.text();

        return res.json({
          success: true,
          data: response
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