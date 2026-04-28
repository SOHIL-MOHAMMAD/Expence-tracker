from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class ExpenceSerializer(serializers.ModelSerializer):
  category_name = serializers.CharField(source='category.name', read_only=True)
  class Meta:
    model = models.Add_expenses
    fields = ['id','name', 'amount', 'date', 'category','category_name', 'images', 'description']


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Category
    fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Task
    fields = ['id', 'tasks']