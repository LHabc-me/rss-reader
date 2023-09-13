import json
import pandas as pd

def convert(csv_data, output_path):
    columns = csv_data.columns.tolist()
    output = {}
    for col in columns:
        output[col] = str(csv_data.loc[0, col])
    json_data = json.dumps(output)
    with open(output_path,'w') as jsonFile:
        jsonFile.write(json_data)


if __name__ == '__main__':
   csv_path = 'github_rss.csv'
   outputPath = 'github_rss.json'
   csvData = pd.read_csv(csv_path, header=0)
   convert(csvData, outputPath)