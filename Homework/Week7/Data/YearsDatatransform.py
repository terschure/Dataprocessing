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
            data = {}
            data['y2006'] = each['2006']
            data['y2007'] = each['2007']
            data['y2008'] = each['2008']
            data['y2009'] = each['2009']
            data['y2010'] = each['2010']
            data['y2011'] = each['2011']
            data['y2012'] = each['2012']
            datapoints[each['countrycode']] = data
            # elif each['seriesname'] == "Electricity production from renewable sources, excluding hydroelectric (perc of total)":
            #     datapoints[each['countrycode']]['renewable-h'] = each['2012']
            # elif each['seriesname'] == "Electricity production from hydroelectric sources (perc of total)":
            #     datapoints[each['countrycode']]['hydroelectric'] = each['2012']
            # elif each['seriesname'] == "Electricity production from natural gas sources (perc of total)":
            #     datapoints[each['countrycode']]['gas'] = each['2012']
            # elif each['seriesname'] == "Electricity production from nuclear sources (perc of total)":
            #     datapoints[each['countrycode']]['nuclear'] = each['2012']
            # elif each['seriesname'] == "Electricity production from oil sources (perc of total)":
            #     datapoints[each['countrycode']]['oil'] = each['2012']
            # elif each['seriesname'] == "Electricity production from oil sources (perc of total)":
            #     datapoints[each['countrycode']]['oil'] = each['2012']

# make outputfile
with open('renewableyears.json', 'w') as outfile:
     json.dump(datapoints, outfile, sort_keys = True, indent = 4,
     ensure_ascii=False)
