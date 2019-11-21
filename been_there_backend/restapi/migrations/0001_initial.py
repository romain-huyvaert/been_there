# Generated by Django 2.2.7 on 2019-11-08 11:12

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pinpoint',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('point', django.contrib.gis.db.models.fields.PointField(geography=True, srid=4326, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('friends', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='restapi.User')),
            ],
        ),
        migrations.CreateModel(
            name='WorldMap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
                ('cities', models.CharField(max_length=30)),
                ('country', models.CharField(max_length=55)),
                ('filter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.User')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80)),
                ('rating', models.IntegerField()),
                ('text', models.CharField(max_length=500)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('point', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.Pinpoint', to_field='point')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.User')),
            ],
        ),
    ]