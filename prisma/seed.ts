import config from "config";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
  const screeners = [getSampleScreener(), getSampleScreenerMultipleSections()];
  screeners.forEach(async (screener) => {
    const { content, ...props } = screener;
    await db.screener.create({
      data: {
        ...props,
        content: JSON.stringify(content),
      },
    });
  });

  const questionDomains = getSampleQuestionDomains();
  await db.questionDomain.create({
    data: {
      name: config.SAMPLE_QUESTION_DOMAIN,
      mappings: JSON.stringify(questionDomains),
    },
  });
  const toCriteria = (domain: string, score: number, assessment: string) => {
    return { domain, score, assessment };
  };
  const assessmentCriteria = getSampleAssessmentCriteria().map((element) =>
    toCriteria(...element),
  );
  await db.assessmentCriteria.create({
    data: {
      name: config.SAMPLE_ASSESSMENT_CRITERIA,
      criteria: JSON.stringify(assessmentCriteria),
    },
  });
}

seed();

function getSampleAssessmentCriteria(): [string, number, string][] {
  return [
    ["Depression", 2, "PHQ-9"],
    ["Mania", 2, "ASRM"],
    ["Anxiety", 2, "PHQ-9"],
    ["Substance Use", 1, "ASSIST"],
  ];
}
function getSampleQuestionDomains() {
  return [
    {
      question_id: "question_a",
      domain: "depression",
    },
    {
      question_id: "question_b",
      domain: "depression",
    },
    {
      question_id: "question_c",
      domain: "mania",
    },
    {
      question_id: "question_d",
      domain: "mania",
    },
    {
      question_id: "question_e",
      domain: "anxiety",
    },
    {
      question_id: "question_f",
      domain: "anxiety",
    },
    {
      question_id: "question_g",
      domain: "anxiety",
    },
    {
      question_id: "question_h",
      domain: "substance_use",
    },
  ];
}
function getSampleScreener() {
  return {
    name: "BPDS",
    disorder: "Cross-Cutting",
    content: {
      sections: [
        {
          type: "standard",
          title:
            "During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?",
          answers: [
            {
              title: "Not at all",
              value: 0,
            },
            {
              title: "Rare, less than a day or two",
              value: 1,
            },
            {
              title: "Several days",
              value: 2,
            },
            {
              title: "More than half the days",
              value: 3,
            },
            {
              title: "Nearly every day",
              value: 4,
            },
          ],
          questions: [
            {
              question_id: "question_a",
              title: "Little interest or pleasure in doing things?",
            },
            {
              question_id: "question_b",
              title: "Feeling down, depressed, or hopeless?",
            },
            {
              question_id: "question_c",
              title:
                "Sleeping less than usual, but still have a lot of energy?",
            },
            {
              question_id: "question_d",
              title:
                "Starting lots more projects than usual or doing more risky things than usual?",
            },
            {
              question_id: "question_e",
              title:
                "Feeling nervous, anxious, frightened, worried, or on edge?",
            },
            {
              question_id: "question_f",
              title: "Feeling panic or being frightened?",
            },
            {
              question_id: "question_g",
              title: "Avoiding situations that make you feel anxious?",
            },
            {
              question_id: "question_h",
              title:
                "Drinking at least 4 drinks of any kind of alcohol in a single day?",
            },
          ],
        },
      ],
      display_name: "BDS",
    },
    full_name: "Blueprint Diagnostic Screener",
  };
}

function getSampleScreenerMultipleSections() {
  return {
    name: "BPDS 2",
    disorder: "Cross-Cutting",
    content: {
      sections: [
        {
          type: "standard",
          title:
            "During the past TWO (2) WEEKS, how often have you been bothered by the following problems?",
          answers: [
            {
              title: "Not at all",
              value: 0,
            },
            {
              title: "Rare, less than a day or two",
              value: 1,
            },
            {
              title: "Several days",
              value: 2,
            },
            {
              title: "More than half the days",
              value: 3,
            },
            {
              title: "Nearly every day",
              value: 4,
            },
          ],
          questions: [
            {
              question_id: "question_a",
              title: "Little interest or pleasure in doing things?",
            },
            {
              question_id: "question_b",
              title: "Feeling down, depressed, or hopeless?",
            },
            {
              question_id: "question_c",
              title:
                "Sleeping less than usual, but still have a lot of energy?",
            },
            {
              question_id: "question_d",
              title:
                "Starting lots more projects than usual or doing more risky things than usual?",
            },
          ],
        },
        {
          type: "standard",
          title:
            "During the past TWO (2) WEEKS, how much have you been bothered by the following problems?",
          answers: [
            {
              title: "Not at all",
              value: 0,
            },
            {
              title: "Rare, less than a day or two",
              value: 1,
            },
            {
              title: "Several days",
              value: 2,
            },
            {
              title: "More than half the days",
              value: 3,
            },
            {
              title: "Nearly every day",
              value: 4,
            },
          ],
          questions: [
            {
              question_id: "question_e",
              title:
                "Feeling nervous, anxious, frightened, worried, or on edge?",
            },
            {
              question_id: "question_f",
              title: "Feeling panic or being frightened?",
            },
            {
              question_id: "question_g",
              title: "Avoiding situations that make you feel anxious?",
            },
            {
              question_id: "question_h",
              title:
                "Drinking at least 4 drinks of any kind of alcohol in a single day?",
            },
          ],
        },
      ],
      display_name: "BDS Multiple Sections",
    },
    full_name: "Blueprint Diagnostic Screener II",
  };
}
