# Location Tracker App

This is a React Native application built with Expo for tracking your current location and displaying POI's. The app supports Android, iOS, and web platforms.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://classic.yarnpkg.com/lang/en/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A package manager like `npm` or `yarn`
- [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) (for running on emulators/simulators)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/forimbajosh21/location-tracking-app.git
   cd locaiton-tracker-app
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

## Running the Application

1. Start the Expo development server:
   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Project Structure

    /src
        /app           # Expo file-base routing screens
        /constants     # Application-wide constants
        /components    # Reusable UI components
        /stores        # Redux state management
        /types         # TypeScript type definitions
        /utils         # Utility functions

## Notes

- User can click current location and POI's to display some basic information
- I copied iOS Map application for the design, added soem libraries like
  - `react-native-maps` I would like to use another libraries but I think this is required base on the instructions?
  - `husky, eslint, and prettier` setup husky and lint-staged to ensure code quality before pushing commits to origin
  - `zustand` for state management
  - `jest and testing-library` for mocking and testing
  - `gorhom/bottom-sheet`
- I was not able to implement search functionality since I need to create an API key needed for Google Places Autocomplete
- Expo Snack URL
  - I can't integrate it with Expo Snack. Expo Router is not supported on Expo Snack
  - Expo Snack requires App.js file but when I added that file, it causes an issue when running the repo locally
