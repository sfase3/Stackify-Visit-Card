# Тестовий файл для Selenium тестів
# Автор: Іван Ковальов

import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
import time

class TestTeamPage(unittest.TestCase):
    
    def setUp(self):
        # Запускаємо веб-драйвер Chrome
        options = Options()
        options.headless = True
        self.driver = webdriver.Chrome(options=options)

        # Перехід на вашу сторінку Vue
        self.driver.get("http://localhost:3000")

    def test_success_team_page(self):
        # Отримуємо дані про назву кнопки "Команда" з Vue компонента
        team_button_text = self.driver.execute_script('return document.querySelector(".team-button").innerText')

        # Клікаємо на кнопку "Команда"
        team_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "team-button"))
        )
        team_button.click()

        # Перевіряємо, чи потрапили на сторінку з командою
        self.assertEqual(self.driver.current_url, "http://localhost:3000/team")

    def test_invalid_team_page(self):
        # Отримуємо дані про назву кнопки "Команда" з Vue компонента
        team_button_text = self.driver.execute_script('return document.querySelector(".team-button").innerText')

        # Клікаємо на кнопку "Команда"
        team_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "team-button"))
        )
        team_button.click()

        # Перевіряємо, чи потрапили на основнну сторінку
        self.assertEqual(self.driver.current_url, "http://localhost:3000")

    def tearDown(self):
        time.sleep(5)
        self.driver.quit()  # Закриваємо веб-драйвер

if __name__ == "__main__":
    unittest.main()