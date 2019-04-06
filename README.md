# play-with-sharp-and-libheif
Image converter playground.

#### Included examples

- Converts `.heic` (HEIF) file into `.jpg` (JPEG) via `libheif.js`
- Fix rotated images via `sharp`

#### How to develop

```
# Fetch libheif.js from Github, Because `libheif.js` not yet published to npm.
wget https://raw.githubusercontent.com/strukturag/libheif/gh-pages/libheif.js -O ./vendor/libheif.js

# Install other dependencies
npm i

# Run example
npm start
```

#### Credits

- `libheif.js` - [libheif](https://github.com/strukturag/libheif)
- Example rotated JPEG image - [exif-orientation-examples](https://github.com/recurser/exif-orientation-examples)
- `Image converter` - [sharp](https://github.com/lovell/sharp)
