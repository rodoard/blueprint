import { getDomainMappings, getQuestionDomains } from "~/models/questionDomain"
import type { Patient } from "~/models/patient.server"
import { getDomainAssessmentCriteria } from "~/models/assessmentCriteria"

type Answer = {
  question_id: string
  value: 0 | 1 | 2 | 3 | 4
}

type PostPatientAnswersProps = {
  patient: Patient,
  answers: Answer[]
}

type AssessmentResults = {
  results: string[]
}

export async function postPatientScreenerAnswers({ patient, answers }: PostPatientAnswersProps): Promise<AssessmentResults> {
  const assessmentCriteria = await getDomainAssessmentCriteria()
  const domainMappings = await getDomainMappings()
  const level2Assessments: { [key: string]: string } = {}
  const scores: { [key: string]: number } = {}

  const hasLevel2Assessment = ({ domain, score }: { domain: string, score: number }) => {
    return assessmentCriteria[domain] &&
      score >= assessmentCriteria[domain].score
  }

  answers.forEach(({ question_id, value }) => {
    const domain = domainMappings[question_id]
    scores[domain] ||= 0
    scores[domain] += value
    if (hasLevel2Assessment({ domain, score: scores[domain] })) {
      level2Assessments[domain] = assessmentCriteria[domain].assessment
    }
  })

  return { results: Object.values(level2Assessments) }
}