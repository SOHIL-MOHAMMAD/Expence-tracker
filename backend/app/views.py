from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from .models import Add_expenses, Category , Task
from .serializer import ExpenceSerializer , CategorySerializer ,TaskSerializer
from rest_framework import viewsets
# Create your views here.

class ExpenseView(viewsets.ModelViewSet):
  queryset = Add_expenses.objects.all()
  serializer_class = ExpenceSerializer
  
  
class Category_view(viewsets.ModelViewSet):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer


class Taskview(viewsets.ModelViewSet):
  queryset = Task.objects.all()
  serializer_class = TaskSerializer