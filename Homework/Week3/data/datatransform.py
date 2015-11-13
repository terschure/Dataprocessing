#
# By: Anneke ter Schure, 6084087
#

# imports
import csv

# open and read datafile
datafile = open('KNMI_20150101.csv', 'r')
reader = csv.reader(datafile)

# open and make headers in new datafile
newfile = open('transformeddata.csv', 'w')
writer = csv.writer(newfile)
headers = ['YYYY/MM/DD', 'Max Temperature']
writer.writerow(headers)

# loop through readfile and copy modify only the dates and temperatures
for row in reader:
    if (row[0] == '260'):
        # modify date to insert slashes
        date = row[1:2][0]
        sdate = ''
        for char in date:
            if len(sdate) == 4 or len(sdate) == 7:
                sdate += '/'
            sdate += char
        # get temperature
        temp = row[2:3][0]
        writer.writerow([sdate, temp])
