from rest_framework.throttling import AnonRateThrottle

class CustomRateThrottle(AnonRateThrottle):
    THROTTLE_RATES = {
        'minute': '10/minute',
        'hour': '100/hour'
    }
