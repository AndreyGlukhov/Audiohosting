# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-05-17 07:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0002_record_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='file',
            field=models.FileField(default='', upload_to='records/'),
        ),
    ]
