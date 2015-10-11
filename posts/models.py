from django.db import models
from authentication.models import Account

# Create your models here.
class Post(models.Model):
    author = models.ForeignKey(Account)
    content = models.TextField(null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    color = models.CharField(max_length=100, blank=True, null=True)
    reference = models.CharField(max_length=100, blank=True, null=True)
    material = models.CharField(max_length=100, blank=True, null=True)
    distinctive_sign = models.CharField(max_length=200, blank=True, null=True)
    brand = models.CharField(max_length=200, blank=True)
    recovered = models.BooleanField(default=False)

    recovered_by = models.CharField(max_length=200, null=True)
    recovered_contact = models.CharField(max_length=200, null=True)

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