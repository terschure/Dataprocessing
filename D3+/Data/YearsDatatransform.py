#
# By: Anneke ter Schure, 6084087
# Tranfforms csv file to json pretty printed txt file
#
# als land al in dictionary voeg iets toe; als er nog geen land is, maak deze aan

# imports
import csv
import json

# open and read datafile
fieldnames = ['seriesname', 'countryname', 'countrycode', '1990', '2000',
                        '2006', '2007', '2008', '2009', '2010', '2011', '2012']
datafile = open('ELECDATA.csv', 'r')
reader = csv.DictReader(datafile, fieldnames)

# initialise data list
datapoints = {}

# loop through readfile and copy modify only needed data
for each in reader:
    # skip headers
    if each['seriesname'] != "Series Name":
        if each['seriesname'] == "Renewable electricity output (perc of total electricity output)":

            data = []
            point = {}

            if (each['2006'] != '..'):
                point['year'] = '2006'
                point['percentage'] = each['2006']
                data.append(point)
                point = {}

            if (each['2007'] != '..'):
                point['year'] = '2007'
                point['percentage'] = each['2007']
                data.append(point)
                point = {}

            if (each['2008'] != '..'):
                point['year'] = '2008'
                point['percentage'] = each['2008']
                data.append(point)
                point = {}

            if (each['2009'] != '..'):
                point['year'] = '2009'
                point['percentage'] = each['2009']
                data.append(point)
                point = {}

            if (each['2010'] != '..'):
                point['year'] = '2010'
                point['percentage'] = each['2010']
                data.append(point)
                point = {}

            if (each['2011'] != '..'):
                point['year'] = '2011'
                point['percentage'] = each['2011']
                data.append(point)
                point = {}

            if (each['2012'] != '..'):
                point['year'] = '2012'
                point['percentage'] = each['2012']
                data.append(point)

            datapoints[each['countrycode']] = data


# make outputfile
with open('renewableyears.json', 'w') as outfile:
     json.dump(datapoints, outfile, sort_keys = True, indent = 4,
     ensure_ascii=False)
