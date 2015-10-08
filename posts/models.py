from django.db import models
from authentication.models import Account

# Create your models here.
class Post(models.Model):
    author = models.ForeignKey(Account)
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    datafile = models.ImageField(
        upload_to='items/%Y/%m',
        #height_field="image_height",
        #width_field="image_width",
        null=True,
        blank=True,
        editable=True,
        help_text="Lost Item",
        verbose_name="Lost Item")

    def __unicode__(self):
        return '{0}'.format(self.content)