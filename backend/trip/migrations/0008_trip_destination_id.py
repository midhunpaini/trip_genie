# Generated by Django 4.2 on 2023-04-24 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0007_site_latitude_site_longitude'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='destination_id',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]