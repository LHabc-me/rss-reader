import pandas as pd

# 读取CSV文件
df = pd.read_csv('your_file.csv')

# 删除含有任何空值的行
df_cleaned = df.dropna()

# 保存清洗后的数据到新的CSV文件
df_cleaned.to_csv('cleaned_file.csv', index=False)

print("数据清洗完成，已保存到cleaned_file.csv")
