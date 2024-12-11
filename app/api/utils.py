from jose import jwt
from datetime import datetime, timedelta, timezone
from app.db import TOKENS, USERS


def create_token(data):
    # todo move to .env secret
    to_decode = USERS[data].copy()
    expire_token = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_decode.update({'expire': expire_token.isoformat()})
    secret = 's3cr3t_k3y_sh0uld_b3_g00d_and_r@nd0m'
    token = jwt.encode(to_decode, secret)
    refresh_token, expire_refresh_token = get_refresh_token(to_decode, secret)
    tokens = {
        'token': token,
        'expire': expire_token,
        'refresh': refresh_token,
        'expire_refresh': expire_refresh_token}
    TOKENS[data] = tokens


def get_refresh_token(data, secret):
    expire_token = datetime.now(timezone.utc) + timedelta(days=30)
    new_secret = secret + 'refresh'
    token = jwt.encode(data, new_secret)
    return token, expire_token
