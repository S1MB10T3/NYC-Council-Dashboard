from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
# Create your views here.


"""
    Note: User district filter should be its own function. - Rokney
"""


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
        user = UserProfile.objects.get(user=self.request.user)
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
        user = UserProfile.objects.get(user=self.request.user)
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
        user = UserProfile.objects.get(user=self.request.user)
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

    def list(self, request):
        # Create filter for user's district
        user = UserProfile.objects.get(user=self.request.user)
        usersDistrict = user.district
        if len(usersDistrict) == 1:
            district = "NYCC0" + usersDistrict
        else:
            district = "NYCC" + usersDistrict
        lists_of_complaint_types = Complaint.objects.values(
            'complaint_type').filter(account=district).exclude(complaint_type=None)

        complaint_type_dict = {}

        # Create a dictionary of complaint_type_dict
        for complaint in lists_of_complaint_types:
            complaint_type_dict[complaint['complaint_type']] = 0

        # Add values/count of complaints
        for complaint in lists_of_complaint_types:
            complaint_type_dict[complaint['complaint_type']] += 1

        # Sorts items and strinks list to just the top 3
        top_complaint_counts = sorted(
            complaint_type_dict.items(), key=lambda x: x[1], reverse=True)[:3]

        return Response(top_complaint_counts)


class ConstituentsCasesViewSet(viewsets.ModelViewSet):
    """
      This view is for a API get request that creates a list of all Constituents complaints
      from the current user's district
    """

    http_method_names = ['get']
    permission_classes = [IsAuthenticated]
    serializer_class = ComplaintSerializer

    def get_queryset(self):
        user = UserProfile.objects.get(user=self.request.user)
        usersDistrict = user.district
        if len(usersDistrict) == 1:
            district = "NYCC0" + usersDistrict
        else:
            district = "NYCC" + usersDistrict
        return Complaint.objects.filter(council_dist=district)
