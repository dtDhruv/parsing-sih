import pandas as pd
from ntscraper import Nitter

from src.config.logger import log

scraper = Nitter()

async def get_twitter_user_details(username: str) -> dict:
    try:
        user_profile_info = scraper.get_profile_info(username)
        return user_profile_info
    except Exception as e:
        log.error("failed to fetch twitter details for user %s", username)
        log.exception(e)
        return {}

async def get_user_tweets(name: str, modes: str, no: int):
    try:
        tweets = scraper.get_tweets(name, mode = modes, number=no)
        final_tweets = []
        for x in tweets['tweets']:
            data = [x['link'], x['text'],x['date'],x['stats']['likes'],x['stats']['comments']]
            final_tweets.append(data)
        dat= pd.DataFrame(final_tweets, columns =['twitter_link','text','date','likes','comments'])
        return dat.to_json()
    except Exception as e:
        log.error("failed to fetch twitter tweets for user %s", name)
        log.exception(e)
        return {}