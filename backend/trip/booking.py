from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

const = 'https://www.booking.com/'

class Booking(webdriver.Chrome):
    def __init__(self, driver_path=r'C:\selenium-driver', teardown=False):
        options = Options()
        options.add_experimental_option('detach', True)
        self.driver_path = driver_path
        self.teardown = teardown
        super(Booking, self).__init__(options=options)

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.teardown:
            self.quit()


    def land_first_page(self):
        self.get(const)


    def contact_us(self):
        contact = self.find_element(By.PARTIAL_LINK_TEXT, 'Contact' )
        contact.click()

    

    def select_place_to_go(self, place):
        # Find the search field and enter the place to go
        search_field = self.find_element(By.ID, ':Ra9:')
        search_field.clear()
        search_field.send_keys(place)
        time.sleep(1)

        # Wait for the modal to be visible and dismiss it
        modal = WebDriverWait(self, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'button[aria-label="Dismiss sign-in info."]'))
        )
        modal.click()
        time.sleep(1)

        search_field.click()
        search_item = self.find_element(By.CSS_SELECTOR, 'div[role="button"]')
        search_item.click()
        time.sleep(1)

    def select_date(self, start_date, end_date):
        start_date_field = self.find_element(By.CSS_SELECTOR, f'span[data-date="{start_date}"]')
        start_date_field.click()
        time.sleep(1)

        end_date_field = self.find_element(By.CSS_SELECTOR, f'span[data-date="{end_date}"]')
        end_date_field.click()
        time.sleep(1)


    def occupancy(self):
        occupancy = self.find_element(By.CSS_SELECTOR, 'button[data-testid="occupancy-config"]')
        occupancy.click()
        time.sleep(1)

        select_occupancy = self.find_element(By.CSS_SELECTOR, 'button[class="fc63351294 a822bdf511 e3c025e003 fa565176a8 f7db01295e c334e6f658 e1b7cfea84 cd7aa7c891"]')
        select_occupancy.click()
        time.sleep(1)

        click_occupancy = self.find_element(By.CSS_SELECTOR, 'button[class="fc63351294 a822bdf511 e2b4ffd73d f7db01295e c938084447 a9a04704ee d285d0ebe9"]')
        click_occupancy.click()
        time.sleep(1)


    def search(self):
        search = self.find_element(By.CSS_SELECTOR, 'button[class="fc63351294 a822bdf511 d4b6b7a9e7 cfb238afa1 c938084447 f4605622ad aa11d0d5cd"]')
        search.click()
        time.sleep(3)
        current_url = self.current_url
    

    def collect_data(self):
        hotels = self.find_element(By.ID, 'search_results_table').find_elements(By.CSS_SELECTOR, 'div[class="a826ba81c4 fe821aea6c fa2f36ad22 afd256fc79 d08f526e0d ed11e24d01 ef9845d4b3 da89aeb942"]')
        hotels_data = []

        for hotel in hotels:
            data = {}
            name = hotel.find_element(By.CSS_SELECTOR, 'div[data-testid="title"]').text
            image = hotel.find_element(By.CSS_SELECTOR, 'img[data-testid="image"]').get_attribute('src')
            rating = hotel.find_element(By.CSS_SELECTOR, 'div[class="b5cd09854e d10a6220b4"]').text
            price = hotel.find_element(By.CSS_SELECTOR,'span[data-testid="price-and-discounted-price"]').text
            total_rating = hotel.find_element(By.CSS_SELECTOR, 'div[class="d8eab2cf7f c90c0a70d3 db63693c62"]').text
            hotel_detail = hotel.find_element(By.CSS_SELECTOR, 'a[data-testid="review-score-link"]').get_attribute('href')
            booking_link = hotel.find_element(By.CSS_SELECTOR, 'a[data-testid="availability-cta-btn"]').get_attribute('href')
            data['name'] = name
            data['image_url'] = image
            data['rating'] = rating
            data['price'] = price
            data['total_ratings'] = total_rating
            data['hotel_link'] = hotel_detail
            data['booking_link'] = booking_link
            hotels_data.append(data)

        return hotels_data

