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

    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RANKING TV-SERIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.

    # initialise
    tvseries = []
    test = ""

    # loop over all entries on the webpage
    for element in dom.by_tag("td.title"):
        series = []

        # get title and ranking and push to series list
        title = element.by_tag("a")[0].content
        series.append(title)
        series.append(element.by_tag("span.value")[0].content)

        # loop over genres to push all to series list
        genres = ""
        i = 0
        for el in element.by_tag("span.genre"):
            genre = el.by_tag("a")[i].content
            genres += genre
            i += 1
        series.append(genres)

        # loop over actors to push all to series list
        actors = ""
        j = 0
        for el in element.by_tag("span.credit"):
            actor = el.by_tag("a")[j].content
            actors += actor
            j += 1
        series.append(actors)

        # get runtime and extract the digits
        runtime = element.by_tag("span.runtime")[0].content
        time = int(''.join(el for el in runtime if el.isdigit())) # source: http://stackoverflow.com/questions/10365225/extract-digits-in-a-simple-way-from-a-python-string
        series.append(time)

        tvseries.append(series)

    print tvseries
    return tvseries

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Ranking', 'Genre', 'Actors', 'Runtime'])

    for i in range(50):
        writer.writerow(tvseries[i])

    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE TV-SERIES TO DISK

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
