#!/bin/bash

sudo ./install.sh

# --led-rows                Display rows. 16 for 16x32, 32 for 32x32. (Default: 32)
# --led-cols                Panel columns. Typically 32 or 64. (Default: 32)
# --led-chain               Daisy-chained boards. (Default: 1)
# --led-parallel            For Plus-models or RPi2: parallel chains. 1..3. (Default: 1)
# --led-pwm-bits            Bits used for PWM. Range 1..11. (Default: 11)
# --led-brightness          Sets brightness level. Range: 1..100. (Default: 100)
# --led-gpio-mapping        Hardware Mapping: regular, adafruit-hat, adafruit-hat-pwm
# --led-scan-mode           Progressive or interlaced scan. 0 = Progressive, 1 = Interlaced. (Default: 1)
# --led-pwm-lsb-nanosecond  Base time-unit for the on-time in the lowest significant bit in nanoseconds. (Default: 130)
# --led-show-refresh        Shows the current refresh rate of the LED panel.
# --led-slowdown-gpio       Slow down writing to GPIO. Range: 0..4. (Default: 1)
# --led-no-hardware-pulse   Don't use hardware pin-pulse generation.
# --led-rgb-sequence        Switch if your matrix has led colors swapped. (Default: RGB)
# --led-pixel-mapper        Apply pixel mappers. e.g Rotate:90, U-mapper
# --led-row-addr-type       0 = default; 1 = AB-addressed panels. (Default: 0)
# --led-multiplexing        Multiplexing type: 0 = direct; 1 = strip; 2 = checker; 3 = spiral; 4 = Z-strip; 5 = ZnMirrorZStripe; 6 = coreman; 7 = Kaler2Scan; 8 = ZStripeUneven. (Default: 0)
# --led-limit-refresh       Limit refresh rate to this frequency in Hz. Useful to keep a constant refresh rate on loaded system. 0=no limit. Default: 0
# --led-pwm-dither-bits     Time dithering of lower bits (Default: 0)
# --config                  Specify a configuration file name other, omitting json xtn (Default: config)
# --emulated                Force the scoreboard to run in software emulation mode.
# --drop-privileges         Force the matrix driver to drop root privileges after setup. (Default: true)

python3 ./main.py \
	--led-rows 32 \
	--led-cols 64 \
	--led-brightness 100 \
	--led-gpio-mapping adafruit-hat \
	--led-slowdown-gpio 4 \
	--led-rgb-sequence RBG \
	--config config.json
