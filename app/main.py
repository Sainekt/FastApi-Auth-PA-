from pathlib import Path
import sys
from fastapi import FastAPI
from app.api.views import router


BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

app = FastAPI()
app.include_router(router)
