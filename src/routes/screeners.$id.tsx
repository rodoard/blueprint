import type { LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getScreener } from "~/models/screener.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, Footer, Progress } from "flowbite-react";
import { SectionsStepper } from "~/components/SectionsStepper";
import { resetScreenerContext, useScreenerContext } from "~/states/screener";
import { ScreeningCompleted } from "~/components/ScreeningCompleted";
import { useEffect } from "react";

export async function loader({ params }: LoaderArgs) {
  invariant(params.id, "screener id must be provided");
  const id = params.id
  const screener = await getScreener(id);
  if (!screener) {
    throw new Response("Screener not found.", {
      status: 404,
    });
  }
  return json({ screener });
}

export default function Screener() {
  const { screener: {
    full_name,
    content: {
      sections,
      display_name,
    }
  } } = useLoaderData<typeof loader>();

  const context = useScreenerContext()

  const totalQuestions = sections.map(section => section.questions.length).reduce((acc, count) => acc + count, 0)
  const assessmentsDone = sections.length == 0 || context.state.assessmentsDone
  const answered = context.state.answered
  const percentAnswered = Math.floor(100 * (answered / totalQuestions))

  useEffect(() => {
    resetScreenerContext(context.updateState)
  }, [context.updateState])

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl pt-4 font-bold text-center mb-6">
        {full_name}
      </h1>
      <p className="text-lg font-normal italic lg:text-xl text-center mb-12">
        Please complete the screener below, you will be guided through a set of questions.
      </p>

      <div className="mb-12">
        <Card >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <p>
              {display_name}
            </p>
          </h5>
          {
            !assessmentsDone &&
            <SectionsStepper sections={sections} />
          }
          {
            assessmentsDone &&
            <ScreeningCompleted />
          }
        </Card>
      </div>
      <p className="text-sm font-normal mb-2 text-center">
        Answered {answered}/{totalQuestions} questions
      </p>
      <div className="flex justify-center">

        <div className=" rounded-lg p-5 w-5/6 border-2 border-green-900  ">
          <Footer>
            <div className="w-full">
              <Progress
                labelProgress
                progress={percentAnswered}
                size="lg"
              />
            </div>
          </Footer>
        </div>
      </div>

    </div >
  );
}