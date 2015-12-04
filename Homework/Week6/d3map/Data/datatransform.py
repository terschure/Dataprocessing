#
# By: Anneke ter Schure, 6084087
# Tranfforms csv file to json pretty printed txt file
# for data on population growth per country

# imports
import csv
import json

# open and read datafile
fieldnames = ["countryname", "countrycode", "time", "growth"]
datafile = open('Populationdata.csv', 'r')
reader = csv.DictReader(datafile, fieldnames)

# initialise data list
datapoints = {}

# loop through readfile and copy modify only needed data
for each in reader:
    data = {}

    # divide the countries according to the population growth rate
    growth = each['growth']
    if (float(growth) > 3):
        data['fillKey'] = 'VHIGH'
    elif (float(growth) > 2):
        data['fillKey'] = 'HIGH'
    elif (float(growth) >= 0.5 and float(growth) <= 1.5):
        data['fillKey'] = 'MEDIUM'
    elif (float(growth) < -0.5):
        data['fillKey'] = 'VLOW'
    else:
        data['fillKey'] = 'LOW'

    data['growth'] = growth
    datapoints[each['countrycode']] = data

# make outputfile
with open('populationgrowth.json', 'w') as outfile:
     json.dump(datapoints, outfile, sort_keys = True, indent = 4,
     ensure_ascii=False)
