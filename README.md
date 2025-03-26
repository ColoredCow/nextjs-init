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
     NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
     ```

4. Start the development server:

   ```sh
   npm run dev

   # or this if you want to run on a different port
   npm run dev -- -p 8888
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
