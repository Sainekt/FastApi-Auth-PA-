from fastapi import APIRouter, status, Header, HTTPException
from fastapi.responses import JSONResponse
from app.db import USERS, TOKENS
from .validators import (
    LoginValidate,
    RefreshValidate,
    expire_validate,
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
    if not check_token(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect token'
        )

    return {'data': 'Какая-то супер секретная инфа...'}


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
    create_token(username)
    return JSONResponse(
        content={
            'token': TOKENS[username]['token'],
            'refresh': TOKENS[username]['refresh']},
        status_code=status.HTTP_201_CREATED
    )


@router.post('/refresh')
async def refresh(request_refresh: RefreshValidate):
    username = request_refresh.username
    token = request_refresh.refresh_token

    if not (tokens := TOKENS.get(username)):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found'
        )
    if token != tokens['refresh']:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Incorrect refresh token'
        )
    if not expire_validate(tokens['expire_refresh']):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Refresh token expired'
        )
    create_token(username)
    return JSONResponse(
        content={
            'token': TOKENS[username]['token'],
            'refresh': TOKENS[username]['refresh']},
        status_code=status.HTTP_201_CREATED
    )
