# Generated by Django 2.2.6 on 2019-10-18 10:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0004_review_pinpoint_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='friends',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='restapi.User'),
            preserve_default=False,
        ),
    ]
