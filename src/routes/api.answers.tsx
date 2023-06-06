import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { postPatientScreenerAnswers } from "~/utils/patient";
import { getCurrentUserId } from "~/utils/session.server";
import invariant from "tiny-invariant";
import { getPatient } from "~/models/patient.server";
import validatePostAnswers from "~/validators/postAnswers";

export function loader() {
  throw new Response("Not Found", {
    status: 404
  });
}

export const action = async ({ request, params }: ActionArgs) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }

  const patientId = await getCurrentUserId(request);

  if (patientId === null) {
    return json({ message: "You are not autorized to access this resource." }, 401);
  }

  const patient = await getPatient(patientId);
  invariant(patient, `Patient not found: ${patientId}`);

  let payload
  try {
    if (request.headers.get("Content-Type") === "application/json") {
      payload = await request.json()
    } else {
      const data = (await request.formData()).get("data") as string
      if (typeof data === "string") {
        payload = JSON.parse(data)
      }
    }
  } catch (e) { }
  if (!validatePostAnswers(payload)) {
    return json({ message: "Post data is not valid" }, 400);
  }
  const result = await postPatientScreenerAnswers({ patient, answers: payload.answers })
  return json(result, 200);
}
