from pydantic import BaseModel
from datetime import datetime, timezone
from app.db import TOKENS


class LoginValidate(BaseModel):
    username: str
    password: str


class RefreshValidate(BaseModel):
    username: str
    refresh_token: str


def expire_validate(time):
    if time > datetime.now(timezone.utc):
        return True
    return False


def check_token(token):
    tokens = TOKENS.values()
    for token_in_db in tokens:
        if token_in_db['token'] == token:
            return expire_validate(token_in_db['expire'])
    return False
