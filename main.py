import platform
import subprocess
import qrcode

file_path: str = None

if platform.system() == "Windows":
    user: str = subprocess.check_output("whoami", shell=True, text=True).strip().split('\\')[1]
    file_path:str = f"C:\\Users\\{user}\\Downloads\\qrcode.png"
else:
    user: str = subprocess.check_output("whoami", shell=True, text=True).strip()
    file_path:str = f"/home/{user}/Downloads/qrcode.png"

print(file_path)

url:str = "https://www.google.com/"

qr = qrcode.QRCode()
qr.add_data(url)

img = qr.make_image()
img.save(file_path)