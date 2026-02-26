from django.contrib import admin
from .models import UserDetails,Expense
# Register your models here.
@admin.register(UserDetails)

class UserDetailAdmin(admin.ModelAdmin):
    list_display=['id','FullName','Email','Password','RegDate']


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display=['id','UserId','ExpenseDate','ExpenseItem','ExpenseCost','NoteDate']