import os
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pyodbc
import pandas as pd


# Global variables
autoScroll = 0  # Flag for autoscroll in NadlanGov.
waitTime = 10  # Waiting time for loading the search value transactions.
slow_wait_time = 5
scrollWaitingTime = 10
topHeight = 55*100000 # Maximum value for loading 50K values in a table of NadlanGov 55 inches per line.
city = "ראשון לציון"
en_city = "Rishon_le-zion"
pool_size = 3
scroll_down_limit = 1
directory_name = os.path.dirname(__file__)

# For multithreading CSV files
file_list = [
               f'../Data/{en_city}/filter_by_1.csv',
               f'../Data/{en_city}/filter_by_2.csv',
               f'../Data/{en_city}/filter_by_3.csv',
               f'../Data/{en_city}/filter_by_4.csv',
               f'../Data/{en_city}/filter_by_5.csv'
           ]


# Getting the topics (Keys) for dict.
def get_topics(web_driver: webdriver, headers: dict):
    header_elements = web_driver.find_element(By.XPATH, "//*[contains(@class, 'myTable')]/div[2]/div[5]")
    # Columns titles each of Row as a Key for dictionary.
    for header in header_elements.find_elements(by=By.TAG_NAME, value='button'):
        if header != '':
            headers[header.get_attribute('aria-label')] = []
    # Addition 2 topics lists
    headers["תאריכי עבר"] = []
    headers["מחירי עבר"] = []


# Scrolling down the table
def scroll_down_table(web_driver: webdriver,auto: int):
    scroll_number = 0
    # Scroll down for loading more data in table
    if auto:
        check_height = web_driver.execute_script("return document.body.scrollHeight;")
        while auto:
            scroll_number += 1
            web_driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(scrollWaitingTime)
            height = web_driver.execute_script("return document.body.scrollHeight;")
            time.sleep(scrollWaitingTime)
            print("height", height)
            print("\n Check_height", check_height)
            if height == check_height or height > topHeight or scroll_number > scroll_down_limit:
                auto = 0
                break
            check_height = height


# Getting the data from table
def get_data_from_table(web_driver: webdriver, headers: dict):
    # Lists of values
    prices_of_history_dates = []
    dates_of_history = []
    my_table = web_driver.find_element(By.XPATH, "//*[contains(@class, 'tableBody')]")
    # rows data, each value of data by topic will be insert for the belong list in the dictionary.
    for row in my_table.find_elements(by=By.CLASS_NAME, value='rbutton'):
        time.sleep(5)
        for i, field in enumerate(row.find_elements(by=By.CLASS_NAME, value='tableCol')):
            elements = field.find_elements(by=By.TAG_NAME, value='div')
            if field.tag_name == 'div' and len(elements) > 0:
                value = elements[0].get_attribute('title')
                if value == '':
                    value = 'NaN' # if value is empty NaN will be insert.
                if i > 8:
                    break
                headers[list(headers.keys())[i]].append(value)
            else:
                headers[list(headers.keys())[i]].append('NaN')
        # Getting the Addition Data of history
        # Clicking the line
        row.click()
        time.sleep(slow_wait_time)
        # Getting the Elements
        try:
            # Getting Data from inside button of history dates and prices
            history_data = my_table.find_element(by=By.CLASS_NAME, value="resultOptions")
            history_price = history_data.find_elements(by=By.CLASS_NAME, value="historyPrice")
            history_date = history_data.find_elements(by=By.CLASS_NAME, value="historyDate")
            # Adding Values into lists
            for field_of_dates in history_date:
                    dates_of_history.append(field_of_dates.text)
            for field_of_price in history_price:
                    prices_of_history_dates.append(field_of_price.text)
            if dates_of_history:
                headers["תאריכי עבר"].append(dates_of_history[:])
            else:
                # If null
                headers["תאריכי עבר"].append("NaN")
            if prices_of_history_dates:
                headers["מחירי עבר"].append(prices_of_history_dates[:])
            else:
                # if null
                headers["מחירי עבר"].append("NaN")
        except:
            headers["תאריכי עבר"].append("NaN")
            headers["מחירי עבר"].append("NaN")

        # clearing list for next time
        dates_of_history.clear()
        prices_of_history_dates.clear()

        # time pause
        time.sleep(waitTime)

        # click button again
        row.click()


bedroom_filtering_range = range(3, pool_size + 1)
for bedroom_filter in bedroom_filtering_range:
    # Open webdriver for multi threading
    # Web crawling start.
    # declaring of chromedriver l
    # ocation
    ser = Service(os.path.realpath(f"../webdriver/chromedriver{bedroom_filter}.exe"))
    driver = webdriver.Chrome(service=ser)

    # Open Page by URL
    url = 'https://www.nadlan.gov.il/'
    driver.get(url)

    # Search box of website
    search_box = driver.find_element(By.ID, "SearchString")
    search_box.send_keys(city)  # insert input into the textbox

    # Search Button
    search_button = driver.find_element(By.ID, "submitSearchBtn")
    search_button.click()

    # Get new search link
    time.sleep(waitTime)

    # Dictionary { Key: topic, Value: List }
    topics = {}
    # Get new search link
    time.sleep(waitTime)
    # Getting keys for dic : topics
    get_topics(driver, topics)

    # selection by room filter
    div_button = driver.find_elements(By.CLASS_NAME, "btnsWrapper")[1]
    filter_bedroom_selection = div_button.find_element(By.TAG_NAME, "button")
    filter_bedroom_selection.click()
    selection = \
        div_button.find_element(By.CLASS_NAME, "roomsFillter").find_elements(By.TAG_NAME, "button")[bedroom_filter]
    selection.click()

    # Time sleep
    time.sleep(waitTime)

    # scrolling down the table
    scroll_down_table(driver, autoScroll)
    # table data into the Dic

    # Time sleep
    time.sleep(waitTime)
    # Getting data from table
    get_data_from_table(driver, topics)
    # remove empty topic
    del topics['']

    # create data frame
    df = pd.DataFrame(data=topics)
    # create CSV File
    df.to_csv("fornow2.csv", encoding='utf-8-sig')
    df.to_csv(os.path.realpath(f"../CSV files/{en_city}/filter_by_{bedroom_filter}.csv"),encoding='utf-8-sig')


