from django.db import models
# Create your models here.

class UserDetails(models.Model):
    FullName=models.CharField(max_length=100)
    Email=models.EmailField(max_length=100,unique=True)
    Password=models.CharField(max_length=50)
    RegDate=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.FullName}'

class Expense(models.Model):
    UserId=models.ForeignKey(UserDetails,on_delete=models.CASCADE)
    ExpenseDate=models.DateField(null=True,blank=True)
    ExpenseItem=models.CharField(max_length=50)
    ExpenseCost=models.CharField(max_length=50)
    NoteDate=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.UserId}-{self.ExpenseDate}-{self.ExpenseCost}'


