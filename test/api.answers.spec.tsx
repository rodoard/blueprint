import app from "../app";
import request from "supertest"

describe("POST ", () => {
  it("returns appropriate level 2 assessment", async () => {
    const response = await request(app).post(`/api/answers`)
      .send(patientAnswers())
    expect(response.body).toMatchObject({
      "results": ["ASRM", "PHQ-9"]
    })
  });
})

function patientAnswers() {
  return {
    "answers": [
      {
        "value": 1,
        "question_id": "question_a"
      },
      {
        "value": 0,
        "question_id": "question_b"
      },
      {
        "value": 2,
        "question_id": "question_c"
      },
      {
        "value": 3,
        "question_id": "question_d"
      },
      {
        "value": 1,
        "question_id": "question_e"
      },
      {
        "value": 0,
        "question_id": "question_f"
      },
      {
        "value": 1,
        "question_id": "question_g"
      },
      {
        "value": 0,
        "question_id": "question_h"
      }
    ]
  }
}