from functools import wraps
from jwt import decode as jwt_decode, ExpiredSignatureError
from rest_framework.exceptions import AuthenticationFailed

def validate_jwt_token(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('No JWT token found.')

        try:
            payload = jwt_decode(token, 'secret', algorithms=['HS256'])
            request.jwt_payload = payload  # Attach the decoded payload to the request object
        except ExpiredSignatureError:
            raise AuthenticationFailed('JWT token has expired.')

        return view_func(request, *args, **kwargs)

    return wrapper
