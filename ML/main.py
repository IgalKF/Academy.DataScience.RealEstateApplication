# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import pandas as pd
import re

data_frame = pd.read_csv('allData.csv')
data_frame['מגמת שינוי'].fillna("ב 0 שנים 0%", inplace=True)
data_frame.drop_duplicates() # remove duplicates
data_frame.to_csv('end.csv', encoding='utf-8-sig')
data_frame.dropna(inplace=True)
block = []
sector = []
facility = []


for cell in data_frame['גוש חלקה - תת חלקה']:
    asset_number= re.split("-", cell)
    block.append(asset_number[0])
    sector.append(asset_number[1])
    facility.append(asset_number[2])

data_frame["גוש"] = block
data_frame["חלקה"] = sector
data_frame["מבנה"] = facility
data_frame['עסקאות'] = data_frame['סכום']
data_frame['עסקאות'] = data_frame.groupby(['יום מכירה','גוש חלקה - תת חלקה'])['עסקאות'].transform(lambda x : ' , '.join(x))

new_data = data_frame
index = pd.MultiIndex.from_frame(data_frame)
df = pd.DataFrame( index=index)


df.to_csv('Newdata1.csv', encoding='utf-8-sig')