# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_post_datafile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='datafile',
            field=models.ImageField(verbose_name='Lost Item', upload_to='items/%Y/%m', blank=True, help_text='Lost Item', null=True),
        ),
    ]
