import config from "../../config"

class UserSession {
  public get(key: string): string {
    return config.DEFAULT_PATIENT_ID;
  }
}

const userSession = new UserSession()

async function getUserSession(request: Request): Promise<UserSession> {
  return userSession
}

export async function getCurrentUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return null;
  }
  return userId;
}