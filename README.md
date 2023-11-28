# HealthTracker

HealthTracker is a cutting-edge Android tool designed to facilitate the tracking of daily exercise routines, doctor appointments, and health-related issues.

## APK Installation

To get started with HealthTracker, follow these steps for a seamless installation of the Android application:

### Option 1: APK Installation

1. Download the APK file from the repository: [healthtracker.apk](./healthtracker.apk)
   - _or_
   Install directly from [this Google Drive link](https://drive.google.com/file/d/1Mxy37ChPjAbJ8sA5MRz5nPUd6Kt34Da1/view?usp=sharing).

### Option 2: Repository Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/ShivShankarKushwaha/android-healthtracker.git healthtracker
    cd healthtracker
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Configure the Application:**
    - Add a `config.js` file in the root directory.
    - Populate `config.js` with sample data:
      ```javascript
      export default config = {
        URL: 'https://healthtracker-jwpl.onrender.com',
        API: API_KEY_RANDOM,
      };
      ```

4. **Launch the Application on Android:**
    ```bash
    npm run android
    ```

5. **Start the Application:**
    ```bash
    npm start
    ```

## Usage

HealthTracker simplifies the process of managing exercise routines, doctor appointments, and health concerns. Use the app to:

- **Track Exercise:** Monitor your daily exercise activities effortlessly.
- **Manage Appointments:** Keep tabs on upcoming doctor appointments and medical check-ups.
- **Monitor Health Issues:** Stay informed about your health status with easy-to-use tracking features.

## Screenshots

<div style="display:flex;justify-content:center;flex-wrap:wrap;gap:5rem">
    <img style="width: 10rem;" src="https://i.ibb.co/bgT43nq/IMG-20231128-WA0010.jpg" alt="IMG-20231128-WA0003" border="0">
    <img  style="width: 10rem;" src="https://i.ibb.co/HTK4pCB/IMG-20231128-WA0011.jpg" alt="IMG-20231128-WA0004" border="0">
    <img style="width: 10rem;" src="https://i.ibb.co/VQ2qjtG/IMG-20231128-WA0012.jpg" alt="IMG-20231128-WA0003" border="0">
    <img  style="width: 10rem;" src="https://i.ibb.co/JpGDnRC/IMG-20231128-WA0013.jpg" alt="IMG-20231128-WA0006"  border="0">
    <img style="width: 10rem;" src="https://i.ibb.co/Syhps5M/IMG-20231128-WA0014.jpg" alt="IMG-20231128-WA0003" border="0">
    <img style="width: 10rem;" src="https://i.ibb.co/LCcz9Qg/IMG-20231128-WA0015.jpg" alt="IMG-20231128-WA0003" border="0">
    <img style="width: 10rem;" src="https://i.ibb.co/G9VjkvT/IMG-20231128-WA0016.jpg" alt="IMG-20231128-WA0003" border="0">
</div>

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

HealthTracker leverages the power of several third-party libraries and tools:

- **React Native:** A JavaScript framework for building mobile applications. [GitHub](https://github.com/facebook/react-native)

- **Node.js:** A versatile JavaScript runtime for server-side development. [Website](https://nodejs.org/)

- **MongoDB:** A flexible and scalable NoSQL database solution. [Website](https://www.mongodb.com/)

- **Google OAuth:** Ensures secure user authentication and authorization. [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

- **Express:** A fast and minimalist web framework for Node.js. [GitHub](https://github.com/expressjs/express)

- **Tailwind CSS:** A utility-first CSS framework for building modern and responsive user interfaces. [GitHub](https://github.com/tailwindlabs/tailwindcss)

- **React Navigation:** Routing and navigation for React Native apps. [GitHub](https://github.com/react-navigation/react-navigation)

A sincere thank you to the creators and maintainers of these technologies for their valuable contributions.

---

Experience a new level of health management with HealthTracker!
