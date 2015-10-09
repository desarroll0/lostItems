from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import BaseUserManager

# Create your models here.
class AccountManager(BaseUserManager):
	def create_user(self, email, first_name, last_name, password=None, **kwargs):
		if not email:
			raise ValueError('Users must have a valid email address.')
		if not kwargs.get('username'):
			raise ValueError('Users must have a valid username')

		account = self.model(
			email = self.normalize_email(email), username=kwargs.get('username')
			, last_name=last_name, first_name=first_name
			)
		account.set_password(password)
		account.save()

		return account

	def create_superuser(self, email, first_name, last_name, password, **kwargs):
		account = self.create_user(email, first_name, last_name, password, **kwargs)

		account.is_admin = True
		account.is_staff = True
		account.save()

		return account

class Account(AbstractBaseUser):
	email = models.EmailField(unique=True)
	username = models.CharField(max_length=20, unique=True,null=False)

	first_name =models.CharField(max_length=100, blank=False, null=False)
	last_name =models.CharField(max_length=100, blank=False, null=False)

	is_admin = models.BooleanField(default=False)
	is_staff = models.BooleanField(default=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	objects = AccountManager()

	USERNAME_FIELD ='email'
	REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

	def __unicode__(self):
		return self.email

	def get_full_name(self):
		return ' '.join([self.first_name, self.last_name])

	def get_short_name(self):
		return self.first_name

