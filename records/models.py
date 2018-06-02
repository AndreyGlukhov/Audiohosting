import string
import random

from django.db import models
from django.urls import reverse

from datetime import datetime
from django.utils.encoding import force_bytes
from hashlib import sha1


class Record(models.Model):
    title = models.CharField(max_length=256)
    decription = models.CharField(max_length=1024, null=True, blank=True)
    format = models.CharField(max_length=1024, null=True, blank=True)
    link = models.CharField(max_length=1024, null=True, blank=True)
    is_shared = models.BooleanField(default=False)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True)
    file = models.FileField(upload_to='records/', default="", null=True, blank=True)
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)
    link_ext = models.URLField(max_length=200, blank=True)
    slug = models.SlugField(max_length=200, blank=True)
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        # return reverse('record_detail', args=[str(self.id)])
        return reverse('records:record_list')
        # return '/records/%i' % self.pk

    @classmethod
    def generate_URL(cls):
        # time = datetime.now().isoformat()
        # plain = user.username + '\0' + time
        # return sha1(force_bytes(plain)).hexdigest()
        return (''.join(random.choices(string.ascii_lowercase + string.ascii_uppercase + string.digits, k=11)))
