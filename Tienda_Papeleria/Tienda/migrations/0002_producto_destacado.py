# Generated by Django 5.2.3 on 2025-06-28 19:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tienda', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='destacado',
            field=models.BooleanField(default=False, help_text='¿Mostrar este producto en la página principal?'),
        ),
    ]
