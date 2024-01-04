from fastapi import FastAPI

from config.config_mongo import connect_mongo
from schemas.schemas import list_serial
from routes.clipRoutes import clipRouter
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


connect_mongo()
origins = ["http://localhost:3000"]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(clipRouter)


# if __name__ == '__main__':
#     uvicorn.run(app, port=3000)

