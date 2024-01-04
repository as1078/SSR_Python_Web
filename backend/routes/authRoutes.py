from fastapi import APIRouter

authRouter = APIRouter()

@authRouter.post('/signup')
async def signup(req):
    result = (req['body'])
