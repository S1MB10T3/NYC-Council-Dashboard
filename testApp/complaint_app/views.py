from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class ComplaintViewSet(viewsets.ModelViewSet):
  """
    This view is for a API get request that creates a list of all complaints
    from the current user's district.
  """

  http_method_names = ['get']
  permission_classes = [IsAuthenticated]
  serializer_class = ComplaintSerializer

  def get_queryset(self):
    # Get all complaints from the user's district
    user = UserProfile.objects.get(user = self.request.user)
    usersDistrict = user.district
    if len(usersDistrict) == 1:
        district = "NYCC0" + usersDistrict
    else:
        district = "NYCC" + usersDistrict
    return Complaint.objects.filter(account=district)

class OpenCasesViewSet(viewsets.ModelViewSet):
  """
    This view is for a API get request that creates a list of all open complaints
    from the current user's district by filters out cases that have a closedate
    value of Null.
  """

  http_method_names = ['get']
  permission_classes = [IsAuthenticated]
  serializer_class = ComplaintSerializer

  def get_queryset(self):
    user = UserProfile.objects.get(user = self.request.user)
    usersDistrict = user.district
    if len(usersDistrict) == 1:
        district = "NYCC0" + usersDistrict
    else:
        district = "NYCC" + usersDistrict
    return Complaint.objects.filter(account=district).filter(closedate=None)

class ClosedCasesViewSet(viewsets.ModelViewSet):
  """
    This view is for a API get request that creates a list of all closed complaints
    from the current user's district by excluding cases that have a closedate value
    of Null.
  """

  http_method_names = ['get']
  permission_classes = [IsAuthenticated]
  serializer_class = ComplaintSerializer

  def get_queryset(self):
    # Get all complaints from the user's district
    user = UserProfile.objects.get(user = self.request.user)
    usersDistrict = user.district
    if len(usersDistrict) == 1:
        district = "NYCC0" + usersDistrict
    else:
        district = "NYCC" + usersDistrict
    return Complaint.objects.filter(account=district).exclude(closedate=None)

class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  """
    This view is for an API GET request that sends the top 3 complaint types.
  """

  http_method_names = ['get']
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    # Get all complaints from the user's district
    user = UserProfile.objects.get(user = self.request.user)
    usersDistrict = user.district
    if len(usersDistrict) == 1:
     district = "NYCC0" + usersDistrict
    else:
     district = "NYCC" + usersDistrict
    return Complaint.objects.get().filter(account=district)
