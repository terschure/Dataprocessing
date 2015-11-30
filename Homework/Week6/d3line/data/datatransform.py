#
# By: Anneke ter Schure, 6084087
#

# imports
import csv
import json

# open and read datafile
datafile = open('KNMI_20150101.csv', 'r')
reader = csv.reader(datafile)

# initialise data list
data = []

# loop through readfile and copy modify only the dates and temperatures
for row in reader:
    if (row[0] == '260'):
        # initialise row list
        arow = []

        # modify date to insert slashes
        date = row[1:2][0]
        sdate = ''
        for char in date:
            if len(sdate) == 4 or len(sdate) == 7:
                sdate += '/'
            sdate += char
        arow.append(sdate)

        # get temperature
        temp = row[2:3][0]
        arow.append(temp)
        data.append(arow)

# make outputfile
with open('tempdata.json', 'w') as outfile:
     json.dump(data, outfile, sort_keys = True, indent = 4,
     ensure_ascii=False)
