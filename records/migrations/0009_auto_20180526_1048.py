# Generated by Django 2.0.5 on 2018-05-26 07:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0008_record_view'),
    ]

    operations = [
        migrations.RenameField(
            model_name='record',
            old_name='view',
            new_name='views',
        ),
    ]