# imports
import csv

# open and read datafile
datafile = open('KNMI_20150101.csv', 'r')
reader = csv.reader(datafile)

ndata = []
for row in reader:
    if (row[0] != '# '):
        nrow = []
        date = row[1:2]
        nrow.append(date)
        # print date
        temp = row[2:3]
        # print temp
        nrow.append(temp)
    ndata.append(nrow)

print ndata

# open and write in new datafile
#newfile = open('transformeddata.csv', 'w')
#writer = csv.writer(csvfile, delimiter=' ',
#                    quotechar='|', quoting=csv.QUOTE_MINIMAL)
#spamwriter.writerow(row)
