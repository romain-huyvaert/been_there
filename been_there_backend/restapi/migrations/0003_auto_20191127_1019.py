# Generated by Django 2.2.7 on 2019-11-27 10:19

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0002_auto_20191121_0936'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='point',
            field=django.contrib.gis.db.models.fields.PointField(geography=True, srid=4326, unique=True),
        ),
        migrations.AlterField(
            model_name='review',
            name='text',
            field=models.CharField(max_length=500),
        ),
        migrations.DeleteModel(
            name='Pinpoint',
        ),
    ]
