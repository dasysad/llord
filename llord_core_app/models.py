from django.db import models

# Create your models here.


class Address(models.Model):
	address_label = models.CharField(max_length=100)
	address_street = models.CharField(max_length=200)
	city = models.CharField(max_length=100)
	state = models.CharField(max_length=100)
	postalcode = models.CharField(max_length=10)
	def __str__(self):
        	return self.address_street

class Building(models.Model):
	address = models.ForeignKey(Address)
	label = models.CharField(max_length=100)

class Unit(models.Model):
	address = models.CharField('Unit Address', max_length=6)
	label = models.CharField(max_length=100)
	size_sqft = models.IntegerField('Size in Square Feet')
	size_sqm = models.IntegerField('Size in Square Meters')
	building = models.ForeignKey(Building)

