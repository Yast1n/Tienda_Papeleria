from django.shortcuts import render

# Create your views here.

from .models import Categoria, Producto

def home(request):
    categorias = Categoria.objects.all()
    productos_por_categoria = []

    for categoria in categorias:
        # Trae los primeros 3 productos de cada categoría (puedes cambiar el número)
        productos = Producto.objects.filter(categoria=categoria)[:3]
        if productos:  # Solo agrega si hay productos
            productos_por_categoria.append({
                'categoria': categoria,
                'productos': productos,
            })

    return render(request, 'Tienda/home.html', {
        'productos_por_categoria': productos_por_categoria,
    })
