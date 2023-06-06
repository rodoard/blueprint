import type { Section } from "~/models/screener.server"
import { QuestionsStepper } from "./QuestionsStepper"

type Props = {
  section: Section
  total: number
  index: number
}

export const SectionComponent = ({
  total, index,
  section: {
    title, answers, questions
  } }: Props) => {
  return (
    <fieldset className="rounded-lg border border-solid border-gray-300 p-4">
      <legend className="text-sm">Section {index + 1} out of {total}</legend>
      <h4 className="text-lg font-normal">
        <p>
          {title}
        </p>
      </h4>
      <QuestionsStepper answers={answers} questions={questions} />
    </fieldset>
  )
}