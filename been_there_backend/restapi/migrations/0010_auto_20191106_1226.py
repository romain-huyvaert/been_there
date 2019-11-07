# Generated by Django 2.2.6 on 2019-11-06 12:26

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0009_user_friends'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pinpoint',
            name='address',
        ),
        migrations.RemoveField(
            model_name='pinpoint',
            name='category',
        ),
        migrations.RemoveField(
            model_name='pinpoint',
            name='owner_id',
        ),
        migrations.RemoveField(
            model_name='pinpoint',
            name='title',
        ),
        migrations.RemoveField(
            model_name='review',
            name='pinpoint_id',
        ),
        migrations.AddField(
            model_name='pinpoint',
            name='name',
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pinpoint',
            name='rating',
            field=models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(0), django.core.validators.MinValueValidator(5)]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pinpoint',
            name='review',
            field=models.CharField(default=0, max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pinpoint',
            name='reviewer',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='restapi.User'),
            preserve_default=False,
        ),
    ]