# Generated by Django 3.2.13 on 2022-07-01 22:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_alter_follow_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='follow',
            unique_together={('user_id', 'followed_user_id')},
        ),
    ]
