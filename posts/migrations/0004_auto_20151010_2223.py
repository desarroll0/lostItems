# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_auto_20151009_1452'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='brand',
            field=models.CharField(max_length=200, blank=True),
        ),
        migrations.AddField(
            model_name='post',
            name='color',
            field=models.CharField(max_length=100, blank=True),
        ),
        migrations.AddField(
            model_name='post',
            name='distinctive_sign',
            field=models.CharField(max_length=200, blank=True),
        ),
        migrations.AddField(
            model_name='post',
            name='material',
            field=models.CharField(max_length=100, blank=True),
        ),
        migrations.AddField(
            model_name='post',
            name='recovered',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='post',
            name='reference',
            field=models.CharField(max_length=100, blank=True),
        ),
    ]
