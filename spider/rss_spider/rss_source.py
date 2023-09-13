import requests
from lxml import html
import csv


def rss_source_get(url, csv_filename):
    response = requests.get(url)
    tree = html.fromstring(response.content)

    elements_names = tree.xpath('//*[@id="__next"]/div/div/div[2]/div/section/div/div/article/div[4]/div[2]/div/div[3]/div/div[3]/span/a/span/span')
    elements_links = tree.xpath('//*[@id="__next"]/div/div/div[2]/div/section/div/div/article/div[4]/div[2]/div/div[3]/div/div[4]/span/a')

    with open(csv_filename, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Names', 'Links'])  # writing header

        # Use zip to loop over both lists simultaneously
        for elements_name, elements_link in zip(elements_names, elements_links):
            writer.writerow([elements_name.text, elements_link.text])


if __name__ == '__main__':
    URL = "https://rss-source.com/Chinese"
    CSV_FILENAME = 'source_rss.csv'
    rss_source_get(URL, CSV_FILENAME)