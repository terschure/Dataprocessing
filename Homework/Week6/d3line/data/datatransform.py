#
# By: Anneke ter Schure, 6084087
#

# imports
import csv
import json

# open and read datafile
fieldnames = ["location", "date", "maxtemp"]
datafile = open('KNMI_20150101.csv', 'r')
reader = csv.DictReader(datafile, fieldnames)

# open jsonfile
jsonfile = open('temp.json', 'w')

# # initialise data list
data = []

# loop through readfile and copy modify only the dates and temperatures
for each in reader:
    # initialise row list
    row = {}

    # modify date to insert slashes
    date = each['date']
    sdate = ''
    for char in date:
        if len(sdate) == 4 or len(sdate) == 7:
            sdate += '/'
        sdate += char

    # get temperature
    temp = each['maxtemp']

    row['date'] = sdate
    row['maxtemp'] = temp
    data.append(row)

# make outputfile
with open('temp.json', 'w') as outfile:
     json.dump(data, outfile, sort_keys = True, indent = 4,
     ensure_ascii=False)
