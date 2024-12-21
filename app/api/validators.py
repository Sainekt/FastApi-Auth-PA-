from pydantic import BaseModel
from datetime import datetime, timezone
from .utils import decoding_token
from dateutil import parser


class LoginValidate(BaseModel):
    username: str
    password: str


class RefreshValidate(BaseModel):
    username: str
    refresh_token: str


def expire_validate(time):
    time = parser.parse(time)
    if time > datetime.now(timezone.utc):
        return True, time
    return False, False


def check_token(token, refresh=False):
    decode_token = decoding_token(token, refresh)
    return expire_validate(decode_token['expire'])
