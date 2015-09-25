## A class that calls a given URL and returns a list of cat images
## The api used in this case is the cat api.
## This can be customised to be any API that serves images
import requests
from bs4 import BeautifulSoup

class CatImageGenerator:
	def __init__(self, url, n=20, format="html"):
		self.format = format
		self.results = str(n)
		self.query_string = url + "?format=" + self.format + "&results_per_page=" + self.results

	def get(self):
		try:
			response = requests.get(self.query_string)
			soup = BeautifulSoup(response.content)
			self.results = []

			for a in soup.find_all("a"):
				self.results.append(a.img.get("src"))

			return self.results

		except Exception as e:
			print e

