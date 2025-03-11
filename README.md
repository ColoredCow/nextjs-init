# ColoredCow Next.js Boilerplate

## Getting started

### Running locally

#### Pre-requisite

1. Make sure you have the [backend](https://github.com/ColoredCow/laravel-init/blob/main/README.md) is setup and running.
2. Ensure you have Node.js installed (version requires Node.js >=18.18.0).

#### Installation steps

1. Clone the repository:

   ```sh
   git clone https://github.com/ColoredCow/nextjs-init.git
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure environment variables:

   - Copy `.env.example` to `.env` and configure as needed.

     ```ini
     # If hosted using "serve"
     NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

     # If hosted using Valet
     NEXT_PUBLIC_API_BASE_URL=https://laravel-init.test/api
     ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
