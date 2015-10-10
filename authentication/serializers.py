from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from authentication.models import Account

class AccountSerializer(serializers.ModelSerializer):
	print("AccountSerializer")
	password = serializers.CharField(write_only=True, required=False)
	confirm_password =serializers.CharField(write_only=True, required=False)

	'''def update(self, attrs, instance=None):
		# call set_password on user object. Without this
		# the password will be stored in plain text.
		account = super(AccountSerializer, self).update(attrs, instance)
		account.set_password(attrs['password'])
		return account'''

	def update(self, instance, validated_data):
		print('en update')
		instance.username = validated_data.get('username', instance.username)
		
		instance.save()

		password = validated_data.get('password', None)
		confirm_password = validated_data.get('confirm_password', None)
		if password and confirm_password:
			if password == confirm_password:
				instance.set_password(password)
				instance.save()
				#When a user's password is updated, their session authentication hash must be explicitly updated. If we don't do this here, the user will not be authenticated on their next request and will have to log in again.  https://lostitems.io/django-angularjs-tutorial/
				update_session_auth_hash(self.context.get('request'), instance)
			else:
				print('pasaaaaaaaaaaaa')
				raise serializers.ValidationError("La contrasena esta mallllllllllllll")

		return instance

	class Meta:
		print('Meta')
		model = Account
		fields = ('id', 'email', 'username', 'created_at', 'updated_at', 'first_name', 'last_name', 'password', 'confirm_password',)
		read_only_fields=('created_at', 'updated_at')
		write_only_fields = ('password',)

		def create(self, validated_data):
			return Account.objects.create(**validated_data)
		def update(self, validated_data):
			print('paso')
			return Account.objects.update(**validated_data)
		def validate_password(self, value):
			"""
			Check that the blog post is about Django.
			"""
			print(value)
			print(self.confirm_password)
			raise serializers.ValidationError("La contrasena esta mallllllllllllll")
			return value
'''
		def update(self, instance, validated_data):
			print('en update')
			instance.username = validated_data.get('username', instance.username)
			
			instance.save()

			password = validated_data.get('password', None)
			confirm_password = validated_data.get('confirm_password', None)
			print('password:'+password)
			print('confirm_password:'+confirm_password)
			if password and confirm_password:
				if password == confirm_password:
					instance.set_password(make_password(password))
					instance.save()
					#When a user's password is updated, their session authentication hash must be explicitly updated. If we don't do this here, the user will not be authenticated on their next request and will have to log in again.  https://lostitems.io/django-angularjs-tutorial/
					update_session_auth_hash(self.context.get('request'), instance)
				else:
					print('pasaaaaaaaaaaaa')
					raise serializers.ValidationError("La contrasena esta mallllllllllllll")

			return instance
'''
