from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import UserDetails,Expense
from django.db.models import Sum
from expense.test import get_result


# import os
# from backend.langchain.chat_models import init_chat_model
# # from langchain.chat_models import init_chat_model


@csrf_exempt
def SignUp(request):
    if request.method=="POST":
        data=json.loads(request.body)
        fullname=data.get('FullName')
        email=data.get('Email')
        password=data.get('Password')
        if UserDetails.objects.filter(Email=email).exists():
            return JsonResponse({'message':'Email already Exists'},status=400)
        UserDetails.objects.create(FullName=fullname,Email=email,Password=password)
        return JsonResponse({'message':'User register successfull '},status=201)

@csrf_exempt
def Login(request):
    if request.method=="POST":
        data=json.loads(request.body)
        print("Received login data:", data)
        email=data.get('Email')
        password=data.get('Password')
        try:
            user=UserDetails.objects.get(Email=email,Password=password)
            return JsonResponse({"message":"Login Successfull","UserId":user.id,"UserName":user.FullName},status=200,safe=False)
        except UserDetails.DoesNotExist:
            return JsonResponse({'message':'Invalid Credentials'},status=400)

@csrf_exempt
def AddExpense(request):
    if request.method=="POST":
        data=json.loads(request.body)
        UserId=data.get('UserId')
        Expense_Date=data.get('ExpenseDate')
        Expense_Item=data.get('ExpenseItem')
        Expense_Cost=data.get('ExpenseCost')
        user=UserDetails.objects.get(id=UserId)
        try:
            Expense.objects.create(UserId=user,ExpenseDate=Expense_Date,ExpenseItem=Expense_Item,ExpenseCost=Expense_Cost)
            return JsonResponse({"message":"Expense Details Add Successfully"},status=201,safe=False)
        except Exception as e:
            return JsonResponse({'message':'something went wrong','error':str(e)},status=400)
    
@csrf_exempt
def ManageExpense(request,userId):
    if request.method=="GET":
        try:
            expense=Expense.objects.filter(UserId_id=userId)
            exp_list=list(expense.values())
            return JsonResponse(exp_list,safe=False)
        except Exception as e:
            return JsonResponse({'message':'something went wrong','error':str(e)},status=400)           

@csrf_exempt
def Update_Expense(request,expense_id):
    if request.method=="PUT":
        data=json.loads(request.body)
        try:
            expense=Expense.objects.get(id=expense_id)
            expense.ExpenseDate=data.get('ExpenseDate',expense.ExpenseDate)
            expense.ExpenseItem=data.get('ExpenseItem',expense.ExpenseItem)
            expense.ExpenseCost=data.get('ExpenseCost',expense.ExpenseCost)
            expense.save()
            return JsonResponse({'message':'Expense update successfull'})
        except Exception as e:
            return JsonResponse({'message':'something went wrong','error':str(e)},status=400)

@csrf_exempt
def Delete_Expense(request,expid):
    if request.method=="DELETE":
        try:
            expense=Expense.objects.get(id=expid)
            expense.delete()
            return JsonResponse({'message':'Expense Delete successfull'})
        except Exception as e:
            return JsonResponse({'message':'something went wrong','error':str(e)},status=400)

@csrf_exempt
def Search_Expense(request,userId):
    if request.method=="GET":
        from_date=request.GET.get('from_date')
        to_date=request.GET.get('to_date')
        try:
            expenses=Expense.objects.filter(UserId_id=userId,ExpenseDate__range=[from_date,to_date])
            exp_list=list(expenses.values())        
            agg=expenses.aggregate(Sum('ExpenseCost'))
            total=agg['ExpenseCost__sum'] if agg['ExpenseCost__sum'] is not None else 0
            return JsonResponse({'expense':exp_list,'total':total},safe=False)

        except Exception as e:
            return JsonResponse({'message':'something went wrong','error':str(e)},status=404)


@csrf_exempt
def ChangePassword(request,userId):
    if request.method=="POST":
        data=json.loads(request.body)
        oldpassword=data.get('OldPassword')
        newpassword=data.get('NewPassword')
        try:
            user=UserDetails.objects.get(id=userId)
            if user.Password!=oldpassword:
                return JsonResponse({'message':'Old Password incorrect..!'},status=400)
            user.Password=newpassword
            user.save()
            return JsonResponse({'message':'Password Change successfull..!'},status=200)
        except UserDetails.DoesNotExist as e:
            return JsonResponse({'message':'User not found','error':str(e)},status=404)

@csrf_exempt
def ChatDetailsView(request):   
    if request.method=="POST":
        data=json.loads(request.body)
        message=data
        # print("Received chat data:", message)
        response_message = get_result(message)
        print("Response from chat model:", response_message)
        return JsonResponse({'message':'Chat data received','chat_data':response_message},status=201)
    return JsonResponse({'message':'Invalid chat request'},status=400)
    



