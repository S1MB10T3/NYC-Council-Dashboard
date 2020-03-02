from django.urls import path
from rest_framework import routers
from .views import (ComplaintViewSet,
                    OpenCasesViewSet,
                    ClosedCasesViewSet,
                    TopComplaintTypeViewSet,
                    ConstituentsCasesViewSet)


router = routers.SimpleRouter()
router.register(r'^openCases', OpenCasesViewSet, base_name='openCases')
router.register(r'^closedCases', ClosedCasesViewSet, base_name='closedCases')
router.register(r'^topComplaints', TopComplaintTypeViewSet, base_name='topComplaints')
router.register(r'^constituentsComplaints', ConstituentsCasesViewSet, base_name='constituentsComplaints')
router.register(r'', ComplaintViewSet, base_name='complaint')

urlpatterns = []
urlpatterns += router.urls
