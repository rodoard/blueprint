import type { Answer, Question } from "~/models/screener.server"
import { QuestionComponent } from "./Question"
import { useScreenerContext } from "~/states/screener"

type Props = {
  questions: Question[]
  answers: Answer[]
}

export const QuestionsStepper = ({ questions, answers }: Props) => {
  const {
    state: {
      questions: {
        currentIndex
      } } } = useScreenerContext()

  const currentQuestion = questions[currentIndex]
  const total = questions.length
  return <QuestionComponent index={currentIndex} total={total} question={currentQuestion} answers={answers} />

}