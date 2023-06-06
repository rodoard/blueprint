import type { Question } from "~/models/screener.server";
import type { Answer } from "~/models/screener.server"
import { AnswerComponent } from "./Answer";

type Props = {
  question: Question,
  answers: Answer[]
  total: number
  index: number
}

export const QuestionComponent = ({ total, index, question, answers }: Props) => {
  return (
    <fieldset className="rounded-lg border border-solid border-gray-300 p-4 m-4">
      <legend className="text-sm">Question {index + 1} out  of {total}</legend>
      <h5>{question.title}</h5>
      <hr className="h-px my-4 bg-gray-200 border-0 "></hr>
      <div className="flex rounded-md justify-center space-x-3">
        {
          answers.map((answer, index) => <AnswerComponent key={index} answer={answer} />)
        }

      </div>
    </fieldset>
  )
}