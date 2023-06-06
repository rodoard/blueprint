import { useOutletContext } from "@remix-run/react"
import type { Section } from "~/models/screener.server"

export type QuestionAnswer = {
  value: number
  question_id: string
  question: string
}

export type ScreenerState = {
  sections: {
    currentIndex: number
    currentSectionDone: boolean
  },
  questions: {
    currentIndex: number
  }
  answers: QuestionAnswer[]
  answered: number
  assessmentsDone: boolean
}

const ScreenerInitialState: ScreenerState = {
  sections: {
    currentIndex: 0,
    currentSectionDone: false
  },
  questions: {
    currentIndex: 0
  },
  answers: [],
  answered: 0,
  assessmentsDone: false
}

export function getScreenerInitialState(): ScreenerState {
  return ScreenerInitialState
}

type ScreenerContextType = {
  state: ScreenerState,
  updateState: React.Dispatch<React.SetStateAction<ScreenerState>>
};

export function useScreenerContext() {
  return useOutletContext<ScreenerContextType>();
}

export function resetScreenerContext(updateState: React.Dispatch<React.SetStateAction<ScreenerState>>) {
  updateState(state => ({
    ...ScreenerInitialState
  }))
}
export function nextQuestion(currentIndex: number, { questions }: Section, { updateState }: ScreenerContextType) {
  const next = currentIndex + 1;
  if (next >= questions.length) {
    updateState((state) => ({
      ...state,
      sections: {
        ...state.sections,
        currentSectionDone: true
      },
    }))
  } else {
    updateState((state) => ({
      ...state,
      questions: {
        ...state.questions,
        currentIndex: next
      }
    }))
  }
}

export function nextSection(currentIndex: number, sections: Section[], { updateState }: ScreenerContextType) {
  const next = currentIndex + 1;
  console.log('next section', next);
  if (next >= sections.length) {
    updateState((state) => ({
      ...state,
      assessmentsDone: true
    }))
  } else {
    updateState((state) => ({
      ...state,
      sections: {
        ...state.sections,
        currentIndex: next,
        currentSectionDone: false
      },
      questions: {
        ...state.questions,
        currentIndex: 0
      }
    }))
  }
}