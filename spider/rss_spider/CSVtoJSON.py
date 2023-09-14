import csv
import json



def convert():
    # 读取CSV文件并转换为字典列表
    with open('github_rss.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        headers = next(csv_reader)  # 读取头部

        # 用于更改列名的映射
        column_name_map = {
            'Names': 'name',
            'Links': 'link'
        }

        # 更改列名
        headers = [column_name_map.get(header, header) for header in headers]

        data_list = []
        for row in csv_reader:
            row_dict = {headers[i]: value for i, value in enumerate(row)}
            data_list.append(row_dict)

    # 将字典列表写入JSON文件
    with open('github_rss.json', 'w', encoding='utf-8') as json_file:
        json.dump(data_list, json_file, ensure_ascii=False, indent=4)

    print("CSV转换为JSON完成")

if __name__ == '__main__':
    convert()
