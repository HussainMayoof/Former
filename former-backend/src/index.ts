import app from './app.js';
import { PORT } from './util/config.js';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
