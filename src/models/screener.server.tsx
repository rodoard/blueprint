import type { Screener } from "@prisma/client";
import { db } from "~/utils/db.server";

export type Answer = {
  title: string
  value: number
}

export type Question = {
  question_id: string
  title: string
}

export type Section = {
  type: string;
  title: string;
  answers: Answer[]
  questions: Question[]
}

interface ScreenerModel extends Omit<Screener, 'content'> {
  content: {
    sections: Section[]
    display_name: string
  }
}

export async function getScreener(screenerId: string): Promise<ScreenerModel | null> {
  const screener = await db.screener.findUnique({
    where: { id: screenerId }
  });
  let model: ScreenerModel | null = null;
  if (screener) {
    model = { ...screener, content: JSON.parse(screener.content) }
  }
  return model
}

type IdName = {
  name: string
  id: string
}
export async function getScreenerList(): Promise<IdName[] | null> {
  const screeners = await db.screener.findMany({
    select: { name: true, id: true }
  });
  return screeners
}