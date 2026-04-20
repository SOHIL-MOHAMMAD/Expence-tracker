from django.urls import path , include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register(r'expenses', views.ExpenseView)
router.register(r'category', views.Category_view)
router.register(r'task', views.Taskview)

urlpatterns = [
   path('', include(router.urls)),
]
