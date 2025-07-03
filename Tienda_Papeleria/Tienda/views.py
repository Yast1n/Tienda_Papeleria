def about(request):
    return render(request, 'Tienda/about.html')
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
# Create your views here.

from .models import Categoria, Producto

def home(request):
    categorias = Categoria.objects.all()
    productos_destacados = Producto.objects.filter(destacado=True)
    # Si querés limitar a 2 o 3 por categoría, avisame y ajusto la consulta
    return render(request, 'Tienda/home.html', {
        'categorias': categorias,
        'productos_destacados': productos_destacados,
    })



def productos(request):
    categorias = Categoria.objects.all()
    productos = Producto.objects.all()
    categoria_id = request.GET.get('categoria')
    buscar = request.GET.get('buscar')

    if categoria_id:
        productos = productos.filter(categoria_id=categoria_id)
    if buscar:
        productos = productos.filter(nombre__icontains=buscar)
    
    # PAGINACIÓN
    paginator = Paginator(productos, 8)  # 8 productos por página, ajustá si querés más/menos
    page_number = request.GET.get('page')
    productos_page = paginator.get_page(page_number)
    
    return render(request, 'Tienda/productos.html', {
        'categorias': categorias,
        'productos': productos_page,
    })




def detalle_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    return render(request, 'Tienda/detalle_producto.html', {'producto': producto})
