from jose import jwt
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
if not SECRET_KEY:
    raise ValueError('SECRET_KEY does not exists')


def create_token(data) -> dict:
    to_decode = {'data': data}
    expire_token = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_decode.update({'expire': expire_token.isoformat()})
    token = jwt.encode(to_decode, SECRET_KEY)
    refresh_token = get_refresh_token(to_decode)
    return {'token': token, 'refresh': refresh_token}


def get_refresh_token(data) -> dict:
    expire_token = datetime.now(timezone.utc) + timedelta(days=30)
    data['expire'] = expire_token.isoformat()
    new_secret = SECRET_KEY + 'refresh'
    token = jwt.encode(data, new_secret)
    return token


def decoding_token(token, refresh=False) -> dict:
    if refresh:
        return jwt.decode(token, SECRET_KEY + 'refresh')
    return jwt.decode(token, SECRET_KEY)
