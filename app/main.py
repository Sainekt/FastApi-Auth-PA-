from fastapi import FastAPI
from .api.views import router
from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

app = FastAPI()
app.include_router(router)
