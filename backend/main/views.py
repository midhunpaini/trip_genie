from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail, EmailMessage
from trip_genie.settings import EMAIL_HOST_USER




class ContactView(APIView):
    def post(self, request):
        name = request.data['name']
        email = request.data['email']
        message = request.data['message']

        # send email
    
        send_mail(
            name,
            message,
            email,
            [EMAIL_HOST_USER]
        )
        email = EmailMessage(
            "Hello",
            "Thank you for contacting us",
            EMAIL_HOST_USER,
            reply_to=[email],
            headers={"Message-ID": "foo"},
        )

        return Response({"success":"email sent"})
    


            