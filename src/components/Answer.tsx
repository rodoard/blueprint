import { Button } from "flowbite-react";
import type { Answer } from "~/models/screener.server";

type Props = { answer: Answer }

export const AnswerComponent = ({ answer: { value, title } }: Props) => {
  return (
    <Button data-value={value} gradientDuoTone="greenToBlue"
      outline>
      {title}
    </Button>
  )
}