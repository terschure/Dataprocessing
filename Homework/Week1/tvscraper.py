#!/usr/bin/env python
# Name: Anneke ter Schure
# Student number: 6084087
'''
This script scrapes IMDB and outputs a CSV file with highest ranking tv series.
'''
# IF YOU WANT TO TEST YOUR ATTEMPT, RUN THE test-tvscraper.py SCRIPT.
import csv

from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html' # local backup of IMDB address
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):
    '''
    Extract a list of highest ranking TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Ranking
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    # initialise master list
    tvseries = []

    # loop over all entries on the webpage
    for element in dom.by_tag("td.title"):
        series = []

        # get title and ranking and push to series list
        title = element.by_tag("a")[0].content.encode('ascii', 'ignore')
        series.append(title)
        series.append(element.by_tag("span.value")[0].content.encode('ascii', 'ignore'))

        # loop over genres to push all to series list
        genres = ""
        for el in element.by_tag("span.genre"):
            for a in el.by_tag("a"):
                genre = a.content.encode('ascii', 'ignore')
                if genres == "":
                    genres += genre
                else:
                    genres += ", " + genre
        series.append(genres)

        # loop over actors to push all to series list
        actors = ""
        for el in element.by_tag("span.credit"):
            for a in el.by_tag("a"):
                actor = a.content.encode('ascii', 'ignore')
                if actors == "":
                    actors += actor
                else:
                    actors += ", " + actor
        series.append(actors)

        # get runtime and extract the digits
        runtime = element.by_tag("span.runtime")[0].content.encode('ascii', 'ignore')
        time = int(''.join(el for el in runtime if el.isdigit())) # source: http://stackoverflow.com/questions/10365225/extract-digits-in-a-simple-way-from-a-python-string
        series.append(time)

        # push all info of each series in master list: tvseries
        tvseries.append(series)

    return tvseries

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Ranking', 'Genre', 'Actors', 'Runtime'])

    # write each series list per row
    for i in range(len(tvseries)):
        writer.writerow(tvseries[i])

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in testing / grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
