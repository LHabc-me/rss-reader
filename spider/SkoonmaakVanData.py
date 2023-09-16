import pandas as pd

# 读取CSV文件
df = pd.read_csv('github_rss.csv')

# 删除含有任何空值的行
df_cleaned = df.dropna()

# 保存清洗后的数据到新的CSV文件
df_cleaned.to_csv('rss.csv', index=False)

print("数据清洗完成，已保存到cleaned_file.csv")
