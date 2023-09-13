import requests
from lxml import html
import csv


def github_rss(url, csv_filename):
    response = requests.get(url)
    tree = html.fromstring(response.content)

    elements_names = tree.xpath('//*[@id="readme"]/div[2]/article/table/tbody/tr/td[1]')
    elements_links = tree.xpath('//*[@id="readme"]/div[2]/article/table/tbody/tr/td[2]/a')

    with open(csv_filename, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Names', 'Links'])  # writing header

        # Use zip to loop over both lists simultaneously
        for elements_name, elements_link in zip(elements_names, elements_links):
            writer.writerow([elements_name.text, elements_link.text])


if __name__ == '__main__':
    URL = "https://github.com/weekend-project-space/top-rss-list"
    CSV_FILENAME = 'github_rss.csv'
    github_rss(URL, CSV_FILENAME)