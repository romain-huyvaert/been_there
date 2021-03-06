# Generated by Django 3.0 on 2019-12-06 12:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0008_auto_20191206_1235'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='username',
            field=models.ForeignKey(default='Alex Test', on_delete=django.db.models.deletion.CASCADE, related_name='fk_username', to='restapi.User', to_field='username'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='review',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fk_user', to='restapi.User'),
        ),
    ]
