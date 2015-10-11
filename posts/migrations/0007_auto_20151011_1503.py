# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_auto_20151011_1121'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='recovered_by',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='recovered_contact',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
