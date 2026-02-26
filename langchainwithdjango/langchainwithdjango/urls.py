from django.contrib import admin
from django.urls import path
from expense import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/',views.SignUp,name='signup'),
    path('login/',views.Login,name='login'),
    path('add_expense/',views.AddExpense,name='add_expense'),
    path('manage_expense/<int:userId>/',views.ManageExpense,name='manage_expense'),
    path('update_expense/<int:expense_id>',views.Update_Expense,name='update_expense'),
    path('delete_expense/<int:expid>',views.Delete_Expense,name='delete_expense'),
    path('search_expense/<int:userId>/',views.Search_Expense,name='search_expense'),
    path('change_password/<int:userId>/',views.ChangePassword,name='change_password'),
    path('chat/',views.ChatDetailsView,name='chat'),
]
