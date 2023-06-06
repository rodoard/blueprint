import { z } from "zod";

const schema = z.object({
  answers: z.array(z.object({
    value: z.number(),
    question_id: z.string(),
  })),
});

export default function validatePostAnswers(postAnswers: any): boolean {
  return schema.safeParse(postAnswers).success;
}