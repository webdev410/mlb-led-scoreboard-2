echo 'pulling from git'

git pull

echo 'Checking if the program is running...'
if pgrep -x "python3" >/dev/null; then
	echo 'Program is running, stopping it...'
	killall python3
else
	echo 'No program is running.'
fi

echo 'Starting LED scoreboard...'

sudo main.py --led-gpio-mapping="adafruit-hat" --led-rows=32 --led-cols=64 --led-brightness=100 --led-slowdown-gpio=4 --led-rgb-sequence=RBG
# sudo python3 ./main.py \
# 	--led-gpio-mapping="adafruit-hat" \
# 	--led-rows=32 \
# 	--led-cols=64 \
# 	--led-brightness=100 \
# 	--led-slowdown-gpio=4 \
# 	--led-rgb-sequence=RBG

echo 'LED scoreboard started.'

# sudo crontab -e
# @reboot cd /home/andrew/mlb-led-scoreboard/ && ./start.sh

# sudo python3 ./main.py --led-gpio-mapping="adafruit-hat" --led-rows=32 --led-cols=64 --led-brightness=100 --led-slowdown-gpio=4 --led-rgb-sequence=RBG
