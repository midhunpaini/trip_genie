# Generated by Django 4.2 on 2023-05-19 05:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='dietery_preference',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='trip',
            name='group_type',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
