from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver import Keys, ActionChains
import time


const = 'https://www.google.com/'

class Delicacy(webdriver.Chrome):
    def __init__(self, driver_path=r'C:\selenium-driver', teardown=False):
        options = Options()
        options.add_experimental_option('detach', True)
        self.driver_path = driver_path
        self.teardown = teardown
        super(Delicacy, self).__init__(options=options)
        self.implicitly_wait(10)

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.teardown:
            self.quit()


    def land_first_page(self):
        self.get(const)

    
    def input_search(self, cusine):
        input = self.find_element(By.ID, 'APjFqb')
        input.clear()
        ActionChains(self).move_to_element(input).send_keys(cusine+' images').send_keys(Keys.ENTER).perform()

    def get_data(self):
        try:
            box = self.find_element(By.XPATH, '//*[@id="iur"]/div[2]/div/div')
            box.find_element(By.TAG_NAME, 'div').click()
            image = self.find_element(By.XPATH, '//*[@id="Sva75c"]/div[2]/div/div[3]/div[2]/div[2]/c-wiz/div/div/div/div[2]/div/a/img[2]').get_attribute('src')
           
            return image
        except NoSuchElementException:
            return ''
        
    def go_back(self):
        self.back()

