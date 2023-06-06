import { useActionData, useFetcher } from "@remix-run/react"
import { Accordion, Button, ListGroup, Spinner, Table } from "flowbite-react"
import { useEffect, useState } from "react"
import type { QuestionAnswer } from "~/states/screener";
import { useScreenerContext } from "~/states/screener"

type PostData = {
  answers: Omit<QuestionAnswer, "question">[]
}

type PostResponse = { results: string[] } | undefined

export const Summary = () => {
  const {
    state: {
      answers
    }
  } = useScreenerContext()
  const [postResponse, setPostResponse] = useState<PostResponse>(undefined)
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      const formData = new FormData()
      const postData: PostData = {
        answers: answers.map(({ value, question_id }) => {
          return { value, question_id }
        })
      }
      formData.set("data", JSON.stringify(postData))
      fetcher.submit(formData, { method: "post", action: "/api/answers" })
    }
    if (!postResponse && fetcher.data) {
      setPostResponse(fetcher.data)
    }
  }, [answers, fetcher, postResponse]);
  if (!postResponse) {
    return <Button>
      <Spinner aria-label="Spinner button example" />
      <span className="pl-3">
        Please wait fetching response from server...
      </span>
    </Button>
  }
  return (
    <Accordion collapseAll>
      <Accordion.Panel>
        <Accordion.Title>
          You answered:
        </Accordion.Title>
        <Accordion.Content>
          <Table>
            <Table.Head>
              <Table.HeadCell>
                Question
              </Table.HeadCell>
              <Table.HeadCell>
                Answer
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {
                answers.map(
                  ({ question, value }, index) => {
                    return <Table.Row key={index}>
                      <Table.Cell>
                        {question}
                      </Table.Cell>
                      <Table.Cell>
                        {value}
                      </Table.Cell>
                    </Table.Row>
                  })
              }
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>
          You qualified for the following level 2 assessments:
        </Accordion.Title>
        <Accordion.Content>
          <ListGroup>
            {
              postResponse.results.map(
                (assessment: string, index) =>
                  <ListGroup.Item key={index}>{assessment}</ListGroup.Item>
              )

            }
          </ListGroup>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  )
}