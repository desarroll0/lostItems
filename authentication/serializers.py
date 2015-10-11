from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from authentication.models import Account

class AccountSerializer(serializers.ModelSerializer):

	password = serializers.CharField(write_only=True, required=False)
	confirm_password =serializers.CharField(write_only=True, required=False)
	is_active =serializers.BooleanField(required=True)

	def update(self, instance, validated_data):
		instance.username = validated_data.get('username', instance.username)
		instance.first_name = validated_data.get('first_name', instance.first_name)
		instance.last_name = validated_data.get('last_name', instance.last_name)
		instance.email = validated_data.get('email', instance.email)
		instance.is_active = validated_data.get('is_active', instance.is_active)
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
				raise serializers.ValidationError("La contrasena no coincide con la confirmación de la contrasena")
		return instance

	class Meta:
		model = Account
		fields = ('id', 'email', 'username', 'created_at', 'updated_at', 'first_name', 'last_name', 'password', 'confirm_password','is_active')
		read_only_fields=('created_at', 'updated_at')
		write_only_fields = ('password',)

