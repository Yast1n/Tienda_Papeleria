from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('productos/', views.productos, name='productos'),
    path('producto/<int:pk>/', views.detalle_producto, name='detalle_producto'),
]

