from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import time
import pandas as pd
import requests
from bs4 import BeautifulSoup

autoScroll = 0

ser = Service("C:\Repos\webdriver\chromedriver.exe")
driver = webdriver.Chrome(service=ser)

url = 'https://www.nadlan.gov.il/'
# Open Page
driver.get(url)


# Search box
searchBox = driver.find_element(By.ID,"SearchString")
searchBox.send_keys("לוד המצביאים") #insert input into the textbox

# Search Button
searchButton = driver.find_element(By.ID, "submitSearchBtn")
searchButton.click()

#Get new search link
time.sleep(5)

if autoScroll:
    #Scroll down - stack overflow
    check_height = driver.execute_script("return document.body.scrollHeight;")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)
        height = driver.execute_script("return document.body.scrollHeight;")
        if height == check_height:
            break
        check_height = height

print(driver.current_url)

#Request for url
myTable = driver.find_element(By.XPATH, "//*[contains(@class, 'tableBody')]")
headerElements = driver.find_element(By.XPATH, "//*[contains(@class, 'myTable')]/div[2]/div[5]");

headers = {}
deatails = []

#pd.DataFrame(headers)

## Colums titles each of Row
for header in headerElements.find_elements(by=By.TAG_NAME, value='button'):
    if header != '':
        headers[header.get_attribute('aria-label')] = []

for row in myTable.find_elements(by=By.CLASS_NAME, value='rbutton'):
    for i, field in enumerate(row.find_elements(by=By.CLASS_NAME, value='tableCol')):
        value = field.find_elements(by=By.TAG_NAME, value='div')[0].get_attribute('title')
        if value == '':
            value = 'NaN'
        if i > 8:
            break
        headers[list(headers.keys())[i]].append(value)






