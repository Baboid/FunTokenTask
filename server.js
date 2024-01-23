import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'email-validator';

const app = express();
const port = process.env.PORT;

// Sample database to store user information (for simplicity)
const usersDB = {};

const secretKey = process.env.JWT_SECRET;

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!validator.validate(email)) {
            res.status(422).json({ message: 'Not a valid e-mail' });
            return;
        }

        if (usersDB[email]) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        usersDB[email] = { email, password: hashedPassword };

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = usersDB[email];
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
