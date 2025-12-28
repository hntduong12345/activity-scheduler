import app from './app';
import { PORT } from './config/env';
import { connectDB } from './config/db';

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
