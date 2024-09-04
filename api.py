from fastapi import FastAPI
import uvicorn

from src.config.logger import log
from src.config.env import settings
from src.api.twitter import get_twitter_user_details, get_user_tweets

app = FastAPI()

@app.get("/")
async def root():
    log.info(r"Probed the endpoint '/'")
    return {"message": "Parsing"}

@app.get("/api/v1/twitter/userdetails/{username}")
async def root(username: str):
    user_details = await get_twitter_user_details(username)
    return {"userdetails": user_details}

@app.get("/api/v1/twitter/usertweets/{username}")
async def root(username: str):
    user_tweets = await get_user_tweets(username, "user", 5)
    print(user_tweets)
    return {"usertweets": user_tweets}

def main():
    uvicorn.run(
        "api:app",
        host=settings.APP.API_HOST,
        port=settings.APP.API_PORT,
        log_level=settings.APP.LOG_LEVEL,
    )

if __name__ == "__main__":
    main()