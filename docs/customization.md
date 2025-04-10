## Customizing the App Name, Icon, Logo

You can customize both the app name, Icon, Logo specific to your project using environment variables.

---

### Step 1: Update the App Name

- Open the `.env` file located at the root of your project.
- Add or update the following variable:
  ```env
  NEXT_PUBLIC_APP_NAME=Your App Name
  ```
- This app name will be used in the browser tab title or anywhere the app name is referenced using environment variables.
---

### Step 2: Update the App Icon

- Ensure your logo is in `.png`, `.jpg` format.
- Place the logo file inside the `public` directory (e.g., `/public/icon.png`).
- Open the `.env` file and add or update the following variable:
  ```env
  NEXT_PUBLIC_APP_ICON_PATH_PATH=/favicon.png
  ```
- Adjust the path if your icon is in a different location within the `public` directory.
---

### Step 3: Set the Logo Using Environment Variables
- Open the `.env` file located at the root of your project.
- Add or update the following variable:
  ```env
  NEXT_PUBLIC_APP_LOGO_PATH=/logo.png
  ```
- Adjust the path if your logo is in a different location within the `public` directory.
