# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-05-22 11:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0004_auto_20180518_0848'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='dislike',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='record',
            name='like',
            field=models.IntegerField(default=0),
        ),
    ]