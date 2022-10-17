import csv
from parsel import Selector
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

keywords = input("Enter keywords to search for: ")
location = input("Enter location to search in: ")

writer = csv.writer(open('output.csv', 'w+', encoding='utf-8-sig', newline=''))
writer.writerow(['Name', 'Position', 'Company', 'Education', 'Location', 'URL'])

driver = webdriver.Chrome('D:/web_scraping/chromedriver.exe')
driver.get('https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin')

username = driver.find_element_by_name('session_key')
username.send_keys('XXXXXXXX')
sleep(0.5)

password = driver.find_element_by_name('session_password')
password.send_keys('XXXXXXXX')
sleep(0.5)

sign_in_button = driver.find_element_by_class_name('login__form_action_container')
sign_in_button.click()
sleep(2)

driver.get('https://www.google.com/')
search_query = driver.find_element_by_name('q')
search_query.send_keys('site:linkedin.com/in AND ',keywords,' AND ',location)
search_query.send_keys(Keys.RETURN)
sleep(0.5)

urls = driver.find_elements_by_xpath('//*[@class = "r"]/a[@href]')
urls = [url.get_attribute('href') for url in urls]
sleep(0.5)

for url in urls:
    driver.get(url)
    sleep(2)

    sel = Selector(text = driver.page_source)

    name = sel.xpath('//*[@class = "inline t-24 t-black t-normal break-words"]/text()').get().split()
    name = ' '.join(name)

    position = sel.xpath('//*[@class = "mt1 t-18 t-black t-normal"]/text()').get().split()
    position = ' '.join(position)

    experience = sel.xpath('//*[@class = "pv-entity__bullet-item-v2"]/text()').getall()
    experience = ' + '.join(experience)
    
    education = sel.xpath('//*[@class = "pv-entity__school-name t-16 t-black t-bold"]/text()').getall()
    education = ' , '.join(education)
    
    company = sel.xpath('//*[@class = "pv-entity__secondary-title t-14 t-black t-normal"]/text()').getall()
    company = ', '.join(company)
    
    skills = sel.xpath('//*[@class = "pv-skill-category-entity__name-text t-16 t-black t-bold"]/text()').getall()
    for i in range(0, len(skills)):
        skills[i] = skills[i].strip()
    
    location = ' '.join(sel.xpath('//*[@class = "t-16 t-black t-normal inline-block"]/text()').get().split())

    url = driver.current_url

    print('\n')
    print('Name: ', name)
    print('Position: ', position)
    print('Exprience: ', experience)
    print('Education: ', education)
    print('Company: ', company)
    print('Skills: ', skills)
    print('Location: ', location)
    print('URL: ', url)
    print('\n')
          
    writer.writerow([name,
                 position,
                 experience,
                 education,
                 company,
                 skills,
                 location,
                 url])

driver.quit()