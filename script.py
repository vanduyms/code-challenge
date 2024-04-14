import requests
from bs4 import BeautifulSoup
import json

url = "https://giaygiare.vn/ultra-boost-light"

r = requests.get(url)
soup = BeautifulSoup(r.content, "html.parser")

product_list = []
products_container = soup.find_all("ul", class_="listsp")
for products_list in products_container:
  products = products_list.find_all("li")
  for product in products:
    data={}

    images=product.find("div", class_="images")
    a_images = images.find("a")

    href = a_images["href"]

    img_url_not_done = a_images.find("img")["data-src"]

    img_url_done = "https://giaygiare.vn/" + img_url_not_done  #Link hình ảnh
    data["image"] = img_url_done

    info=product.find("div", class_="info")
    h3 = info.find("h3")
    name = info.find("a").text #Name
    data["name"] = name

    price_sale = info.find("p").text.split("đ")[0] #Price sale
    price_original = info.find("p").text.split("đ")[1] #Price not sale
    data["price_sale"] = price_sale
    data["price_original"] = price_original


    url= "https://giaygiare.vn/" + href

    r_child = requests.get(url)
    soup_child = BeautifulSoup(r_child.content, "html.parser")

    brand = soup_child.find("div", class_="brand") 

    brand_and_code = brand.find_all("p")
    brand = brand_and_code[0].find("a").text #Brand
    data["brand"] = brand
    
    code = brand_and_code[1].find("b").text
    data["code"] = code

    print(data)