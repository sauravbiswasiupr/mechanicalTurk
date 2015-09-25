import unittest
from CatImageGenerator import CatImageGenerator

class TestCatImageGenerator(unittest.TestCase):
	def test_cat_images(self):
		URL = "http://thecatapi.com/api/images/get"
		generator = CatImageGenerator(URL, n=20)
		results = generator.get()
		self.assertEqual(len(results), 20)

	def test_cat_images_hundred(self):
		URL = "http://thecatapi.com/api/images/get"
		generator = CatImageGenerator(URL, n=100)
		results = generator.get()
		self.assertEqual(len(results), 100)
		self.assertEqual(results[0][:4], "http")

if __name__ == "__main__":
	unittest.main()