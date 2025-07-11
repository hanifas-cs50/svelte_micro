# frontend .env file

Run ipconfig on your cmd, get your ipv4 address and make a .env file on the frontend folder
Type this in the file:

BACKEND_URL=ipconfig and put your ipv4 address here

Run using:
npx vite dev --host

On the backend, server1/car_writer, server1/car_reader, server2, index file change the CORS address to match your currrent ipv4 address
