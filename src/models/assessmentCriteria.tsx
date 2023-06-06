import config from "config";
import { toSnakeCase } from "js-convert-case";
import { db } from "~/utils/db.server";

type AssessmentCriterion = {
  domain: string
  score: number
  assessment: string
}

type AssessmentCriteria = AssessmentCriterion[]

async function getAssessmentCriteria(): Promise<AssessmentCriteria> {
  const assessmentCriteria = await db.assessmentCriteria.findUnique({
    where: {
      name: config.SAMPLE_ASSESSMENT_CRITERIA
    }
  });
  if (assessmentCriteria == null) {
    throw new Error("No Assessment Criteria")
  }
  return assessmentCriteria && JSON.parse(assessmentCriteria.criteria)
}

export type DomainAssessmentCriteria = {
  [key: string]: { score: number, assessment: string }
}

export async function getDomainAssessmentCriteria(): Promise<DomainAssessmentCriteria> {
  return (await getAssessmentCriteria()).reduce(
    (acc: DomainAssessmentCriteria, criterion: AssessmentCriterion) => {
      const { score, assessment } = criterion
      acc[toSnakeCase(criterion.domain)] = { score, assessment }
      return acc
    }, {})

}