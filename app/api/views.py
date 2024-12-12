from fastapi import APIRouter, status, Header, HTTPException
from fastapi.responses import JSONResponse
from app.db import USERS
from jose.exceptions import JWTError
from .validators import (
    LoginValidate,
    RefreshValidate,
    check_token
)
from .utils import create_token

router = APIRouter()


@router.get('/')
async def index(Authorization: str = Header(None)):
    if not Authorization or 'Bearer ' not in Authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    token = Authorization.split()[1]
    try:
        if not check_token(token):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Incorrect token'
            )
    except JWTError:
        raise HTTPException(
            detail='Incorrect token',
            status_code=status.HTTP_401_UNAUTHORIZED
        )

    return {'data': 'some top secret information'}


@router.post('/login')
async def login(request_user: LoginValidate):
    username = request_user.username
    if not (user := USERS.get(username)):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found')
    if user['password'] != request_user.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect password')
    tokens = create_token(username)
    return JSONResponse(
        content=tokens,
        status_code=status.HTTP_201_CREATED
    )


@router.post('/refresh')
async def refresh(request_refresh: RefreshValidate):
    username = request_refresh.username
    token = request_refresh.refresh_token
    if not USERS.get(username):
        raise HTTPException(
            detail='User not found',
            status_code=status.HTTP_404_NOT_FOUND
        )
    try:
        if not check_token(token=token, refresh=True):
            raise HTTPException(
                detail='Incorrect token',
                status_code=status.HTTP_401_UNAUTHORIZED
            )
    except JWTError:
        raise HTTPException(
            detail='Incorrect token',
            status_code=status.HTTP_401_UNAUTHORIZED
        )
    tokens = create_token(username)
    return JSONResponse(
        content=tokens,
        status_code=status.HTTP_201_CREATED
    )
