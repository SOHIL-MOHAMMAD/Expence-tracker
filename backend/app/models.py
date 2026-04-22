from django.db import models
from django.contrib.auth.models import User
# Create your models here.
  
class Category(models.Model):
  name = models.CharField(max_length=200)
  def __str__(self):
    return self.name
  
class Add_expenses(models.Model):
  name = models.CharField(max_length=200)
  amount = models.DecimalField(max_digits=10, decimal_places=2) 
  date = models.DateField()
  category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='add_expenses')
  images = models.ImageField(upload_to='images/', null=True, blank=True) 
  description = models.TextField(null=True, blank=True)
  
  def __str__(self):
    return self.name
  
class Task(models.Model):
  name = models.CharField(max_length=200)
  due_date = models.DateTimeField()
  completed = models.BooleanField(default=False)
  
  def __str__(self):
    return self.name
  
  
class Wallet(models.Model):
  total_budjet = models.BigIntegerField()
  
  def __str__(self):
    return self.total_budjet