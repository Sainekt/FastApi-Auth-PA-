from fastapi import FastAPI
from .api.views import router
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
import sys

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

app = FastAPI()
origins = [
    "http://localhost:3000",  # Разрешаем запросы только с этого домена
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Разрешенные источники
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы
    allow_headers=["*"],  # Разрешаем все заголовки
)

app.include_router(router)
