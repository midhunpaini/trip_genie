import requests
from bs4 import BeautifulSoup 

url = 'https://www.bigbasket.com/pc/fruits-vegetables/fresh-vegetables/?nc=nb'
# url = 'https://www.booking.com/searchresults.html?ss=Goa%2C+India&efdco=1&label=gen173nr-1FCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQHoAQH4AQKIAgGoAgO4Avup0KIGwAIB0gIkNGFjZGU4MjMtN2I0ZS00MDliLTk3ZDQtNDQzN2MxNDUxNjIy2AIF4AIB&aid=304142&lang=en-us&sb=1&src_elem=sb&src=index&dest_id=4127&dest_type=region&ac_position=0&ac_click_type=b&ac_langcode=en&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=6fe38fbdf88f0030&ac_meta=GhA2ZmUzOGZiZGY4OGYwMDMwIAAoATICZW46A0dvYUAASgBQAA%3D%3D&checkin=2023-05-04&checkout=2023-05-08&group_adults=1&no_rooms=1&group_children=0&sb_travel_purpose=leisure'
# html = requests.get(url)

# doc = BeautifulSoup(html.text.encode('ascii', 'ignore').decode('ascii'), 'html.parser')

# print(doc.prettify())
# import requests
# from bs4 import BeautifulSoup

html = requests.get(url)

soup = BeautifulSoup(html.text,'lxml')

print(soup)

# hotels = soup.find_all('img', {'class':'bui-card__image'})

# hotel_data = []

# for hotel in hotels:
#     hotel_data.append({
#         'name':hotel.get('alt').strip(', hotel in Munnar'),
#         'img':hotel.get('src')
#     })
#     print(hotel_data)


# hotels = soup.find_all('div', {"data-testid":"filters-group-label-content"})
# print(hotels)

# # html = requests.get('https://www.booking.com/searchresults.en-gb.html?ss=Munnar&ssne=Munnar&ssne_untouched=Munnar&label=gen173nr-1BCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQHoAQGIAgGoAgO4Av7moqIGwAIB0gIkZDYxYmFiZDUtODY1Ny00NTljLWIwMjAtMWVlOWE3Y2VmN2Uz2AIF4AIB&sid=30090ea42ef8deb011599efeb162f1a5&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=index&dest_id=-2105113&dest_type=city&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure')

# # soup = BeautifulSoup(html.text.encode('ascii', 'ignore').decode('ascii'), 'html.parser')

# # hotels = soup.find_all('p',{'class':'bui-card__text'})


# # for hotel in hotels:
# #     print(hotel.text)

# # hotels_data = []
# # html = requests.get('https://www.booking.com/searchresults.en-gb.html?ss=Munnar&ssne=Munnar&ssne_untouched=Munnar&label=gen173nr-1BCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQHoAQGIAgGoAgO4Av7moqIGwAIB0gIkZDYxYmFiZDUtODY1Ny00NTljLWIwMjAtMWVlOWE3Y2VmN2Uz2AIF4AIB&sid=30090ea42ef8deb011599efeb162f1a5&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=index&dest_id=-2105113&dest_type=city&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure')

# # soup = BeautifulSoup(html.text.encode('ascii', 'ignore').decode('ascii'), 'html.parser')

# # hotels = soup.find_all('span',{'class':'bui-card__title'})

# # for hotel in hotels:
# #     print(hotel.text.strip())

# url = 'https://www.booking.com/searchresults.en-gb.html?ss=Goa%2C+India&ssne=Munnar&ssne_untouched=Munnar&label=gen173nr-1BCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQHoAQGIAgGoAgO4Av7moqIGwAIB0gIkZDYxYmFiZDUtODY1Ny00NTljLWIwMjAtMWVlOWE3Y2VmN2Uz2AIF4AIB&sid=30090ea42ef8deb011599efeb162f1a5&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=4127&dest_type=region&ac_position=0&ac_click_type=b&ac_langcode=en&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=0673281b320c0378&ac_meta=GhAwNjczMjgxYjMyMGMwMzc4IAAoATICZW46A2dvYUAASgBQAA%3D%3D&checkin=2023-05-02&checkout=2023-05-03&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure'

# response = requests.get('https://www.booking.com/searchresults.en-gb.html?ss=Goa&ssne=Munnar&ssne_untouched=Munnar&label=gen173nr-1BCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQHoAQGIAgGoAgO4Av7moqIGwAIB0gIkZDYxYmFiZDUtODY1Ny00NTljLWIwMjAtMWVlOWE3Y2VmN2Uz2AIF4AIB&sid=30090ea42ef8deb011599efeb162f1a5&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=index&dest_id=-2105113&dest_type=city&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure')

# soup = BeautifulSoup(response.text, 'html.parser')

# hotels = soup.find_all('span', class_='bui-card__title')

# for hotel in hotels:
#     print(hotel.text.strip())


