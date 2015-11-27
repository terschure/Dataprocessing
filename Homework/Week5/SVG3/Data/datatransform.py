#
# By: Anneke ter Schure, 6084087
# Tranfforms csv file to json pretty printed txt file
# for data on threatened mammels per country

# imports
import csv
import json
from countrycodes import country_codes

# open and read datafile
datafile = open('ThreatenedMammals.csv', 'r')
reader = csv.reader(datafile)

# initialise data list
datapoints = []

# loop through readfile and copy modify only needed data
for row in reader:
    # initialise row list
    arow = []
    country3code = row[3]

    # replace alpha 3 coutry code for alpha-2 country code
    for i in country_codes:
        for j in range(len(i)):
            if i[j] == country3code:
                countrycode = i[j-1]
    mammals = row[4]
    arow.append(countrycode)
    arow.append(mammals)
    datapoints.append(arow)

# make outputfile
with open('JSONmammals.json', 'w') as outfile:
     json.dump(datapoints, outfile, sort_keys = True, indent = 4,
     ensure_ascii=False)
