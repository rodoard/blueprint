import config from "config";
import { db } from "~/utils/db.server";

export type DomainMappings = {
  [key: string]: string
}

export async function getDomainMappings(): Promise<DomainMappings> {
  const domainMappings = await getQuestionDomains()
  return domainMappings.reduce((acc: DomainMappings, mapping) => {
    acc[mapping.question_id] = mapping.domain
    return acc
  }, {})
}


type QuestionDomain = {
  question_id: string
  domain: string
}

type QuestionDomains = QuestionDomain[]

export async function getQuestionDomains(): Promise<QuestionDomains> {
  const questionDomain = await db.questionDomain.findUnique({
    where: {
      name: config.SAMPLE_QUESTION_DOMAIN
    }
  });
  if (questionDomain == null) {
    throw new Error("No Question Domain mappings")
  }
  return questionDomain && JSON.parse(questionDomain.mappings)
}