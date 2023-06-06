import { useEffect, useState } from "react"
import type { Section } from "~/models/screener.server"
import { SectionComponent } from "./Section"
import { Form } from "@remix-run/react"
import { nextQuestion, nextSection, useScreenerContext } from "~/states/screener"

type Props = {
  sections: Section[]
}

export function SectionsStepper({ sections }: Props) {
  const context = useScreenerContext()

  const {
    state: {
      sections: {
        currentIndex,
        currentSectionDone
      },
      questions
    },
    updateState
  } = context

  const currentSection = sections[currentIndex]
  const currentQuestionIndex = questions.currentIndex

  useEffect(() => {
    if (currentSectionDone) {
      nextSection(currentIndex, sections, context)
    }
  }, [context, sections, currentSectionDone, currentIndex])

  return (
    <Form
      onClick={
        (e) => {
          const button = (e.target as HTMLFormElement).parentElement as HTMLButtonElement
          const value = Number(button.getAttribute("data-value") as string)
          const questionAnswer = {
            value,
            question_id: currentSection.questions[currentQuestionIndex].question_id,
            question: currentSection.questions[currentQuestionIndex].title
          }
          updateState((state) => ({
            ...state,
            answers: [...state.answers, questionAnswer],
            answered: state.answered + 1
          }))
          nextQuestion(currentQuestionIndex, currentSection, context)
        }
      }>
      {
        !currentSectionDone &&
        <SectionComponent index={currentIndex} total={sections.length} section={currentSection} />
      }
    </Form>
  )
}