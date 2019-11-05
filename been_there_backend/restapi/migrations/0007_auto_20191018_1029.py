# Generated by Django 2.2.6 on 2019-10-18 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0006_worldmap_filter'),
    ]

    operations = [
        migrations.AddField(
            model_name='worldmap',
            name='cities',
            field=models.CharField(default=0, max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='worldmap',
            name='country',
            field=models.CharField(default=0, max_length=55),
            preserve_default=False,
        ),
    ]