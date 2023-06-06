import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { getScreenerList } from "~/models/screener.server";

export async function loader() {
  return json(await getScreenerList());
}

export default function Index() {
  const screeners = useLoaderData<typeof loader>();
  const [screener, setScreener] = useState("")
  const navigate = useNavigate()

  const screenerSelected = (evt: any) => {
    if (evt.target.value.length > 0) {
      setScreener(evt.target.value)
    }
  }

  useEffect(() => {
    if (screener.length > 0) {
      navigate(`/screeners/${screener}`)
    }
  }, [screener, navigate])

  return (
    <div className="container  mx-auto">
      <h1 className="text-3xl pt-4 font-bold text-center mb-12">
        Welcome to the Diagnostic Screener Demo
      </h1>
      <div className="mb-16">
        <h2 className=" text-center mb-2 text-lg">
          Please Choose a screener to get started
        </h2>
        <div className=" flex justify-center">
          <div className="grid grid-cols-1 gap-6">

            <Select
              id="screeners"
              required
              onChange={screenerSelected}
              defaultValue={""}
            >
              <option value="">Select screener</option>
              {
                screeners?.map(
                  ({ name, id }) => <option key={id} value={id}>{name}</option>
                )
              }
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}