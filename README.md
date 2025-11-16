# Glooby - A three.js website
Hello there! This is a project i made to learn more about three.js :) It's not very complex but it taught me a lot about how models are rendered on a website using OpenGL.

You can see it for yourself at [glooby.greenbit.club](https://glooby.greenbit.club)!

# Features
- Popup
- Custom Cursor
- Animations using GSAP
- Custom google font

But sadly it is not responsive for devices with a **width screen size <= 768px**, so everytime someone wants to access it via a device that is not compatible, they will get a warning.
# Setup
In order to be able to run this website, you'll need to achieve the following criterias:
- Use a website that supports WebGL - 3D Canvas graphics. A complete list of browser support can be found [here](https://caniuse.com/webgl)
- Recommended node version: 20+

To run the website locally, just clone this project and then run the following:
```bash
cd project-dir
```
```bash
npm install # install the npm packages
```
After installation, to run the web server execute the following:
```bash
npm run dev
```
And your website will be available at ``http://localhost:5173/``! (or your selected port)

# Website preview

![websiteIMG](./public/website.png)

---
Feel free to explore the code and play around with it!

*This website was inspired from this [tutorial](https://www.youtube.com/watch?v=_OwJV2xL8M8)*